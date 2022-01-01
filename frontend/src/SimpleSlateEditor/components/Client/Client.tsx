import React from 'react';
import { SimpleSlateElement } from '../../../types/simple-editor';

const defaultValue: SimpleSlateElement[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

interface ClientProps {
  name: string;
  id: string;
}
