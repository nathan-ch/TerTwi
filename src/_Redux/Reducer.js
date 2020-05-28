import { combineReducers } from 'redux'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, NEWPOST_FAILURE, NEWPOST_SUCCESS, NEWPOST_REQUEST
  } from './Type'

  const initialState={
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    userId : localStorage.getItem('id_user') ? localStorage.getItem('id_user') : false,
    userToken : localStorage.getItem('id_token') ? localStorage.getItem('id_token') : false,
    newPost : localStorage.getItem('newPost') ? localStorage.getItem('newPost') : false,


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
        userId : localStorage.getItem('id_user'),
        userToken : localStorage.getItem('id_token')
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
        newPost : localStorage.getItem('newPost'),
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
