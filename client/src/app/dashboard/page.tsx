'use client';

import { useEffect, useState } from 'react';
import API from '@/api';
import { Value } from '@udecode/plate-common';

import { toast } from '@/lib/ToastProvider';
import { useDebounce } from '@/hooks/use-debounce';
import PlateEditor from '@/components/plate-editor';

export default function Dashboard() {
  const [content, setContent] = useState([]);
  const [noteId, setNoteId] = useState('');
  const [saving, setSaving] = useState(false);

  const debouncedContent = useDebounce(content, 5000);
  const initNote = async () => {
    try {
      const newNoteId = await API.NotesService.init();
      setNoteId(newNoteId);
      return newNoteId;
    } catch (e: unknown) {
      console.log(e);
      toast('Could not initialize a note', { type: 'error' });
    }
  };
  const handleSave = async (note: Value) => {
    if (note.length === 0) {
      return;
    }

    setSaving(true);
    const id = noteId.length > 0 ? noteId : await initNote();
    const payload = {
      title: note[0].children[0].text as string,
      body: note.slice(1),
      id,
    };

    try {
      await API.NotesService.update(payload);
      console.log('Saved note');
      setSaving(false);
    } catch (e: unknown) {
      console.log(e);
      toast('Could not save the note. Please check your connection.', {
        type: 'error',
      });
    }
  };

  // Save 5 seconds after user pause
  useEffect(() => {
    if (debouncedContent) {
      handleSave(debouncedContent);
    }
  }, [debouncedContent]);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <p className="text-sm text-slate-400">{saving ? 'Saving...' : 'Saved'}</p>
      <div className="max-w-[1336px] rounded-lg border bg-background shadow">
        <PlateEditor onChange={setContent} />
      </div>
    </section>
  );
}
