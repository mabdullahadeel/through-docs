import React, { useState, useMemo, useEffect } from 'react';
import {
  SimpleSlateEditor,
  SimpleSlateElement,
} from '../../../types/simple-editor';
import randomColor from 'randomcolor';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { withLinks } from '../../plugins/link';
import { useDocPage } from '../../../hooks/useDocPage';
import { withSocketCollaboration, useCursor } from '@app/th-socket-client';
import { Instance } from '../Room/styles/Room.styles';
import EditorFrame from '../EditorFrame/EditorFrame';

const defaultValue: SimpleSlateElement[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

interface ClientProps {
  name: string;
  id: string;
}

const Client: React.FC<ClientProps> = ({ id, name }) => {
  const [editorValue, setEditorValue] =
    useState<SimpleSlateElement[]>(defaultValue);
  const [isEditorOnline, setIsEditorOnline] = useState<boolean>(false);
  const { docId } = useDocPage();

  const slateEditor = withLinks(
    withReact(withHistory(createEditor() as SimpleSlateEditor))
  );

  const color = useMemo(
    () =>
      randomColor({
        luminosity: 'dark',
        format: 'rgba',
        alpha: 1,
      }),
    []
  );

  const editor = useMemo(() => {
    /* @todo: Change the origin */
    const origin =
      process.env.NODE_ENV === 'production'
        ? window.location.origin
        : 'ws://localhost:8000';

    const options = {
      docId: docId,
      cursorData: {
        name,
        color,
        alphaColor: color.slice(0, -2) + '0.2)',
      },
      url: `${origin}/th-docs/${docId}`,
      connectOpts: {
        query: {
          name,
          token: id,
          docId,
        },
      },
      onConnect: () => setIsEditorOnline(true),
      onDisconnect: () => setIsEditorOnline(false),
      autoConnect: false,
    };
    return withSocketCollaboration(slateEditor, options);
  }, []);

  useEffect(() => {
    editor.connect();

    return editor.destroy;
  }, []);

  const { decorate } = useCursor(editor);

  const toggleOnline = () => {
    const { connect, disconnect } = editor;
    isEditorOnline ? disconnect() : connect();
  };

  return (
    <Instance online={isEditorOnline}>
      <EditorFrame
        editor={editor}
        value={editorValue}
        decorate={decorate}
        onChange={(value) => setEditorValue(value as SimpleSlateElement[])}
      />
    </Instance>
  );
};

export default Client;
