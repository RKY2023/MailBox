import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { MailActions } from "../../../store/MailSlice";
import { deleteMail, retrieveMails } from "../../../store/MailCreator";
import { AuthActions } from "../../../store/AuthSlice";

const Sent = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log(history);
    const mailContent = useSelector(state => state.mail.content);
    const [isMailRetreived, setIsMailRetreived] = useState(false);
    const user = useSelector(state => state.auth.user);
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
        dispatch(deleteMail(user,getThreadId,'sent'));
    }

    const tableContent = mailContent.map((m) => (
        <tr key={m.id} onClick={openMailHandler} data-key={m.id}>
           <td><b>{m.to}</b></td>
           <td><b>{m.subject}</b></td>
           <td>{m.body}</td>
           <td><Button className="btn-danger" onClick={deleteMailHandler}>Delete</Button></td>
        </tr>
    ));
    useEffect(()=>{
        console.log('user', user);
        if (!isMailRetreived && user !== ''){
            setIsMailRetreived(true);
            dispatch(retrieveMails(user,'sent'));
        }

        const timer1 = setTimeout(()=>{
            dispatch(retrieveMails(user,'sent'));
        }, 3000);
        const clrTImer = () => {
            clearTimeout(timer1);
        };
        clrTImer();
    },[isMailRetreived,dispatch,user]);
    return (

        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To</th>
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

export default Sent;
