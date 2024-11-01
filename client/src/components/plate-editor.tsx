'use client';

import React, { useRef } from 'react';
import { cn } from '@udecode/cn';
import { Value } from '@udecode/plate-common';
import { Plate } from '@udecode/plate-common/react';

import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';

import { useMyEditor } from './use-editor';

interface IProps {
  onChange: (body: Value | never[]) => void;
  content: Value | never[] | undefined;
}
export default function PlateEditor(props: IProps) {
  const containerRef = useRef(null);

  const editor = useMyEditor(props.content);

  return (
    <Plate
      onValueChange={({ value }) => {
        props.onChange(value as any);
      }}
      editor={editor}
    >
      <div
        ref={containerRef}
        className={cn(
          'relative',
          '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
        )}
      >
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor
          className="py-16"
          style={{ overflow: 'auto', height: 'calc(100vh - 220px)' }}
          autoFocus
          focusRing={false}
          variant="ghost"
          size="md"
        />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </div>
    </Plate>
  );
}
