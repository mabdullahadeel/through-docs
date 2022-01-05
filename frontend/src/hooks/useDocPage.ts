import { useContext } from 'react';
import { DocPageContext } from '../context/docPageContext';

export const useDocPage = () => {
  return useContext(DocPageContext);
};
