import React from 'react';
import { SimpleSlateElement } from '../../../types/simple-editor';

export interface ElementProps {
  attributes: any
  element: SimpleSlateElement
}

const Element: React.FC<ElementProps> = ({ children, attributes, element }) => {
  switch (element.type) {
    case "link":
      return (
        <a href={element.href} {...attributes}>
          {children}
        </a>
      )
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>
    case "list-item":
      return <li {...attributes}>{children}</li>
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>
    default: 
      return <p {...attributes}>{children}</p>
  }
};


export default Element;