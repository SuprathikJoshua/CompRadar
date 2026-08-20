import { prisma } from '../lib/prisma';

export async function getAllChanges() {
  return prisma.change.findMany({
    include: {
      target: {
        include: {
          rival: true
        }
      },
      oldSnapshot: true,
      newSnapshot: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getChangeById(id: number) {
  return prisma.change.findUnique({
    where: { id },
    include: {
      target: {
        include: {
          rival: true
        }
      },
      oldSnapshot: true,
      newSnapshot: true,
    }
  });
}