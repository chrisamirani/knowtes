'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { useKnowtesStore } from '@/lib/store';
import { MainNav } from '@/components/site/main-nav';

import { Authentication } from '../auth';
import CommandCenter from '../command-center';
import { Icons } from '../icons';
import { buttonVariants } from '../plate-ui/button';
import { Settings } from '../settings';

const UserHeader = () => {
  const [randomNoteId, setRandomNoteId] = useState('');
  const params = useSearchParams();
  useEffect(() => {
    setRandomNoteId(String(Math.random()).slice(2));
  }, [params]);
  return (
    <div>
      <CommandCenter />
      <Settings />
      <Link
        className={`${buttonVariants({
          size: 'sm',
          variant: 'default',
        })}`}
        href={`/dashboard?note=${randomNoteId}`}
      >
        New
        <Icons.add className="ml-2 size-5" />
      </Link>
    </div>
  );
};

export function SiteHeader() {
  const { user, fetchUser, fetchMembers } = useKnowtesStore();
  useEffect(() => {
    fetchUser();
    fetchMembers();
  }, [fetchUser, fetchMembers]);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {user?.name ? <UserHeader /> : <Authentication />}
          </nav>
        </div>
      </div>
    </header>
  );
}
