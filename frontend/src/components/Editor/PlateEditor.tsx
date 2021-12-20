import React from 'react';
import { ELEMENT_H1, HeadingToolbar, MentionCombobox, Plate, usePlateEditorRef } from '@udecode/plate';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CONFIG } from '../../config/config';
import { VALUES } from '../../config/values/values';
import { MarkBallonToolbar, ToolbarButtons } from '../../config/components/Toolbars';
import { usePlugins } from '../../hooks/usePlugins';
import { MENTIONABLES } from '../../config/mentionables';
import { usePlateStore } from '@udecode/plate'
import { useDocsSocket } from '../../hooks/useDocsSocket';
import { useRouter } from 'next/router';

const inintialValue = [
  {
    type: ELEMENT_H1,
    align: "center",
    id: Date.now(),
    children: [
      {text: "🙋‍♂️ Untitled Document"}
    ]
  }
]

interface Props {}
const id = "through-docs";

export const PlateEditor: React.FC<Props> = () => {
  const { plugins } = usePlugins();
  const plateStore = usePlateStore();
  const currentEditor = usePlateEditorRef();
  const { id: qid } = useRouter().query;
  const { handleDocChange } = useDocsSocket({ pathDocId: qid as string, editor: currentEditor });
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        id={id}
        editableProps={CONFIG.editableProps}
        initialValue={inintialValue}
        plugins={plugins}
        onChange={(newValue) => {
          console.log(newValue)
          handleDocChange()
        }}
      >
        <HeadingToolbar>
          <ToolbarButtons />
        </HeadingToolbar>

        <MarkBallonToolbar />

        <MentionCombobox items={MENTIONABLES} />
      </Plate>
    </DndProvider>
  )
}