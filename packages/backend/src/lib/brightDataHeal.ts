export type HealResult = {
	collector_id: string;
	status: string;
	completed_steps: string[];
	prompt: string;
	view_url?: string;
	next_step?: string;
};

const HEAL_TIMEOUT_MS = 20 * 60 * 1000; // ceiling, heal itself usually under 15 min

export async function healCollector(
	collectorId: string,
	whatBroke: string,
): Promise<HealResult> {
	const proc = Bun.spawn(
		[
			"brightdata",
			"scraper",
			"heal",
			collectorId,
			whatBroke,
			"--auto-approve",
			"--auto-save",
			"--pretty",
		],
		{ stdout: "pipe", stderr: "pipe" },
	);

	const timeout = setTimeout(() => proc.kill(), HEAL_TIMEOUT_MS);

	const [stdout, stderr, exitCode] = await Promise.all([
		new Response(proc.stdout).text(),
		new Response(proc.stderr).text(),
		proc.exited,
	]);
	clearTimeout(timeout);

	if (exitCode !== 0) {
		throw new Error(
			`heal command failed (exit ${exitCode}): ${stderr || stdout}`,
		);
	}

	const jsonStart = stdout.lastIndexOf("{");
	if (jsonStart === -1)
		throw new Error(`no JSON found in heal output: ${stdout}`);

	const parsed = JSON.parse(stdout.slice(jsonStart)) as HealResult;
	if (parsed.status !== "done") {
		throw new Error(
			`heal finished with status "${parsed.status}", expected "done"`,
		);
	}
	return parsed;
}
