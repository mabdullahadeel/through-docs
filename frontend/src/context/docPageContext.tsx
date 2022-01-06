import { useRouter } from 'next/router';
import React, { createContext, useEffect } from 'react';

export interface DocPageContent {
  docId: string;
  setDocId: React.Dispatch<React.SetStateAction<string>>;
}

export const DocPageContext = createContext<DocPageContent>({
  docId: '',
  setDocId: () => {},
});

export const DocPageContextProvider: React.FC = ({ children }) => {
  const [docId, setDocId] = React.useState<string>('');
  const { id } = useRouter().query;

  useEffect(() => {
    console.log('id: ', id);
    setDocId(id as string);
  }, [id]);

  return (
    <DocPageContext.Provider value={{ docId, setDocId }}>
      {docId && docId !== 'undefined' ? children : <p>Loading...</p>}
    </DocPageContext.Provider>
  );
};
