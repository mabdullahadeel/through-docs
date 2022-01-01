import React, { useCallback } from 'react';
import { Editable, Slate } from 'slate-react';
import {
  SimpleSlateEditor,
  SimpleSlateElement,
} from '../../../types/simple-editor';
import BlockButton from '../Buttons/BlockButton';
import LinkButton from '../Buttons/LinkButton';
import MarkButton from '../Buttons/MarkButton';
import Element from './Element';
import Leaf from './Leaf';
import { ClientFrame } from './styles/EditorFrame.styles';
import { Descendant } from 'slate';
export interface SimpleSlateEditorFrameProps {
  editor: SimpleSlateEditor;
  value: SimpleSlateElement[];
  decorate: any;
  onChange: (value: Descendant[]) => void;
}

const renderElement = (props: any) => <Element {...props} />;

const SimpleEditorFrame: React.FC<SimpleSlateEditorFrameProps> = ({
  decorate,
  editor,
  onChange,
  value,
}) => {
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  return (
    <ClientFrame>
      <Slate editor={editor} value={value} onChange={onChange}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 1,
          }}
        >
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />

          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />

          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />

          <LinkButton />
        </div>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          decorate={decorate}
        />
      </Slate>
    </ClientFrame>
  );
};

export default SimpleEditorFrame;
