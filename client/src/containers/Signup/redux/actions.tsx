import axios from '../../../utils/API';
import * as types from './types';

interface ISignup {
  firstname:string,
  lastname:string,
    email:string;
    password:string
}

export function setSignUp(credential:any) {
  return { type: types.SET_USER_CREDENTIAL, credential};
}

export function signupPending() {
  return { type: types.CREATE_USER_PENDING };
}

export function signupError(error:any) {
  return { type: types.CREATE_USER_ERROR, error };
}

export const signup = (payload:ISignup,history:any) => {
  return (dispatch:any) => {
    dispatch(signupPending());
    return (
      axios
        .post('/users/signup', payload)
        .then(res => {
          dispatch(setSignUp(res.data.data))
          dispatch(history.push('/login'));
          return res;
        })
        .catch((error:any) => {
          if(error.response){
            if(error.response.status === 409){
              dispatch(signupError('Email already exist!'));
            }else if(error.response.status=== 422){
              dispatch(signupError('Incorrect field(s)'));
            }else{
              dispatch(signupError('Something went wrong!'));
            }
        }
          return;
        })
    );
  };
};