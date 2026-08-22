import { prisma } from '../lib/prisma';

export async function getAllHealEvents() {
  return prisma.healEvent.findMany({
    include: {
      target: {
        include: {
          rival: true
        }
      }
    },
    orderBy: {
      detectedAt: 'desc'
    }
  });
}