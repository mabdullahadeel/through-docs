import React, { useState, useMemo } from 'react';
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
import { withSocketCollaboration } from '@through-docs/th-socket-client';

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
        : 'http://localhost:8000';

    const options = {
      docId: '/' + docId,
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
};
