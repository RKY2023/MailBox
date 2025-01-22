import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AuthFirebaseLogin } from "../../store/AuthCreator";
import { useHistory } from "react-router-dom";

const Auth = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const history = useHistory();
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const inputConfirmPassword = useRef();

    const [loginType, setLoginType] = useState('login');
    const [status, setStatus] = useState('');
    
    const switchLoginType = () =>{
        if(loginType === 'login'){
            setLoginType('signUp');
        }else{
            setLoginType('login');
        }
    };

    useEffect(() => {
        if(isAuthenticated){
            history.replace('/mail');
        }
    },[isAuthenticated, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        if( inputConfirmPassword.current.value === inputPasswordRef.current.value){
            const userData = {
                email: inputEmailRef.current.value,
                password: inputPasswordRef.current.value,
                loginType: loginType,
            }
            dispatch(AuthFirebaseLogin(userData));
        } else {
            setStatus('Please write the same password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login / Sign Up</h2>
                <div className="text-red-500 mb-4">{status}</div>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" placeholder="abc@abc.com" ref={inputEmailRef} className="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" placeholder="********" ref={inputPasswordRef} className="w-full px-3 py-2 border rounded"/>
                    </div>
                    { loginType !== 'login' &&
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input type="password" placeholder="********" ref={inputConfirmPassword} className="w-full px-3 py-2 border rounded"/>
                    </div>}
                    <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded mt-3">{(loginType === 'login') ? 'Login':'Sign Up'}</button>
                    <a href='/forgotPassword' className="block text-center text-blue-500 mt-3">Forgot Password?</a>
                    <hr className="my-6"/>
                    <button onClick={switchLoginType} className="w-full bg-gray-500 text-white py-2 rounded">{(loginType === 'login') ? 'Don\'t have an account? Sign Up':'Already have an account? Login'}</button>
                </form>
            </div>
        </div>
    );
};

export default Auth;