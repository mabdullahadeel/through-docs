import React from 'react';
import { PlateEditor } from '../../components/Editor/PlateEditor';
// import { SlateEditor } from '../../components/Editor/SlateEditor';

interface DocsProps {}

const DocsPage: React.FC<DocsProps> = () => {
  // return <SlateEditor />
  return <PlateEditor />
}

export default DocsPage;