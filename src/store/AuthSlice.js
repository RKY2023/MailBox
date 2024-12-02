import { createSlice } from '@reduxjs/toolkit';

const AuthInitialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    userEmail: '',
    user: '',
    userDisplayName: '',
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: AuthInitialState,
    reducers: {
        checkIsLoggedIn(state) {
            if(state.token !== null && state.token !== 'undefined' && state.token.length > 500){
                state.isAuthenticated = true;
                localStorage.setItem('userData',JSON.stringify({userEmail: state.userEmail, displayName: state.userDisplayName}));
            }
        },
        login(state, actions) {
            const payload = actions.payload;
            state.token = payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', state.token);
            state.userEmail = payload.email;
            localStorage.setItem('userData',JSON.stringify({userEmail: state.userEmail, displayName: state.userDisplayName}));
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
        },
        storeUserData(state, actions){
            const payload = actions.payload;
            if(payload && payload.email){
                state.userEmail = payload.email;
                state.user = state.userEmail.replace(/[@.]/gi,'_');
            }
            if(payload && payload.displayName){
                state.userDisplayName = payload.displayName;
            }
            localStorage.setItem('userData',JSON.stringify({userEmail: state.userEmail, displayName: state.userDisplayName}));
        }
    }
})

export const AuthActions = AuthSlice.actions;
export default AuthSlice;