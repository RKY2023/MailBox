import { MailActions } from "./MailSlice";
import { uiActions } from "./UISlice";

export const sendMail = (mailData) => {
    return async (dispatch) => {
        // mail set to sent box of sender
        dispatch(uiActions.showAlert('sending Mail...'));
        let mailfrom = mailData.from;
        mailfrom = mailfrom.replace(/[@.]/gi,'_');
        let mailto = mailData.to;
        mailto = mailto.replace(/[@.]/gi,'_');
        try{
            const response = await fetch('https://atomic-matrix-193707-default-rtdb.firebaseio.com/Mailbox/'+mailfrom+'/sent.json',{
                method: 'POST',
                body: JSON.stringify(mailData),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            dispatch(uiActions.showAlert('Mail sent.'));
        } catch (err) {
            console.log(err);
            dispatch(uiActions.showAlert('sending mail failed.'));
        }
        // mail set to inbox box of receiver
        try{
            const response = await fetch('https://atomic-matrix-193707-default-rtdb.firebaseio.com/Mailbox/'+mailto+'/inbox.json',{
                method: 'POST',
                body: JSON.stringify(mailData),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
};
export const retrieveMails = (user,type='inbox') => {
    return async (dispatch) => {
        // mail set to sent box of sender
        dispatch(uiActions.showAlert('Loading Inbox...'));
        try{
            if(user === ''){
                throw new Error('User not defined');
            }
            const response = await fetch('https://atomic-matrix-193707-default-rtdb.firebaseio.com/Mailbox/'+user+'/'+type+'.json');
            const data = await response.json();
            console.log(data);
            const loadedData = [];
            if(data)
            for( const k in data){
                loadedData.push({
                    id: k,
                    to: data[k].to,
                    from: data[k].from,
                    subject: data[k].subject,
                    body: data[k].body,
                    bodyHtml: data[k].bodyHtml,
                    unread: data[k].unread,
                });
            };
            dispatch(MailActions.sendContent(loadedData));
        } catch (err) {
            console.log(err);
            dispatch(uiActions.showAlert('Inbox loading failed.'));
        }
    };
};
export const setFalseUnreadMail = (user,threadId) => {
    return async (dispatch) => {
        try{
            if(user === ''){
                throw new Error('User not defined');
            }
            if(threadId === ''){
                throw new Error('thread not defined');
            }
            const response = await fetch('https://atomic-matrix-193707-default-rtdb.firebaseio.com/Mailbox/'+user+'/inbox/'+threadId+'/unread.json',{
                method: 'PUT',
                body: 'false',
                headers: {
                    'Content-Type' : 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            // if(data)
            dispatch(MailActions.setReadMail());
        } catch (err) {
            console.log(err);
        }
    };
};

export const deleteMail = (user,threadId,mailBoxtype) => {
    return async (dispatch) => {
        dispatch(uiActions.showAlert('Deleting mail...'));
        try{
            if(user === ''){
                throw new Error('User not defined');
            }
            if(threadId === ''){
                throw new Error('thread not defined');
            }
            const response = await fetch('https://atomic-matrix-193707-default-rtdb.firebaseio.com/Mailbox/'+user+'/'+mailBoxtype+'/'+threadId+'.json',{
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
            if(response.ok)
            dispatch(MailActions.deleteMail(threadId));
            dispatch(uiActions.showAlert('Mail deleted'));
        } catch (err) {
            console.log(err);
            dispatch(uiActions.showAlert('Failed to delete Mail'));
        }
    };
};