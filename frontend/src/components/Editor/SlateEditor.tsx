import React, { useMemo } from "react";
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from "slate-react";
import { useDocsSocket } from "../../hooks/useDocsSocket";
import { useRouter } from 'next/router'

interface Props {}

export const SlateEditor: React.FC<Props> = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { id } = useRouter().query;
  const { editorValue, handleDocChange } = useDocsSocket({ pathDocId: id as string });

  return (
    <Slate 
      editor={editor}
      value={editorValue}
      onChange={newValue => handleDocChange(newValue)}
    >
      <Editable
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
      />
    </Slate>
  )
};