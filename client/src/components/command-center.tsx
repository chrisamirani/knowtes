import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/plate-ui/dialog';

import { Icons } from './icons';
import { buttonVariants } from './plate-ui/button';
import { Input } from './plate-ui/input';
import SearchResults from './search-results';

export default function CommandCenter() {
  const [query, setQuery] = useState('');
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
        <Input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="search"
          placeholder="What are you looking for?"
        />
        <SearchResults query={query} />
      </DialogContent>
    </Dialog>
  );
}
