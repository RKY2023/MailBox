import React, { useEffect, useState } from "react";
import { Table, Col, Container, Row, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link, Switch, Route, useHistory  } from 'react-router-dom';
import { retrieveMails } from "../../store/MailCreator";
// import MailBoxContent from "./MailBoxContent";
import OpenMail from "./OpenMail/OpenMail";
import { MailActions } from "../../store/MailSlice";
import Inbox from "./Inbox/Inbox";
import Sent from "./Sent/Sent";

const MailBox = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const totalUnreadMails = useSelector(state => state.mail.totalUnreadMails);
    const mailBoxtype = useSelector(state => state.mail.mailLabelselected);
  
    console.log('Mail Component');

    const sentBoxHandler = () =>{
        dispatch(MailActions.setMailLabel('sent'));
    };
    const inboxBoxHandler = () =>{
        dispatch(MailActions.setMailLabel('inbox'));
    };
    

    useEffect(()=>{
        if(mailBoxtype === 'sent'){
            history.replace('/mail/sent');
        } else if(mailBoxtype === 'openMail'){
            // history.replace('/mail/sent');
        } else if(mailBoxtype === 'inbox') {
            history.replace('/mail');
        }
       
    },[mailBoxtype]);

    return (
    <Row className="m-3">
        <Col className="col-3">
            <Row className="m-3">
            <a className="btn btn-primary" href="/composeMail" role="button">Compose</a>
            </Row>
            <Row>
                <Col>
                <ListGroup>
                    <ListGroup.Item onClick={inboxBoxHandler}>Inbox
                    {totalUnreadMails > 0 &&
                    <span className="p-1 rounded border text-white bg-secondary" style={{float: 'right'}}>{totalUnreadMails}</span>
                    }
                    </ListGroup.Item>
                    <ListGroup.Item onClick={sentBoxHandler}>Sent</ListGroup.Item>
                </ListGroup>
                </Col>
            </Row>
        </Col>
        <Col>
            <Switch>
                <Route path='/mail' index exact>
                    <Inbox />
                </Route>
                <Route path='/mail/sent'>
                    <Sent />
                </Route>
                <Route path='/mail/:threadId'>
                    <OpenMail />
                </Route>
                
            </Switch>
            
        </Col>
    </Row>
    );
};
export default MailBox;