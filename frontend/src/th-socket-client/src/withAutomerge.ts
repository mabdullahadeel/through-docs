import Automerge from 'automerge';

import { Editor } from 'slate';

import { AutomergeEditor } from './automerge-editor';

import { CursorData, CollabAction } from '@slate-collaborative/bridge';
import { WithWebSocketSlateEditor } from './withSocket';

export interface AutomergeOptions {
  docId: string;
  cursorData?: CursorData;
  preserveExternalHistory?: boolean;
}

const withAutomerge = <T extends Editor>(
  editor: T,
  options: AutomergeOptions
) => {
  const e = editor as T & AutomergeEditor & WithWebSocketSlateEditor;

  const { onChange } = e;

  const { docId, cursorData, preserveExternalHistory } = options || {};

  e.docSet = new Automerge.DocSet();
  e.docSet.setDoc(docId, Automerge.init());

  const createConnection = () => {
    if (e.connection) e.connection.close();

    e.connection = AutomergeEditor.createConnection(e, (data: CollabAction) =>
      e.send(data)
    );

    e.connection.open();
  };

  createConnection();

  /**
   * Open Automerge Connection
   */

  e.openConnection = () => e.connection.open();

  /**
   * Close Automerge Connection
   */

  e.closeConnection = () => e.connection.close();

  /**
   * Clear cursor data
   */

  e.gabageCursor = () => AutomergeEditor.garbageCursor(e, docId);

  /**
   * Editor onChange
   */

  e.onChange = () => {
    const operations: any = e.operations;

    if (!e.isRemote) {
      AutomergeEditor.applySlateOps(e, docId, operations, cursorData);
    }

    onChange();
  };

  /**
   * Receive document value
   */

  e.receiveDocument = (data) => {
    AutomergeEditor.receiveDocument(e, docId, data);

    createConnection();
  };

  /**
   * Receive Automerge sync operations
   */

  e.receiveOperation = (data) => {
    if (docId !== data.docId) return;

    AutomergeEditor.applyOperation(e, docId, data, preserveExternalHistory);
  };

  return e;
};

export default withAutomerge;
