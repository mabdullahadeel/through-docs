import { useEffect, useRef } from "react";
import { Descendant, Element, Transforms, Editor, Range } from 'slate';
import { CustomElement } from "../types/editor";

const initialValue: Element[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'A line of text in a paragraph.' }
    ],
  }
];

interface DocsSocket {
  pathDocId: string
  editor: Editor
} 

interface SocketPayload {
  type: string
  payload: any
}

export const useDocsSocket = ({ pathDocId, editor }: DocsSocket) => {
  const docSocket = useRef<WebSocket | null>(null);
  const isSocketChange = useRef<boolean>(false)

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
        const { payload } = data;
        console.log('payload', payload.nodes.id);
        handleLocalDocUpdate(data.payload);
      }
    };

    return () => {
      socket.close();
    };
  }, [pathDocId]);

  const handleLocalDocUpdate = (payload: any) => {
    isSocketChange.current = true;
    // make doc edits here
    isSocketChange.current = false
  }

  const handleDocChange = (value?: Descendant[]) => {
    if (isSocketChange.current) return
    const { selection } = editor;
    
    if (selection) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      const currentNodeValue = block ? block[0] : {type: 'p', id: Date.now() , children: []}
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }

      const payload = {
        range,
        nodes: currentNodeValue,
      }
      docSocket.current?.send(JSON.stringify({ type: "doc-update", payload }));
    }
  }

  return {
    handleDocChange,
    isSocketChange: isSocketChange.current,
  }
}
