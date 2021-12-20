import React from 'react';
import { HeadingToolbar, MentionCombobox, Plate, usePlateEditorRef } from '@udecode/plate';
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
        // initialValue={VALUES.playground}
        plugins={plugins}
        onChange={(_newValue) => {
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