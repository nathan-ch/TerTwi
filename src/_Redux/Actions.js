import { LOGIN_REQUEST } from './Type'
import { LOGIN_SUCCESS } from './Type'
import { LOGIN_FAILURE } from './Type'

import { LOGOUT_REQUEST } from './Type'
import { LOGOUT_SUCCESS } from './Type'

import { REGISTER_REQUEST } from './Type'
import { REGISTER_SUCCESS } from './Type'
import { REGISTER_FAILURE } from './Type'

import { NEWPOST_REQUEST } from './Type'
import { NEWPOST_SUCCESS } from './Type'
import { NEWPOST_FAILURE } from './Type'
import Cookies from 'js-cookie';
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
            alert("email/usernam ou mot de passe incorrect")
            return Promise.reject(user)
          } else {
            console.log(user);
            Cookies.set('id_token', user.jwt)
            Cookies.set('id_user', user.user.id)

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
      isAuthenticated: true
    }
  }
  
  function receiveLogout() {
    return {
      type: LOGOUT_SUCCESS,
      isAuthenticated: false,
      userToken : false,
      userId : false
    }
  }
  
  // Logs the user out
  export function logoutUser() {
    return dispatch => {
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
              Cookies.set('id_token', user.jwt)
              dispatch(receiveRegister(user))
              console.log("User registered");
              dispatch(loginUser(username, password))
            }
          }).catch(err => console.log("Error: ", err))
      }
  }

  // Actions for new Post
  export const requestNewPost = (userId, content) => {
    return {
      type: NEWPOST_REQUEST,
      isFetching : true,
      isAuthenticated : true,
      userId,
      content,
    }
  }
  
  export const receiveNewPost = (user) => {
    return {
      type: NEWPOST_SUCCESS,
      isFetching : false,
      isAuthenticated : true,
      id_token : user.id_token
    }
  }
  
  export const newPostError = (message) => {
      return {
        type: NEWPOST_FAILURE,
        isFetching : false,
        isAuthenticated : false,
        message
      }
    }
  
  export const sendNewPost = (userId, content, userToken) => {
    
      const body = {
        user: userId,
        text : content
      }
  
      return dispatch => {
          dispatch(requestNewPost(content, userId, userToken))
          return fetch('https://api-minireseausocial.mathis-dyk.fr/posts',{
            method : 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`, 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            }
          )
          .then(response =>
            response.json()
          .then(post => ({ post, response }))
          )
          .then(({ post, response }) =>  {
            if (!response.ok) {
              dispatch(newPostError(post.message))
              return Promise.reject(post)
            } else {
              Cookies.set('newPost', post.text)
              dispatch(receiveNewPost(post))
              console.log("New post sended");
            }
          }).catch(err => console.log("Error: ", err))
      }
  }
  