import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}
const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
}
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
const logoutAfter = expirationTime => {
  return dispatch => {
    setTimeout(() => dispatch(logout()), expirationTime * 1000)
  }
}
export const tryAuth = (email, password, mode) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = '';
    let apiKey = 'AIzaSyBxhOWN0x3id0tV-O7teCPjiE_DB28pj_k';
    if (mode === 'signUp') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
    } else if (mode === 'signIn') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('localId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(logoutAfter(response.data.expiresIn))
      }).catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  }
}
export const tryAuthReconnnect = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const localId = localStorage.getItem('localId');
        dispatch(authSuccess(token, localId));
        dispatch(logoutAfter((expirationDate.getTime() - new Date().getTime())/1000))
      }
    }
  }
}