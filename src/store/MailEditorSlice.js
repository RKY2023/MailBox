import { createAction, createSlice } from "@reduxjs/toolkit";
import { EditorState, convertToRaw } from 'draft-js';

const MailEditorState = {
    editorState: EditorState.createEmpty(),
}

const MailEditorSlice = createSlice({
    name: 'EditorSlice',
    initialState: MailEditorState,
    reducers: {
        
    }
})