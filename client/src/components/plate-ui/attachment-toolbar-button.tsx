import React from 'react';
import API from '@/api';
import { withRef } from '@udecode/cn';
import { useEditorRef } from '@udecode/plate-common/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { useMediaToolbarButton } from '@udecode/plate-media/react';

import { toast } from '@/lib/ToastProvider';
import { Icons } from '@/components/icons';

import { ToolbarButton } from './toolbar';

export const AttachmentToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: typeof LinkPlugin.key;
  }
>(({ nodeType, ...rest }, ref) => {
  const { props } = useMediaToolbarButton({ nodeType });
  const editor = useEditorRef();

  props.onClick = async () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = async () => {
      const file = input.files ? input.files[0] : undefined;
      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('fileType', file.type);
          const url = await API.UploadsService.uploadFile({
            file,
            fileType: file.type,
          });

          editor.insertNode({
            id: String(Math.random()).slice(7),
            type: 'p',
            children: [
              {
                target: '_blank',
                id: String(Math.random()).slice(7),
                type: 'a',
                url,
                children: [{ text: `📁 ${file.name}` }],
              },
            ],
          });
        } catch (e) {
          console.log(e);
          toast('Could not upload file', { type: 'error' });
        }
      } else {
        toast('No file selected', { type: 'warning' });
      }
    };

    input.click();
  };
  return (
    <ToolbarButton ref={ref} {...props} {...rest}>
      <Icons.upload className="mr-2 size-5" />
      Attachment
    </ToolbarButton>
  );
});
