import { BaseEditor, Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor, RenderLeafProps } from 'slate-react';

export interface ParagraphElement {
  type: 'paragraph';
  children: Descendant[];
}

export type LinkElement = {
  type: 'link';
  href?: string;
  children: Descendant[];
};

export type ListElement = {
  type: 'list-item';
  children: Descendant[];
};

export type BlockElement = {
  type: 'block-quote';
  children: Descendant[];
};

export type BulletedListElement = {
  type: 'bulleted-list';
  children: Descendant[];
};

export type NumeberedList = {
  type: 'numbered-list';
  children: Descendant[];
};

export type HeadingOneElement = {
  type: 'heading-one';
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: 'heading-two';
  children: Descendant[];
};

export interface SimpleSlateLeaf extends Omit<RenderLeafProps, 'leaf'> {
  leaf: {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    underline?: boolean;
    alphaColor?: string;
    isCaret?: boolean;
    text: Text;
  };
}

export type EmptyText = {
  text: string;
};

export type SimpleSlateEditor = BaseEditor & ReactEditor & HistoryEditor;

export type SimpleSlateElement =
  | ParagraphElement
  | LinkElement
  | ListElement
  | BlockElement
  | BulletedListElement
  | NumeberedList
  | HeadingOneElement
  | HeadingTwoElement;
