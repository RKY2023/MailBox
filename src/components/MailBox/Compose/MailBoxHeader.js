import React, { useRef } from "react";
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import EditorComponent from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import { sendMail } from "../../../store/MailCreator";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useState } from "react";
import { useEffect } from "react";

const MailBoxHeader = (props) => {
    const inputEmailsRef = useRef();
    const inputSubjectRef = useRef();
    const inputBodyRef = useRef();
    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.auth.userEmail);
    const [editorState, setEditorState] = useState();
    const [editorBody, setEditorBody] = useState('');
    const [editorBodyHtml, setEditorBodyHtml] = useState('<p></p>');
    const [clearEditor, setClearEditor] = useState(false);
    console.log(userEmail);

    const submitHandler = (e) => {
        e.preventDefault();
        const emailData = {
            from: userEmail,
            to: inputEmailsRef.current.value,
            subject: inputSubjectRef.current.value,
            body: editorBody,
            bodyHtml: editorBodyHtml,
            unread: true,
        }
        inputEmailsRef.current.value = '';
        inputSubjectRef.current.value = '';
        setEditorBody('');
        setEditorBodyHtml('<p></p>');
        setClearEditor(true);
        dispatch(sendMail(emailData));
    };

    const setEditorValue = (editorState) => {
        const tt = editorState.getCurrentContent().getPlainText();
        console.log(tt);
        setEditorState(editorState);
        setEditorBody(tt);
    };

    useEffect(() => {
        if(typeof editorState === 'undefined')
            return;
        const draftHTML = () =>{
            const currrentState = editorState.getCurrentContent();
            const raw = convertToRaw(currrentState);
            const html = draftToHtml(raw);
            setEditorBodyHtml(html);
            console.log(html);
        }
        draftHTML();
    },[editorState])

    return (
        <>
        <Container className="mt-5">
            {/* <div className="m-3 p-2 bold bg-secondary text-white text-center">Mail has been sent</div> */}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Row className="mb-3">
                        <Col className="col-1 text-center align-baseline">
                        <Form.Label className="mb-0">To:</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="email" ref={inputEmailsRef} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row className="mb-3">
                        <Col className="col-1 text-center align-baseline">
                        <Form.Label className="mb-0">Subject:</Form.Label>
                        </Col>
                        <Col>
                        <Form.Control type="text" ref={inputSubjectRef} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row className="mb-3">
                        <Col className="col-1 text-center align-baseline">
                        <Form.Label className="mb-0 text-center align-center">Body:</Form.Label>
                        </Col>
                        <Col className="">
                        <EditorComponent className="border" setEditorValue={setEditorValue} clearEditor={clearEditor}/>
                        </Col>
                    </Row>
                </Form.Group>
                <hr></hr>
                <div>
                    <div>
                        <Button type='submit'>Send</Button>
                    </div>
                    <div>
                    </div>
                </div>
            </Form>
        </Container>
        </>
    );
};
export default MailBoxHeader;