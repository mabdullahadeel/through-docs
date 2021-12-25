import { ELEMENT_H1, PlateEditor } from "@udecode/plate";
import { useEffect, useRef, useState } from "react";
import { Transforms, Editor } from 'slate';
import { getEditingNode } from "../utils/SyncingEditor";

interface DocsSocket {
  pathDocId: string
  editor:  PlateEditor
} 

interface SocketPayload {
  type: string
  payload: any
}

const innintialValue = [
  {
    type: ELEMENT_H1,
    align: "center",
    id: Date.now(),
    children: [
      {text: "🙋‍♂️ Untitled Document"}
    ]
  }
]

const cached_initial_docs = [
  {
    "type": "h1",
    "align": "center",
    "id": 1640030725684,
    "children": [
      {"text": "🙋‍♂️ Untitled Document Cowboy"}
    ]
  }
]


export const useDocsSocket = ({ pathDocId, editor }: DocsSocket) => {
  const docSocket = useRef<WebSocket | null>(null);
  const isSocketChange = useRef<boolean>(false);
  const [initialValue, setInitialValue] = useState(cached_initial_docs)

  // useEffect(() => {
  //   if (pathDocId) {
  //     // make api call to the backend using fetch
  //     fetch(`http://localhost:8000/api/v1/d/docs/${pathDocId}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setInitialValue(data)
  //     })
  //     .catch(err => console.log(err));
  //   }
  // }, [pathDocId])

  useEffect(() => {
    if (!pathDocId || !initialValue) return
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
  }, [pathDocId, initialValue]);

  const handleLocalDocUpdate = (payload: any) => {
    isSocketChange.current = true;
    Transforms.select(editor, payload.range);
    Editor.insertFragment(editor, [payload.nodes]);
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
    initialValue,
  }
}
