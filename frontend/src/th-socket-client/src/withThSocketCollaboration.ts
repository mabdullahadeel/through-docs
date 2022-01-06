import { Editor } from 'slate';
import { AutomergeEditor } from './automerge-editor';

import withThAutomerge, { AutomergeOptions } from './withAutomerge'
import withWebSocketSlateEditor, {
  WithWebSocketSlateEditor,
  ThSlateSocketPluginOptions
} from './withSocket';


export const withSocketCollaboration = <T extends Editor>(
  editor: T,
  options: AutomergeOptions & ThSlateSocketPluginOptions,
): T & WithWebSocketSlateEditor & AutomergeEditor  => withWebSocketSlateEditor(withThAutomerge(editor, options), options);
