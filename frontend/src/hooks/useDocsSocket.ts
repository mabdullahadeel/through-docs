import { PlateEditor } from "@udecode/plate";
import { useEffect, useRef } from "react";
import { Descendant, Element, Transforms, Editor, Range } from 'slate';
import { CustomElement } from "../types/editor";

interface DocsSocket {
  pathDocId: string
  editor:  PlateEditor
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
        handleLocalDocUpdate(data.payload);
      }
    };

    return () => {
      socket.close();
    };
  }, [pathDocId]);

  const handleLocalDocUpdate = (payload: any) => {
    isSocketChange.current = true;
    Transforms.select(editor, {
      anchor: Editor.start(editor, []),
      focus: Editor.end(editor, []),
    })
    Transforms.delete(editor);
    Transforms.insertNodes(editor, payload.nodes);
  }
  
  const handleDocChange = (value?: Descendant[]) => {
    if (isSocketChange.current) {     // prevent infinite loop of socket and local changes
      isSocketChange.current = false
      return
    }
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
