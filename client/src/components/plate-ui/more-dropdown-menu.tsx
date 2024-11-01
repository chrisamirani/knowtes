import React from 'react';
import {
  CodePlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
} from '@udecode/plate-basic-marks/react';
import { focusEditor, useEditorRef } from '@udecode/plate-common/react';
import { ListStyleType } from '@udecode/plate-indent-list';
import { ImagePlugin } from '@udecode/plate-media/react';

import { Icons } from '@/components/icons';

import { AttachmentToolbarButton } from './attachment-toolbar-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { IndentListToolbarButton } from './indent-list-toolbar-button';
import { IndentTodoToolbarButton } from './indent-todo-toolbar-button';
import { IndentToolbarButton } from './indent-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { MediaToolbarButton } from './media-toolbar-button';
import { OutdentToolbarButton } from './outdent-toolbar-button';
import { ToolbarButton } from './toolbar';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert">
          <Icons.more />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto"
      >
        <DropdownMenuItem
          onSelect={() => {
            editor.tf.toggle.mark({
              clear: [SubscriptPlugin.key, SuperscriptPlugin.key],
              key: SuperscriptPlugin.key,
            });
            focusEditor(editor);
          }}
        >
          <Icons.superscript className="mr-2 size-5" />
          Superscript
          {/* (⌘+,) */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            editor.tf.toggle.mark({
              clear: [SuperscriptPlugin.key, SubscriptPlugin.key],
              key: SubscriptPlugin.key,
            });
            focusEditor(editor);
          }}
        >
          <Icons.subscript className="mr-2 size-5" />
          Subscript
          {/* (⌘+.) */}
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            focusEditor(editor);
          }}
        >
          <MediaToolbarButton nodeType={ImagePlugin.key} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            focusEditor(editor);
          }}
        >
          <AttachmentToolbarButton />
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            focusEditor(editor);
          }}
        >
          <IndentTodoToolbarButton className="!bg-transparent" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            focusEditor(editor);
          }}
        >
          <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
            <Icons.code className="mr-2 size-5" />
            Code
          </MarkToolbarButton>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            focusEditor(editor);
          }}
        >
          <IndentListToolbarButton nodeType={ListStyleType.Disc} />
          <Icons.ul className="mr-2 size-5" />
          Bullet list
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            focusEditor(editor);
          }}
        >
          <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
          <Icons.ol className="mr-2 size-5" />
          Ordered list
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            focusEditor(editor);
          }}
        >
          <OutdentToolbarButton />
          Outdent
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            focusEditor(editor);
          }}
        >
          <IndentToolbarButton />
          Indent
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
