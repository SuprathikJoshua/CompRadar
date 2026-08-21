import { prisma } from '../lib/prisma';

export async function getStats() {
  const [
    totalTargets,
    totalChanges,
    totalHealEvents,
    totalAlerts,
    totalSnapshots
  ] = await prisma.$transaction([
    prisma.target.count(),
    prisma.change.count(),
    prisma.healEvent.count(),
    prisma.alertSent.count(),
    prisma.snapshot.count()
  ]);

  return {
    totalTargets,
    totalChanges,
    totalHealEvents,
    totalAlerts,
    totalSnapshots
  };
}