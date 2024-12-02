import { createSlice } from "@reduxjs/toolkit";

const mailInitialState = {
    totalMails: 0,
    content: [],
    threadId: '',
    threadData: [],
    totalUnreadMails: 0,
    mailLabelselected: 'inbox',
}

const MailSlice = createSlice({
    name: 'mail',
    initialState: mailInitialState,
    reducers: {
        sendContent(state, action) {
            const payload = action.payload;
            state.content = payload;
            if(state.mailLabelselected === 'inbox'){
                state.totalUnreadMails = 0;
                for(const k in payload){
                    if(payload[k].unread === true){
                        state.totalUnreadMails++;
                    }
                }
            }
        },
        setThreadId(state, action) {
            state.threadId = action.payload; 
            state.threadData = state.content.filter((th) => th.id === state.threadId);
        },
        setReadMail(state) {
            const existingThreadData = state.content.filter((th) => th.id === state.threadId);
            if(existingThreadData[0].unread === true){
                existingThreadData[0].unread = false;
                state.totalUnreadMails--;
            }
            console.log(state.threadData);
        },
        setMailLabel(state, action) {
            if(action.payload === 'sent'){
                state.mailLabelselected = 'sent';
            } else if(action.payload === 'openMail'){
                state.mailLabelselected = 'openMail';
            } else {
                state.mailLabelselected = 'inbox';
            }
        },
        deleteMail(state, action) {
            const threadId = action.payload;
            state.content = state.content.filter((th) => th.id !== threadId);
        }
    }
});

export const MailActions = MailSlice.actions;
export default MailSlice;