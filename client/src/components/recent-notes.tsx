'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '@/api';
import { INote } from '@/api-sdk';
import { Loader2 } from 'lucide-react';

import { toast } from '@/lib/ToastProvider';

import { buttonVariants } from './plate-ui/button';
import { DialogClose } from './plate-ui/dialog';

export default function RecentNotes() {
  const [notes, setNotes] = useState<Omit<INote, 'body'>[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecentNotes = async () => {
      try {
        const res = await API.NotesService.getRecent();

        setNotes(res);
      } catch (e: unknown) {
        console.log(e);
        toast('Could not get recent notes', { type: 'warning' });
      }
      setLoading(false);
    };

    fetchRecentNotes();
  }, []);

  const NotesList = () => {
    if (notes.length === 0) {
      if (loading) {
        return <Loader2 className="size-6 animate-spin" />;
      }
      return <p>No recent notes</p>;
    }
    return notes.map((note, index) => (
      <DialogClose key={index} asChild>
        <Link
          className={`${buttonVariants({ size: 'default', variant: 'outline' })} !block w-full text-left`}
          href={`/dashboard?id=${note.id}`}
        >
          {note.title}
        </Link>
      </DialogClose>
    ));
  };
  return (
    <div>
      <h4>Recent notes:</h4>
      <div className="flex max-h-56 scroll-m-0 flex-col items-center justify-center gap-2 overflow-y-scroll rounded-md bg-secondary p-5">
        <NotesList />
      </div>
    </div>
  );
}
