import React from 'react';
import { SimpleSlateEditor } from '../../../types/simple-editor';

export interface SimpleSlateEditorFrame {
  editor: SimpleSlateEditor;
  value: Node[];
  decorate: any;
  onChange: (value: Node[]) => void;
}
