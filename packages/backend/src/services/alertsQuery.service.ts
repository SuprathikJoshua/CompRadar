import { prisma } from '../lib/prisma';

export async function getAllAlerts() {
  return prisma.alertSent.findMany({
    include: {
      change: {
        include: {
          target: {
            include: {
              rival: true
            }
          },
          oldSnapshot: true,
          newSnapshot: true
        }
      }
    },
    orderBy: {
      sentAt: 'desc'
    }
  });
}