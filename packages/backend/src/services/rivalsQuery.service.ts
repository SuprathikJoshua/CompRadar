import { prisma } from "../lib/prisma";

export async function getAllRivalsWithTargets() {
  const rivals = await prisma.rival.findMany({
    include: {
      targets: {
        include: {
          snapshots: {
            take: 1,
            orderBy: { scrapedAt: "desc" },
            include: {
              priceDetails: true,
            },
          },
          healEvents: {
            take: 5,
            orderBy: { detectedAt: "desc" },
          },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return rivals.map((rival) => {
    const totalTargets = rival.targets.length;
    const allHealEvents = rival.targets.flatMap((t) => t.healEvents);
    const failedHealCount = allHealEvents.filter((e) => e.status === "failed").length;
    
    // Calculate a health percentage based on active targets and failed heal events
    const healthPct = totalTargets > 0 
      ? Math.max(80, Math.round(100 - (failedHealCount * 5)))
      : 100;

    const latestSnapshot = rival.targets
      .flatMap((t) => t.snapshots)
      .sort((a, b) => b.scrapedAt.getTime() - a.scrapedAt.getTime())[0];

    return {
      id: rival.id,
      name: rival.name,
      baseUrl: rival.baseUrl,
      status: failedHealCount > 0 ? "Degraded" : "Healthy",
      healthPct,
      targetCount: totalTargets,
      targets: rival.targets.map((t) => ({
        id: t.id,
        type: t.type,
        url: t.url,
        lastScrapedAt: t.snapshots[0]?.scrapedAt ?? null,
        plansCount: t.snapshots[0]?.priceDetails?.length ?? 0,
      })),
      lastScrapedAt: latestSnapshot?.scrapedAt ?? null,
    };
  });
}

export async function getRivalById(id: number) {
  return prisma.rival.findUnique({
    where: { id },
    include: {
      targets: {
        include: {
          snapshots: {
            take: 5,
            orderBy: { scrapedAt: "desc" },
            include: {
              priceDetails: true,
            },
          },
          healEvents: {
            take: 10,
            orderBy: { detectedAt: "desc" },
          },
        },
      },
    },
  });
}
