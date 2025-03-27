import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { signOutUser } from '@/lib/actions/user.actions';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

const UserButton = async () => {
  const session = await auth();
  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon className="w-6 h-6" /> Sign In
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm font-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 my-1">
            <form action={signOutUser} className="w-full">
              {' '}
              <Button className="w-full py-4 px-4">Sign Out</Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
