import { ELEMENT_PARAGRAPH, PlateEditor } from "@udecode/plate";
import { Editor } from "slate";


export const getEditingNode = (editor: PlateEditor) => {
  const { selection } = editor;
    
    if (selection) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })
      const currentNodeValue = block ? block[0] : {type: ELEMENT_PARAGRAPH, id: Date.now() , children: []}
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      
      return {
        range,
        node: currentNodeValue,
      }
    }
    return {}
}