import React, { Component, useState } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useEffect } from 'react';

const EditorComponent = (props) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
      setEditorState(editorState);
    }

    useEffect(() => {
        props.setEditorValue(editorState);
        if(props.clearEditor === true){
            clearEditor();
        }
    });

    const clearEditor = (html ="<p></p>") => {
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
        }
    };
   
    return (
        <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        // toolbar={toolbarConfig}
        />
    );

}

export default EditorComponent;