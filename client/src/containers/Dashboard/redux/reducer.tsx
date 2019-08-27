import { SET_POST_JOURNAL, POST_JOURNAL_PENDING, POST_JOURNAL_ERROR,
    GET_ALL_JOURNAL_PENDING,GET_ALL_JOURNAL_ERROR,GET_ALL_JOURNAL
} from './types';

// set initial state 
const initialState = {
  error: null,
  pending: false,
  allJournals: [],
  allJournalPending:false,
  allJournalError:null,
};

//reducer
export default (state = initialState, action:any = {}) => {
  switch (action.type) {
    case POST_JOURNAL_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_JOURNAL_ERROR:
      return {
        ...state,
        error: action.error,
        pending:false
      };
    case GET_ALL_JOURNAL:
      return {
        ...state,
        allJournals : action.payload,
        allJournalPending: false,
      };
    case GET_ALL_JOURNAL_PENDING:
      return {
        ...state,
        allJournalPending: true,
      };
    case GET_ALL_JOURNAL_ERROR:
      return {
        ...state,
        allJournalError: action.error,
        allJournalPending:false
      };
    default:
      return state;
  }
};
