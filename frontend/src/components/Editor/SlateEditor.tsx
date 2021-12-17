import React, { useMemo, useState } from "react";
import { createEditor, Descendant, Element } from 'slate'
import { Editable, Slate, withReact } from "slate-react";

interface Props {}

export const SlateEditor: React.FC<Props> = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const initialValue: Element[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];

  const [value, setValue] = useState<Descendant[]>(initialValue);
  return (
    <Slate 
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable />
    </Slate>
  )
};