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

//format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === 'ZodError') {
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );
    return fieldErrors.join('. ');
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    //handle prisma error
    const filed = error.meta.target ? error.meta.target[0] : 'Field';

    return `${filed.charAt(0).toUpperCase() + filed.slice(1)} already exists`;
  } else {
    //handle other errors
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message);
  }
}
