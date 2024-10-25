import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/plate-ui/dialog';

import { Icons } from './icons';
import { buttonVariants } from './plate-ui/button';
import { Input } from './plate-ui/input';
import RecentNotes from './recent-notes';

export default function CommandCenter() {
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
        <div
          className={buttonVariants({
            size: 'default',
            variant: 'default',
            isMenu: true,
          })}
        >
          New note
          <Icons.add className="size-5 ml-2" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
