import { LOGIN_REQUEST } from './Type'
import { LOGIN_SUCCESS } from './Type'
import { LOGIN_FAILURE } from './Type'

import { LOGOUT_REQUEST } from './Type'
import { LOGOUT_SUCCESS } from './Type'

export const requestLogin = (creds) => {
  return {
    type: LOGIN_REQUEST,
    isFetching : true,
    isAuthenticated : false,
    creds
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

export const loginUser = (creds) => {
    let config = {
    method : 'POST',
    headers: { 'Content-Type':'application/json' },
    body: `username=${creds}&password=${creds}`
    }

    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds))
        return fetch('htthttps://api-minireseausocial.mathis-dyk.fr/auth/local', config)
        .then(response =>
          response.json()
        .then(user => ({ user, response }))
        )
        .then(({ user, response }) =>  {
          if (!response.ok) {
            // If there was a problem, we want to
            // dispatch the error condition
            dispatch(loginError(user.message))
            return Promise.reject(user)
          } else {
            // If login was successful, set the token in local storage
            localStorage.setItem('id_token', user.id_token)
            localStorage.setItem('id_token', user.access_token)
            // Dispatch the success action
            dispatch(receiveLogin(user))
          }
        }).catch(err => console.log("Error: ", err))
    }
}

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
  