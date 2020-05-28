import { LOGIN_REQUEST } from './Type'
import { LOGIN_SUCCESS } from './Type'
import { LOGIN_FAILURE } from './Type'

import { LOGOUT_REQUEST } from './Type'
import { LOGOUT_SUCCESS } from './Type'

import { REGISTER_REQUEST } from './Type'
import { REGISTER_SUCCESS } from './Type'
import { REGISTER_FAILURE } from './Type'


// Actions for Login
export const requestLogin = (identifier, password) => {
  return {
    type: LOGIN_REQUEST,
    isFetching : true,
    isAuthenticated : false,
    identifier,
    password
  }
}

export const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching : false,
    isAuthenticated : true,
    id_token : user.id_token
  }
}

export const loginError = (message) => {
    return {
      type: LOGIN_FAILURE,
      isFetching : false,
      isAuthenticated : false,
      message
    }
  }

export const loginUser = (identifier, password) => {
  
    const body = {
      identifier : identifier,
      password : password
    }

    return dispatch => {
        dispatch(requestLogin(identifier, password))
        console.log("ça fetch");
        return fetch('https://api-minireseausocial.mathis-dyk.fr/auth/local',{
          method : 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(body)
          }
        )
        .then(response =>
          response.json()
        .then(user => ({ user, response }))
        )
        .then(({ user, response }) =>  {
          if (!response.ok) {
            dispatch(loginError(user.message))
            return Promise.reject(user)
          } else {
            console.log(user);
            localStorage.setItem('id_token', user.id_token)
            localStorage.setItem('id_token', user.access_token)
            dispatch(receiveLogin(user))
            console.log("User connected");
          }
        }).catch(err => console.log("Error: ", err))
    }
}

// Actions for Logout
function requestLogout() {
    return {
      type: LOGOUT_REQUEST,
      isFetching: true,
      isAuthenticated: true
    }
  }
  
  function receiveLogout() {
    return {
      type: LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: false
    }
  }
  
  // Logs the user out
  export function logoutUser() {
    return dispatch => {
      dispatch(requestLogout())
      localStorage.removeItem('id_token')
      localStorage.removeItem('access_token')
      dispatch(receiveLogout())
    }
  }

  // Actions for Register
  export const requestRegister = (username, email, password) => {
    return {
      type: REGISTER_REQUEST,
      isFetching : true,
      isAuthenticated : false,
      username,
      email,
      password
    }
  }
  
  export const receiveRegister = (user) => {
    return {
      type: REGISTER_SUCCESS,
      isFetching : false,
      isAuthenticated : true,
      id_token : user.id_token
    }
  }
  
  export const registerError = (message) => {
      return {
        type: REGISTER_FAILURE,
        isFetching : false,
        isAuthenticated : false,
        message
      }
    }
  
  export const registerUser = (username, email, password) => {
    
      const body = {
        username : username,
        email: email,
        password : password
      }
  
      return dispatch => {
          dispatch(requestRegister(username, email, password))
          console.log(body);
          return fetch('https://api-minireseausocial.mathis-dyk.fr/auth/local/register',{
            method : 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(body)
            }
          )
          .then(response =>
            response.json()
          .then(user => ({ user, response }))
          )
          .then(({ user, response }) =>  {
            if (!response.ok) {
              dispatch(registerError(user.message))
              return Promise.reject(user)
            } else {
              console.log(user);
              localStorage.setItem('id_token', user.id_token)
              localStorage.setItem('id_token', user.access_token)
              dispatch(receiveRegister(user))
              console.log("User registered and connected");
            }
          }).catch(err => console.log("Error: ", err))
      }
  }
  