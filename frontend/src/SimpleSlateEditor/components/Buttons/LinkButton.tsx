import React from 'react';
import { useSlate } from 'slate-react';
import { SimpleSlateEditor } from '../../../types/simple-editor';
import { insertLink, isLinkActive, unwrapLink } from '../../plugins/link';
import { IconButton, Icon } from '../EditorFrame/styles/EditorFrame.styles';

const LinkButton = () => {
  const editor = useSlate() as SimpleSlateEditor;

  const isActive = isLinkActive(editor);

  return (
    <IconButton
      active={isActive}
      onMouseDown={(event) => {
        event.preventDefault();

        if (isActive) return unwrapLink(editor);

        const url = window.prompt('Enter the URL of the link:');

        url && insertLink(editor, url);
      }}
    >
      <Icon className="material-icons">link</Icon>
    </IconButton>
  );
};

export default LinkButton;
