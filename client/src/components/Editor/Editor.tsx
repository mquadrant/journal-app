import React,{useEffect} from 'react';
import {Editor, EditorState} from 'draft-js';
import './style.css';

export default function MyEditor(updateEdit?:any): any {
  const [editorState, setEditorState]:any[] = React.useState(
    EditorState.createEmpty()
  );
  const updateEdite = (editorState:any)=>{
    console.log(editorState.getCurrentContent())
    // setValues({
    //   ...values,
    //   body:editorState
    // });
  }
  useEffect(() => {
    updateEdite(editorState);
  }, [editorState,updateEdit])
  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder='How did your day go?'
    />
  );
}
