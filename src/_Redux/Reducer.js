import { combineReducers } from 'redux'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, NEWPOST_FAILURE, NEWPOST_SUCCESS, NEWPOST_REQUEST
  } from './Type';
import Cookies from 'js-cookie';

  const initialState={
    isFetching: false,
    isAuthenticated: Cookies.get('id_token') ? true : false,
    userId : Cookies.get('id_user') ? Cookies.get('id_user') : false,
    userToken : Cookies.get('id_token') ? Cookies.get('id_token') : false,
    newPost : Cookies.get('newPost') ? Cookies.get('newPost') : false,

  }

  function Reducer(state = initialState , action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        userId : Cookies.get('id_user'),
        userToken : Cookies.get('id_token')
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        userId : false,
        userToken : false,
        newPost: false
      })
      case NEWPOST_SUCCESS:
      return Object.assign({}, state, {
        newPost : Cookies.get('newPost'),
      })
      case NEWPOST_FAILURE:
      return Object.assign({}, state, {
      })
      case NEWPOST_REQUEST:
      return Object.assign({}, state, {
      })
    default:
      return state
  }
}

export default Reducer
