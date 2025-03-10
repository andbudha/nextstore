import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//converting prisma object to regular js object
export function convertPrismaObjToJsObj<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

//format num with decimals places
export function formatNumberWithDecimals(num: number) {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}
