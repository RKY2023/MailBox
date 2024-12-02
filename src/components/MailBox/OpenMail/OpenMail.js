import React from "react";
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFalseUnreadMail } from "../../../store/MailCreator";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useState } from "react";
import { MailActions } from "../../../store/MailSlice";


const OpenMail = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const thread = useSelector(state => state.mail.threadId);
    const threadData = useSelector(state => state.mail.threadData);
    const [isMailRead, setIsMailRead] = useState(false);
    const user = useSelector(state => state.auth.user);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [bodyHtml, setBodyHtml] = useState('<p></p>');
    
    console.log(params);
    console.log(threadData);;
    const htlmtoraw = (html ="<p>Hey this <strong>editor</strong> rocks 😀</p>") => {
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
        }
    };
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }
    
    const threadContent = threadData.map( (th) => (
        <Card>
            <Card.Body>
                <Card.Title>{th.subject}</Card.Title>
                <Card.Subtitle>
                    <div>
                        To: {th.to}
                    </div>
                    <div>
                        From: {th.from}
                    </div>
                </Card.Subtitle>
                <Card.Text className="border mt-3">
                <Editor
                toolbarHidden
                editorState={editorState}
                toolbarClassName="demo-toolbar-absolute"
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                />                
                </Card.Text>
            </Card.Body>
        </Card>
    ));
        
    useEffect( () => {
        if(threadData && threadData[0] && threadData[0].bodyHtml){
            setBodyHtml(threadData[0].bodyHtml);
        }
        if(!isMailRead){
            setIsMailRead(true);
            dispatch(setFalseUnreadMail(user, thread));
        }
        dispatch(MailActions.setMailLabel('openMail'));
        htlmtoraw(bodyHtml);
    },[isMailRead, dispatch, user, thread, threadData]);
    return (
        <>
        <Container>
            {threadContent}
        </Container>
       
        </>
    );
};
export default OpenMail;