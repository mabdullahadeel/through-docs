import React from 'react'
import MarkDownEditor from '../../components/Editor/MarkDownEditor';
import { SlateEditor } from '../../components/Editor/SlateEditor'

interface DocsProps {}

const DocsPage: React.FC<DocsProps> = () => {
  // return <SlateEditor />
  return <MarkDownEditor />
}

export default DocsPage;