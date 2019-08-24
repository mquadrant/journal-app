import React from 'react';
import {Editor, EditorState} from 'draft-js';
import './style.css';

export default function MyEditor(): any {
  const [editorState, setEditorState]:any[] = React.useState(
    EditorState.createEmpty()
  );

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder='How did your day go?'
    />
  );
}
