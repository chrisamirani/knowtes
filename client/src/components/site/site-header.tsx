'use client';

import { useEffect } from 'react';

import { siteConfig } from '@/config/site';
import { useUserStore } from '@/lib/store';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/plate-ui/button';
import { MainNav } from '@/components/site/main-nav';

import CommandCenter from '../files';

export function SiteHeader() {
  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <CommandCenter />
          </nav>
        </div>
      </div>
    </header>
  );
}
