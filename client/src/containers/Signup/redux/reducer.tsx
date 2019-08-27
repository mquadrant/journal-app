import { SET_USER_CREDENTIAL, CREATE_USER_PENDING, CREATE_USER_ERROR} from './types';

// set initial state 
const initialState = {
  credential:{},
  error: null,
  pending: false,
};

//reducer
export default (state = initialState, action:any = {}) => {
  switch (action.type) {
    case SET_USER_CREDENTIAL:
      return {
        ...state,
        credential : action.credential,
        error: null,
        pending:false
      };
    case CREATE_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        error: action.error,
        pending:false
      };
    default:
      return state;
  }
};
