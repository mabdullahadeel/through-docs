import { Editor } from 'slate'
import { SimpleSlateEditor } from '../../types/simple-editor'

export const toggleMark = (editor: SimpleSlateEditor, format: any) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isMarkActive = (editor: SimpleSlateEditor, format: any) => {
  const marks: any = Editor.marks(editor)
  return marks ? marks[format] === true : false
}
