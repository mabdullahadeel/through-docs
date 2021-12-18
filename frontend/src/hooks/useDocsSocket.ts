import { useEffect, useRef, useState } from "react";
import { BaseEditor, Descendant, Element, Operation, Transforms } from 'slate';
import { ReactEditor } from "slate-react";

const initialValue: Element[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  }
];

interface DocsSocket {
  pathDocId: string
  editor: BaseEditor & ReactEditor
}

interface SocketPayload {
  type: string
  payload: any
}

export const useDocsSocket = ({ pathDocId, editor }: DocsSocket) => {
  const docSocket = useRef<WebSocket | null>(null);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  useEffect(() => {
    if (!pathDocId) return
    const socket = new WebSocket(`ws://localhost:8000/th-docs/${pathDocId}`);
    docSocket.current = socket;

    socket.onopen = () => {
      console.log('connected');
    };

    socket.onmessage = (event) => {
      const data:SocketPayload = JSON.parse(event.data);
      if (data.type === 'doc-update') {
        handleLocalDocUpdate(data.payload);
      }
    };

    return () => {
      socket.close();
    };
  }, [pathDocId]);

  const handleLocalDocUpdate = (payload: any) => {
    // setValue(payload);
    console.log('handleLocalDocUpdate', payload);
    // Transforms.insertNodes(editor, payload);
    // editor.deleteFragment();
  }

  const handleDocChange = (value: Descendant[]) => {
    docSocket.current?.send(JSON.stringify({ type: "doc-update", payload: value }));
  }

  return {
    editorValue: value,
    handleDocChange,
    setValue
  }
}
