import React, { useMemo } from "react";
import { createEditor, Descendant, Element } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { useDocsSocket } from "../../hooks/useDocsSocket";
import { useRouter } from 'next/router';


interface Props {}

export const SlateEditor: React.FC<Props> = () => {
  const editor = useMemo(() => withReact(createEditor() as any), []);
  const { id } = useRouter().query;
  const { handleDocChange, isSocketChange } = useDocsSocket({ pathDocId: id as string, editor });

  return (
    <Slate 
      editor={editor}
      value={[{children:[]}]}
      onChange={newValue => {
        // if (!isSocketChange) {
        //   console.log('socket change');
        //   // handleDocChange(newValue)
        // }
      }}
      >
      <Editable
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event: React.KeyboardEvent) => {
          handleDocChange()
        }}
      />
    </Slate>
  )
};