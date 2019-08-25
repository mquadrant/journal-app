import { SET_CURRENT_USER, SET_PENDING, SET_ERROR} from './types';

// set initial state 
const initialState = {
  isAuthenticated: false,
  error: null,
  pending: false,
};

//reducer
export default (state = initialState, action:any = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: (action.token)?true:false,
        pending:false
      };
    case SET_PENDING:
      return {
        ...state,
        pending: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        pending:false
      };
    default:
      return state;
  }
};
