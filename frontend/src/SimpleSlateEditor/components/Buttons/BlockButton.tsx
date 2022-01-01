import React from 'react';
import { useSlate } from 'slate-react';
import { SimpleSlateEditor } from '../../../types/simple-editor';
import { isBlockActive, toggleBlock } from '../../plugins/block';
import { IconButton, Icon } from '../EditorFrame/styles/EditorFrame.styles';

const BlockButton: React.FC<any> = ({ format, icon }) => {
  const editor = useSlate() as SimpleSlateEditor;
  return (
    <IconButton
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon className="material-icons">{icon}</Icon>
    </IconButton>
  );
};

export default BlockButton;
