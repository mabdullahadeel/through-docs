import { AutomergeEditor } from './automerge-editor';
import { CollabAction } from '@slate-collaborative/bridge';

export interface ThSlateSocketPluginOptions {
  url: string;
  autoConnect: boolean;

  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (msg: string) => void;
}

export interface WithWebSocketSlateEditor {
  socket: WebSocket | null;

  connect: () => void;
  disconnect: () => void;

  send: (op: CollabAction) => void;
  receive: (op: CollabAction) => void;

  destroy: () => void;
}

const withWebSocketSlateEditor = <T extends AutomergeEditor>(
  editor: T & WithWebSocketSlateEditor,
  options: ThSlateSocketPluginOptions
) => {
  const { onConnect, onDisconnect, onError, url, autoConnect } = options;

  editor.connect = () => {
    if (!editor.socket) {
      editor.socket = new WebSocket(url);

      editor.socket.onopen = () => {
        /**
         * @todo : set the `editor.clientId` to some proper uid value
         */
        editor.clientId = editor.socket?.url || Date.now().toString();

        editor.openConnection();

        onConnect && onConnect();
      };
    }

    editor.socket.onmessage = (event) => {
      editor.receive(JSON.parse(event.data));
    };

    editor.socket.onerror = (_event) => {
      onError && onError('Socket error');
    };

    editor.socket.onclose = (_event) => {
      editor.gabageCursor();
      onDisconnect && onDisconnect();
    };

    return editor;
  };

  /**
   * Disconnect from Socket.
   */

  editor.disconnect = () => {
    editor.socket?.close();

    editor.closeConnection();

    return editor;
  };

  /**
   * Receive transport msg.
   */

  editor.receive = (msg: CollabAction) => {
    switch (msg.type) {
      case 'operation':
        return editor.receiveOperation(msg.payload);
      case 'document':
        return editor.receiveDocument(msg.payload);
    }
  };

  /**
   * Send message to socket.
   */

  editor.send = (payload: CollabAction) => {
    editor.socket?.send(JSON.stringify(payload));
  };

  /**
   * Close socket and connection.
   */

  editor.destroy = () => {
    editor.socket?.close();

    editor.closeConnection();
  };

  autoConnect && editor.connect();

  return editor;
};

export default withWebSocketSlateEditor;
