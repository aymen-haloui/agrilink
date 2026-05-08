import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
try {
  const count = await p.user.count();
  const first = await p.user.findFirst({ select: { email: true, status: true } });
  console.log('User count:', count);
  console.log('First user:', first);
} catch (e) {
  console.error('DB error:', e.message);
} finally {
  await p.$disconnect();
}
