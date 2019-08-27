import { SET_POST_JOURNAL, POST_JOURNAL_PENDING, POST_JOURNAL_ERROR,
    GET_ALL_JOURNAL_PENDING,GET_ALL_JOURNAL_ERROR,GET_ALL_JOURNAL,
    GET_SINGLE_JOURNAL,GET_SINGLE_JOURNAL_PENDING,GET_SINGLE_JOURNAL_ERROR,
    DELETE_JOURNAL,DELETE_JOURNAL_PENDING,DELETE_JOURNAL_ERROR
} from './types';

// set initial state 
const initialState = {
  error: null,
  pending: false,
  allJournals: [],
  allJournalPending:false,
  allJournalError:null,

  singleJournal:{},
  singleJournalError: null,
singleJournalPending:false,

deletePending:false,
deleteError:null

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
      //2
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
      //3
    case GET_SINGLE_JOURNAL:
      return {
        ...state,
        singleJournal : action.payload,
        singleJournalPending: false,
      };
    case GET_SINGLE_JOURNAL_PENDING:
      return {
        ...state,
        singleJournalPending: true,
      };
    case GET_SINGLE_JOURNAL_ERROR:
      return {
        ...state,
        singleJournalError: action.error,
        singleJournalPending:false
      };
      //4
    case DELETE_JOURNAL_PENDING:
      return {
        ...state,
        deletePending: true,
      };
    case DELETE_JOURNAL_ERROR:
      return {
        ...state,
        deleteError: action.error,
        deletePending:false
      };
    default:
      return state;
  }
};
