import React from 'react';
import { useSlate } from 'slate-react';
import { SimpleSlateEditor } from '../../../types/simple-editor';
import { isMarkActive, toggleMark } from '../../plugins/mark';
import { IconButton, Icon } from '../EditorFrame/styles/EditorFrame.styles';

const MarkButton: React.FC<any> = ({ format, icon }) => {
  const editor = useSlate() as SimpleSlateEditor;
  return (
    <IconButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon className="material-icons">{icon}</Icon>
    </IconButton>
  );
};

export default MarkButton;
