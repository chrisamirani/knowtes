import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/plate-ui/dialog';

import { Icons } from './icons';
import { buttonVariants } from './plate-ui/button';
import { Input } from './plate-ui/input';
import RecentNotes from './recent-notes';

export default function CommandCenter() {
  const params = useSearchParams();
  const [newId, setNewId] = useState('');
  useEffect(() => {
    setNewId(String(Math.random()).slice(2));
  }, [params]);
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          size: 'default',
          variant: 'ghost',
        })}
      >
        <Icons.search className="size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Command center</DialogTitle>
        <Input type="search" placeholder="What are you looking for?" />
        <RecentNotes />
        <DialogClose asChild>
          <Link
            className={buttonVariants({
              size: 'default',
              variant: 'default',
              isMenu: true,
            })}
            href={`/dashboard?note=${newId}`}
          >
            New note
            <Icons.add className="ml-2 size-5" />
          </Link>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
