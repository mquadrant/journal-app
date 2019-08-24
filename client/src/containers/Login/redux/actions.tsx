import axios from '../../../utils/API';
import * as types from './types';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

interface ILogin {
    email:string;
    password:string
}

// what should be returned upon successful request made
export function setCurrentUser(token:string) {
  return { type: types.SET_CURRENT_USER, token};
}

export function loginPending(isPending:boolean) {
  return { type: types.SET_PENDING, isPending };
}

export function loginError(error:any) {
  return { type: types.SET_ERROR, error };
}

export const login = (payload:ILogin) => {
  return (dispatch:any) => { 
    dispatch(loginPending(true));
    // get token from the local storage
    return (
      axios
        .post('/auth/login', payload)
        .then(res => {
          const token = res.data.token;
          // set token to local storage
          localStorage.setItem('journ-token', token);
          setAuthorizationToken(token);
          
          dispatch(setCurrentUser(token));
          // attach token to current user
          return res;
        })
        .catch((error:any) => {
          dispatch(loginError(error));
          return;
        })
    );
  };
};