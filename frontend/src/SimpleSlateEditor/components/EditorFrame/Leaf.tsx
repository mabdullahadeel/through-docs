import React from 'react';
import { RenderLeafProps } from 'slate-react'

const SimpleEditorFrameLeaf: React.FC<RenderLeafProps> = ({ children, attributes, leaf }) => {
  return <h1>Hello leaf</h1>
};


export default SimpleEditorFrameLeaf;