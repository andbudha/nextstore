'use server';
import { PrismaClient } from '@prisma/client';
import { convertPrismaObjToJsObj } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

//getting latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });
  return convertPrismaObjToJsObj(data);
}
