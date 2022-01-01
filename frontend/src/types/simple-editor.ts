import { BaseEditor, Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export interface ParagraphElement extends Node {
  type: "paragraph";
  children: Descendant[],
}

export type LinkElement = {
  type: "link";
  href?: string;
  children: Descendant[],
}

export type ListElement = {
  type: 'list-item';
  children: Descendant[],
}

export type BlockElement = {
  type: 'block-quote';
  children: Descendant[],
}

export type BulletedListElement = {
  type: 'bulleted-list';
  children: Descendant[],
}

export type NumeberedList = {
  type: 'numbered-list';
  children: Descendant[],
}

export type HeadingOneElement = {
  type: 'heading-one';
  children: Descendant[],
}

export type HeadingTwoElement = {
  type: 'heading-two';
  children: Descendant[],
}

export type SimpleSlateCustomText = {
  bold?: boolean
  italic?: boolean
  text: string
}

export type EmptyText = {
  text: string
}

export type SimpleSlateEditor = BaseEditor & ReactEditor & HistoryEditor

export type SimpleSlateElement = ParagraphElement 
  | LinkElement
  | ListElement
  | BlockElement
  | BulletedListElement
  | NumeberedList
  | HeadingOneElement
  | HeadingTwoElement

export type SimpleSlateText = SimpleSlateCustomText | EmptyText