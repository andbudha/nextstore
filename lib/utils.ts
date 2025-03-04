import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//converting prisma object to regular js object
export function convertPrismaObjToJsObj<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
