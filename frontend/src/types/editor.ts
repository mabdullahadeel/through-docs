import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

interface CustomText { text: string }
interface ParagraphElement { 
  type: 'paragraph'
  children: CustomText[]
}

type SupportedElements = ParagraphElement

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: SupportedElements
    Text: CustomText
  }
}