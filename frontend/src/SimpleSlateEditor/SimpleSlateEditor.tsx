import { DocPageContextProvider } from '@app/context/docPageContext';
import React, { useEffect } from 'react';
import EditorRoom from './components/Room/Room';

export const SimpleSlateEditor: React.FC = () => {
  return (
    <DocPageContextProvider>
      <EditorRoom />
    </DocPageContextProvider>
  );
};
