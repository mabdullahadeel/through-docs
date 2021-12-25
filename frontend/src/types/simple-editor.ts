import { BaseEditor, Descendant } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export interface ParagraphElement extends Node {
  type: "paragraph";
  children: Descendant[],
}

export type LinkElement = {
  type: "link";
  children: Descendant[],
}

export type ListElement = {
  type: 'list-item';
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

export type SimpleSlateElement = ParagraphElement | LinkElement | ListElement

export type SimpleSlateText = SimpleSlateCustomText | EmptyText