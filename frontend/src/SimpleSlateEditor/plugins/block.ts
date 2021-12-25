import { Transforms, Editor } from 'slate'
import { SimpleSlateEditor } from '../../types/simple-editor'

const LIST_TYPES: string[] = ['numbered-list', 'bulleted-list']

export const toggleBlock = (editor: SimpleSlateEditor, format: any) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor as SimpleSlateEditor, {
    match: (n: any) => LIST_TYPES.includes(n.type),
    split: true
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  } as any)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const isBlockActive = (editor: SimpleSlateEditor, format: any) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n.type === format
  })

  return !!match
}
