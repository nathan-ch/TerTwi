import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import NavNav from './Components/NavNav';
import Login from './pages/Login';
import { Provider } from 'react-redux'
import store from './_Redux/store'
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import './App.css';

function App() {

  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
  const dispatch = useDispatch()

  return (
    <Provider store={store}>
    <Router>
      <NavNav />
      <Switch>
          <Route path='/connexion'>
            {isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path='/inscription'>
          {isAuthenticated ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path='/profil'>
            <Profile />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
