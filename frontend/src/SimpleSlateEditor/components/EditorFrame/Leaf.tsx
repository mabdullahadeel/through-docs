import React from 'react';
import { SimpleSlateLeaf } from '../../../types/simple-editor';
import Caret from '../Caret/Caret';

const SimpleEditorFrameLeaf: React.FC<SimpleSlateLeaf> = ({
  children,
  attributes,
  leaf,
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return (
    <span
      {...attributes}
      style={
        {
          position: 'relative',
          backgroundColor: leaf.alphaColor,
        } as any
      }
    >
      {leaf.isCaret ? <Caret {...(leaf as any)} /> : null}
      {children}
    </span>
  );
};

export default SimpleEditorFrameLeaf;
