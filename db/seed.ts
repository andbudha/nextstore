import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function seed() {
  const prisma = new PrismaClient();
  //clearing the database before seeding
  await prisma.product.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.verificationToken.deleteMany({});
  await prisma.user.deleteMany({});
  //seeding the database with sample data
  await prisma.product.createMany({
    data: sampleData.products,
  });
  await prisma.user.createMany({
    data: sampleData.users,
  });

  console.log('Seeded sample data');
}

seed();
