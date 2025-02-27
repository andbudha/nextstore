'use client';
import Image from 'next/image';
import logo from '../public/images/logo.svg';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <Image
        src={logo}
        alt={`${APP_NAME} logo`}
        width={50}
        height={50}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Requested Page Not Found</p>
        <Button
          variant={'outline'}
          className="mt-4 ml-2"
          onClick={() => (window.location.href = '/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
