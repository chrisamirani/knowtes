'use client';

import { buttonVariants } from '@/components/plate-ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/plate-ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/plate-ui/tabs';

import { Icons } from '../icons';
import TeamTab from './team-tab';

export function Settings() {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          size: 'default',
          variant: 'ghost',
        })}
      >
        <Icons.settings className="size-5" />
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogTitle></DialogTitle>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TeamTab />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
