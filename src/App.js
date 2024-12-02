import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import MailBox from './components/MailBox/MailBox';
import { useDispatch, useSelector } from 'react-redux';
import ComposeMail from './components/MailBox/Compose/ComposeMail';
import DefaultPage from './components/DefaultPage/DefaultPage';
import { useEffect } from 'react';
import { AuthActions } from './store/AuthSlice';
import { lookupUser } from './store/AuthCreator';
import OpenMail from './components/MailBox/OpenMail/OpenMail';
import SessionExpired from './components/DefaultPage/SessionExpired';
import Header from './components/UI/Header';

const App = (props) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const tokenId = useSelector(state => state.auth.token);
  const uiAlert = useSelector(state => state.ui.alert);
  console.log('App Component');
  const runnup = () => {
    console.log('runnup');
  }
    
  useEffect(() => {
    console.log('EFFECT UP');
    dispatch(AuthActions.checkIsLoggedIn());
    if(isAuthenticated){
      dispatch(lookupUser(tokenId));
    }
    console.log('EFFECT DOWN');
  },[isAuthenticated]);

  return (
    <>  
      <Header />
      { uiAlert !== '' && 
        <div className="alert-class fs-4 bg-secondary text-white text-center">{uiAlert}</div>
      }
      { !isAuthenticated && 
      <Switch>
        <Route path='/' index exact>
          <Auth />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Route path='/sessionExpired'>
          <SessionExpired />
        </Route>
        <Route path='*'>
          <DefaultPage />
        </Route>
        
      </Switch>
      }
      { isAuthenticated && 
      <Switch>
        <Route path='/' index exact>
          <Auth />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='/mail'>
          <MailBox />
        </Route>
        <Route path='/composeMail'>
          <ComposeMail />
        </Route>
        <Route path='/mail:threadId'>
          <OpenMail />
        </Route>
        <Route path='*'>
          <DefaultPage />
        </Route>
      </Switch>
      }
        
    </>
  );
}

export default App;
