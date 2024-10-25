'use client';

import React, { useEffect, useState } from 'react';
import API from '@/api';
import { INote } from '@/api-sdk';

import { toast } from '@/lib/ToastProvider';

import { buttonVariants } from './plate-ui/button';

export default function RecentNotes() {
  const [notes, setNotes] = useState<Omit<INote, 'body'>[]>([]);
  useEffect(() => {
    const fetchRecentNotes = async () => {
      try {
        const res = await API.NotesService.getRecent();

        setNotes(res);
      } catch (e: unknown) {
        console.log(e);
        toast('Could not get recent notes', { type: 'warning' });
      }
    };

    fetchRecentNotes();
  }, []);

  const NotesList = () => {
    if (notes.length === 0) {
      return (
        <div className="flex h-10 items-center justify-center rounded-md bg-secondary">
          <p>No recent notes</p>
        </div>
      );
    }
    return notes.map((note) => (
      <p className={buttonVariants({ size: 'default', variant: 'ghost' })}>
        {note.title}
      </p>
    ));
  };
  return (
    <div>
      <h4>Recent notes:</h4>
      <NotesList />
    </div>
  );
}
