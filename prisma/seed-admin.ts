import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'yigitcankerimbusiness@gmail.com';

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      role: 'ADMIN',
    },
  });

  console.log(`Default admin created: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
