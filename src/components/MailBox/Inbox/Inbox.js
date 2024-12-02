import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Table, Col, Container, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { MailActions } from "../../../store/MailSlice";
import { retrieveMails } from "../../../store/MailCreator";
import { deleteMail } from "../../../store/MailCreator";
import { AuthActions } from "../../../store/AuthSlice";
import useFetch from "../../../hooks/useFetch";

const Inbox = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log(history);
    const mailContent = useSelector(state => state.mail.content);
    const user = useSelector(state => state.auth.user);
    const [isMailRetreived, setIsMailRetreived] = useState(false);
    // const [data] = useFetch('https://atomic-matrix-193707-default-rtdb.firebaseio.com/Mailbox/'+user+'/inbox.json'); 
    console.log('Sent Component');

    const openMailHandler = (e) => {
        // console.log(e);
        const getThreadId = e.target.parentElement.getAttribute('data-key');
        if(getThreadId === null)
            return;
        dispatch(MailActions.setThreadId(getThreadId));
        history.replace('/mail/'+getThreadId);
    };

    const deleteMailHandler = (e) => {
        const getThreadId = e.target.parentElement.parentElement.getAttribute('data-key');
        dispatch(deleteMail(user,getThreadId,'inbox'));
    }

    const tableContent = mailContent.map((m) => (
        <tr key={m.id} onClick={openMailHandler} data-key={m.id}>
            <td>
                {m.unread === true && 
                <div className="text-primary">●</div>
                }
            </td>
           <td><b>{m.from}</b></td>
           <td><b>{m.subject}</b></td>
           <td>{m.body}</td>
           <td><Button className="btn-danger" onClick={deleteMailHandler}>Delete</Button></td>
        </tr>
    ));
    useEffect(() =>{
        console.log('user', user);
        if (!isMailRetreived && user !== ''){
            setIsMailRetreived(true);
            dispatch(retrieveMails(user));
        }
        const timer1 = setTimeout(()=>{
            dispatch(retrieveMails(user));
        }, 3000);
        const clrTImer = () => {
            clearTimeout(timer1);
        };
        clrTImer();
    },[isMailRetreived, dispatch, user]);
    return (

        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>unread</th>
                        <th>From</th>
                        <th>Subject</th>
                        <th>body</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </Table>
        </Container>
    );
};

export default Inbox;
