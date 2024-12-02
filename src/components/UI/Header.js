import React from "react";
import { Navbar, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../store/AuthSlice";

const Header = (props) =>{
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const logoutHandler = () =>{
        dispatch(AuthActions.logout());
    };
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Mailbox</Navbar.Brand>
                {isAuthenticated && 
                <Button className='m-3 btn-danger' onClick={logoutHandler}>Logout</Button>
                }
            </Container>
        </Navbar>
    );
};
export default Header;