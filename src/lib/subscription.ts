import { prisma } from '@/lib/prisma';

/**
 * Returns true if the user has an active Pro plan.
 */
export async function isPro(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  });

  if (!user || user.plan !== 'pro') return false;
  if (!user.planExpiresAt) return true; // lifetime
  return user.planExpiresAt > new Date();
}

/**
 * Activates Pro plan for a user (30 days from now).
 */
export async function activatePro(userId: string): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.user.update({
    where: { id: userId },
    data: { plan: 'pro', planExpiresAt: expiresAt },
  });
}
