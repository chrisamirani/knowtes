'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import API from '@/api';
import { Value } from '@udecode/plate-common';

import { toast } from '@/lib/ToastProvider';
import { useDebounce } from '@/hooks/use-debounce';
import FullPageLoader from '@/components/full-page-loader';
import { Icons } from '@/components/icons';
import PlateEditor from '@/components/plate-editor';
import { buttonVariants } from '@/components/plate-ui/button';
import { Separator } from '@/components/plate-ui/separator';
import RecentNotes from '@/components/recent-notes';

const initialTitle = 'Start with a title';

const emptyContent = [
  {
    type: 'h1',
    children: [{ text: initialTitle }],
  },
];
export default function Dashboard() {
  const [content, setContent] = useState<Value | never[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [noteId, setNoteId] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [randomNoteId, setRandomNoteId] = useState('');
  const params = useSearchParams();

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
  const handleSave = async (body: Value) => {
    if (body.length === 0) {
      return;
    }

    const title = body[0].children[0].text as string;

    if (title === initialTitle) {
      return;
    }
    setSaving(true);
    const id = noteId ? noteId : await initNote();
    const payload = {
      title,
      body,
      id,
    };

    try {
      await API.NotesService.update(payload);
      setSaving(false);
    } catch (e: unknown) {
      console.log(e);
      toast('Could not save the note. Please check your connection.', {
        type: 'error',
      });
    }
  };

  // show the full page loader when content is empty
  useEffect(() => {
    if (!content) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [content]);

  // Save 5 seconds after user pause
  useEffect(() => {
    if (debouncedContent) {
      handleSave(debouncedContent);
    }
  }, [debouncedContent]);

  useEffect(() => {
    const init = async () => {
      const id = params.get('id');
      if (!id) {
        setContent(undefined);
        // intentionally pause to trigger a render
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNoteId(undefined);
        setContent(emptyContent);
        return;
      }
      try {
        setNoteId(id);
        setContent(undefined);
        const note = await API.NotesService.byId(id);
        if (!note) {
          return toast('Could not find your note. Please try again later', {
            type: 'warning',
          });
        }

        setContent(note.body);
      } catch (e: unknown) {
        console.log(e);
        toast('could not find your note. Please try again later', {
          type: 'warning',
        });
      }
    };
    setRandomNoteId(String(Math.random()).slice(2));
    init();
  }, [params]);

  return (
    <section className="container flex !h-full gap-6">
      <div className="relative w-full max-w-[1336px]">
        {loading ? (
          <FullPageLoader />
        ) : (
          <PlateEditor content={content} onChange={setContent} />
        )}
      </div>
      <div className="relative m-2 h-full min-h-[500px] max-h-[600px] min-w-[300px] rounded-md bg-secondary p-3 shadow-md">
        <p className="text-sm text-slate-900">
          <strong>Status: </strong>
          {saving ? 'Saving...' : 'Saved'}
        </p>
        <Separator className="my-3" />
        <RecentNotes />
        <Link
          className={`${buttonVariants({
            size: 'default',
            variant: 'default',
            isMenu: true,
          })} absolute inset-x-0 bottom-0 box-border max-w-full`}
          href={`/dashboard?note=${randomNoteId}`}
        >
          New note
          <Icons.add className="ml-2 size-5" />
        </Link>
      </div>
    </section>
  );
}
