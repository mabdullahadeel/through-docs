import React, { createContext } from 'react';

export interface DocPageContent {
  docId: string;
  setDocId?: (docId: string) => void;
}

export const DocPageContext = createContext<DocPageContent>({
  docId: '',
});

export const DocPageContextProvider: React.FC = ({ children }) => {
  const [docId, setDocId] = React.useState<string>('');

  return (
    <DocPageContext.Provider value={{ docId, setDocId }}>
      {children}
    </DocPageContext.Provider>
  );
};
