import { insertNodes, PlateEditor } from "@udecode/plate";
import { useEffect, useRef } from "react";
import { Descendant, Element, Transforms, Editor, Range } from 'slate';
import { getEditingNode } from "../utils/SyncingEditor";

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
      if (data.type === 'node-update') {
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
    insertNodes(editor, payload.nodes);
  }
  
  const handleDocChange = () => {
    if (isSocketChange.current) {     // prevent infinite loop of socket and local changes
      isSocketChange.current = false
      return
    }
    const { node, range } = getEditingNode(editor)
    if (node && range) {
      const payload = {
        range,
        nodes: node,
      }
      docSocket.current?.send(JSON.stringify({ type: "node-update", payload }));
    }
  }

  return {
    handleDocChange,
    isSocketChange: isSocketChange.current,
  }
}
