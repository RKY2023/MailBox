import { AuthActions } from "./AuthSlice";
import { uiActions } from "./UISlice";

export const AuthFirebaseLogin = (userData) => {
    return async (dispatch) => {
        if(userData.loginType === 'signUp'){
            dispatch(uiActions.showAlert('Creating Account...'));
        } else {
            dispatch(uiActions.showAlert('Loggin...'));
        }
        const signUpRequest = async () => {
            const urls = {
                login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8_J6A_7bsjzl4Zy3OkODi-GMz9MftKyY',
                signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8_J6A_7bsjzl4Zy3OkODi-GMz9MftKyY',
            }
            let url =urls.login;
            if(userData.loginType === 'signUp')
                url =urls.signUp;
            let payload = {
                email: userData.email,
                password: userData.password,
                returnSecureToken: true,
            }
            try{
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type' : 'application/json',
                    }
                });
                const data = await response.json();
                console.log(data);
                if( data && data.error && data.error.message){
                    dispatch(uiActions.showAlert(data.error.message));
                    throw new Error(data.error.message);
                }
                if( data && data.idToken){
                    dispatch(AuthActions.login({ email: payload.email, token: data.idToken}));
                    dispatch(AuthActions.storeUserData(data));
                } else {
                    console.log(data);
                }
                if(userData.loginType === 'signUp'){
                    dispatch(uiActions.showAlert('Signup Successful'));
                } else {
                    dispatch(uiActions.showAlert('Login Successful'));
                }
                
            } catch (err) {
                console.log(err);
                // if(userData.loginType === 'signUp'){
                //     dispatch(uiActions.showAlert('Signup Failed!'));
                // } else {
                //     dispatch(uiActions.showAlert('Login Failed!'));
                // }
            }
        };
        signUpRequest();
    ;}
};

export const lookupUser = (tokenId) => {
    return async (dispatch) => {
        // dispatch(uiActions.showAlert('Fetching user data ...'));
        const getUserData = async () => {
            
            try{
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB8_J6A_7bsjzl4Zy3OkODi-GMz9MftKyY', {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: tokenId
                    }),
                    headers: {
                        'Content-Type' : 'application/json',
                    }
                });
                const data = await response.json();
                console.log(data);
                if( data && data.users && data.users[0]){
                    dispatch(AuthActions.storeUserData(data.users[0]));
                    // dispatch(uiActions.showAlert('User data fetched'));
                } else  if( data && data.error && data.error.message === "INVALID_ID_TOKEN"){
                    dispatch(AuthActions.logout());
                } else {
                    console.log(data);
                }
            } catch (err) {
                console.log(err);
                // dispatch(uiActions.showAlert('Fetching user data failed ...'));
            }
        };
        getUserData();
    ;}
};
