import React from 'react';
import API from '@/api';
import { withRef } from '@udecode/cn';
import { useEditorRef } from '@udecode/plate-common/react';
import { insertMedia } from '@udecode/plate-media';
import { useMediaToolbarButton } from '@udecode/plate-media/react';

import { toast } from '@/lib/ToastProvider';
import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

import type { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';

export const MediaToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: typeof ImagePlugin.key | typeof MediaEmbedPlugin.key;
  }
>(({ nodeType, ...rest }, ref) => {
  const { props } = useMediaToolbarButton({ nodeType });
  const editor = useEditorRef();
  props.onClick = async () => {
    await insertMedia(editor, {
      type: nodeType,
      getUrl: async () => {
        return new Promise((resolve, reject) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';

          input.onchange = async () => {
            const file = input.files ? input.files[0] : undefined;
            if (file) {
              try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('fileType', file.type);
                const upload = await API.UploadsService.uploadFile({
                  file,
                  fileType: file.type,
                });
                resolve(upload);
              } catch (e) {
                console.log(e);
                toast('Could not upload file', { type: 'error' });
              }
            } else {
              reject('No file selected');
            }
          };

          input.click();
        });
      },
    });
  };
  return (
    <ToolbarButton ref={ref} {...props} {...rest}>
      <Icons.image />
    </ToolbarButton>
  );
});
