import React from 'react';
import { HeadingToolbar, MentionCombobox, Plate } from '@udecode/plate';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CONFIG } from '../../config/config';
import { VALUES } from '../../config/values/values';
import { MarkBallonToolbar, ToolbarButtons } from '../../config/components/Toolbars';
import { usePlugins } from '../../hooks/usePlugins';
import { MENTIONABLES } from '../../config/mentionables';

interface Props {}
const id = "through-docs";

export const PlateEditor: React.FC<Props> = () => {
  const { plugins } = usePlugins();
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        id={id}
        editableProps={CONFIG.editableProps}
        initialValue={VALUES.playground}
        plugins={plugins}
        onChange={(newValue) => console.log(newValue)}
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