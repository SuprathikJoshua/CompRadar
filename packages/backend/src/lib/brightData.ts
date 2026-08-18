const API_BASE = "https://api.brightdata.com";
const API_TOKEN = process.env.BRIGHT_DATA_API_TOKEN!;

type TriggerInput = { url: string };
type TriggerResponse = {
	collection_id?: string;
	snapshot_id?: string;
	id?: string;
};

export async function triggerScrape(
	collectorId: string,
	inputs: TriggerInput[],
): Promise<string> {
	const res = await fetch(
		`${API_BASE}/dca/trigger?collector=${collectorId}&queue_next=1`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${API_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(inputs),
		},
	);
	if (!res.ok)
		throw new Error(`trigger failed: ${res.status} ${await res.text()}`);
	const data = (await res.json()) as TriggerResponse;
	const snapshotId = data.collection_id ?? data.snapshot_id ?? data.id;
	if (!snapshotId)
		throw new Error(`no snapshot id in response: ${JSON.stringify(data)}`);
	return snapshotId;
}

export async function pollForResults<T = unknown>(
	snapshotId: string,
	{ intervalMs = 5000, maxAttempts = 60 } = {},
): Promise<T[]> {
	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		const res = await fetch(`${API_BASE}/dca/dataset?id=${snapshotId}`, {
			headers: { Authorization: `Bearer ${API_TOKEN}` },
		});
		if (!res.ok)
			throw new Error(`poll failed: ${res.status} ${await res.text()}`);

		const data = await res.json();

		if (Array.isArray(data)) {
			if (data.length > 0) return data as T[];
			// empty array — still building
		} else if (data && typeof data === "object" && !("status" in data)) {
			// real result object, no job-status wrapper — actually ready
			if (Object.keys(data).length > 0) return [data] as T[];
		}
		// else: {"status": "...", ...} — still building, poll again

		console.log(
			`snapshot ${snapshotId}: attempt ${attempt}/${maxAttempts}, not ready`,
		);
		await new Promise((r) => setTimeout(r, intervalMs));
	}
	throw new Error(
		`snapshot ${snapshotId} timed out after ${maxAttempts} attempts`,
	);
}

export async function runScrape<T = unknown>(
	collectorId: string,
	inputs: TriggerInput[],
): Promise<T[]> {
	const snapshotId = await triggerScrape(collectorId, inputs);
	console.log(`queued snapshot ${snapshotId}, polling…`);
	return pollForResults<T>(snapshotId);
}
