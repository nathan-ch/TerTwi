import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavNav from './Components/NavNav';
import Login from './pages/Login';
import { Provider } from 'react-redux'
import store from './_Redux/store'
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <NavNav />
      <Switch>
          <Route path='/connexion'>
            <Login />
          </Route>
          <Route path='/inscription'>
            <Register />
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
