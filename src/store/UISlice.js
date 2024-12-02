import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
    alert: '',
};

const UISlice = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers: {
        showAlert (state, action) {
            state.alert = action.payload;
        },
    }
});

export const uiActions = UISlice.actions;
export default UISlice;