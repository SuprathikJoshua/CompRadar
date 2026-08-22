import { prisma } from '../lib/prisma';

export async function getStats() {
  const [
    rivalsTracked,
    targetsTracked,
    totalChangesDetected,
    totalHealEvents,
    healEventsRecovered,
    avgDowntimeResult,
    lastSnapshot
  ] = await prisma.$transaction([
    prisma.rival.count(),
    prisma.target.count(),
    prisma.change.count(),
    prisma.healEvent.count(),
    prisma.healEvent.count({ where: { status: 'recovered' } }),
    prisma.healEvent.aggregate({
      _avg: {
        downtimeSeconds: true,
      },
    }),
    prisma.snapshot.findFirst({
      orderBy: { scrapedAt: 'desc' },
      select: { scrapedAt: true },
    }),
  ]);

  const averageDowntimeSeconds = avgDowntimeResult._avg.downtimeSeconds ?? 0;
  const lastScrapedAt = lastSnapshot?.scrapedAt ?? null;

  return {
    rivalsTracked,
    targetsTracked,
    totalChangesDetected,
    totalHealEvents,
    healEventsRecovered,
    averageDowntimeSeconds,
    lastScrapedAt,
  };
}