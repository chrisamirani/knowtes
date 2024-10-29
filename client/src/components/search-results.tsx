'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '@/api';
import { INote } from '@/api-sdk';
import { Loader2 } from 'lucide-react';

import { toast } from '@/lib/ToastProvider';
import { useDebounce } from '@/hooks/use-debounce';

import { buttonVariants } from './plate-ui/button';
import { DialogClose } from './plate-ui/dialog';

interface IProps {
  query: string;
}
export default function SearchResults(props: IProps) {
  const [notes, setNotes] = useState<Omit<INote, 'body'>[]>([]);
  const [loading, setLoading] = useState(true);
  const debouncedQuery = useDebounce(props.query, 1000);
  useEffect(() => {
    const queryNotes = async () => {
      try {
        const res = await API.NotesService.search(debouncedQuery);

        setNotes(res);
      } catch (e: unknown) {
        console.log(e);
        toast('Could not search notes', { type: 'warning' });
      }
      setLoading(false);
    };

    queryNotes();
  }, [debouncedQuery]);

  const NotesList = () => {
    if (notes.length === 0) {
      if (loading) {
        return <Loader2 className="size-6 animate-spin" />;
      }
      return <p>No results</p>;
    }
    return notes.map((note, index) => (
      <DialogClose key={index} asChild>
        <Link
          className={`${buttonVariants({ size: 'default', variant: 'outline' })} !block w-full overflow-hidden text-ellipsis text-left`}
          href={`/dashboard?id=${note.id}`}
        >
          {note.title}
        </Link>
      </DialogClose>
    ));
  };
  return (
    <div>
      <h4>Your search results:</h4>
      <div className="flex max-h-56 scroll-m-0 flex-col items-center justify-center gap-2 overflow-y-scroll">
        <NotesList />
      </div>
    </div>
  );
}
