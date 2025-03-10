'use server';
import { convertPrismaObjToJsObj } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { prisma } from '@/db/prisma';

//getting latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });
  return convertPrismaObjToJsObj(data);
}
