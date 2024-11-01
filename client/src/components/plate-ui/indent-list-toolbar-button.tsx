import React from 'react';
import { withRef } from '@udecode/cn';
import { ListStyleType } from '@udecode/plate-indent-list';
import {
  useIndentListToolbarButton,
  useIndentListToolbarButtonState,
} from '@udecode/plate-indent-list/react';

import { ToolbarButton } from './toolbar';

export const IndentListToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: ListStyleType;
  }
>(({ nodeType = ListStyleType.Disc }, ref) => {
  const state = useIndentListToolbarButtonState({ nodeType });
  const { props } = useIndentListToolbarButton(state);

  return (
    <ToolbarButton
      className="pl-0"
      ref={ref}
      tooltip={
        nodeType === ListStyleType.Disc ? 'Bulleted List' : 'Numbered List'
      }
      {...props}
    ></ToolbarButton>
  );
});
