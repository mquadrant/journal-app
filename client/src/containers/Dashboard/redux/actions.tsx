import axios from '../../../utils/API';
import * as types from './types';

interface IJournal {
    title:string;
    body:string
}


export function postJournalAction(payload:any) {
  return { type: types.SET_POST_JOURNAL, payload};
}

export function postPending(){
  return { type: types.POST_JOURNAL_PENDING};
}

export function postError(error:any) {
  return { type: types.POST_JOURNAL_ERROR, error };
}

export const postJournal = (payload:IJournal) => {
  return (dispatch:any) => { 
    dispatch(postPending());
    return (
      axios
        .post('/journals', {title:payload.title,
        body:payload.body})
        .then(res => {
          return res;
        })
        .catch((error:any) => {
          dispatch(postError(error));
          throw error;
        })
    );
  };
};


export function getAllJournalAction(payload:any) {
    return { type: types.GET_ALL_JOURNAL, payload};
  }
  
  export function getAllPending(){
    return { type: types.GET_ALL_JOURNAL_PENDING};
  }
  
  export function getAllError(error:any) {
    return { type: types.GET_ALL_JOURNAL_ERROR, error };
  }

export const getAllJournals = () => {
  return (dispatch:any) => { 
    dispatch(getAllPending());
    return (
      axios
        .get('/journals')
        .then(res => {
            dispatch(getAllJournalAction(res.data.data))
          return res.data.data;
        })
        .catch((error:any) => {
          dispatch(getAllError(error));
          throw error;
        })
    );
  };
};

export function getSingleJournalAction(payload:any) {
    return { type: types.GET_ALL_JOURNAL, payload};
  }
  
  export function getSinglePending(){
    return { type: types.GET_ALL_JOURNAL_PENDING};
  }
  
  export function getSingleError(error:any) {
    return { type: types.GET_ALL_JOURNAL_ERROR, error };
  }

export const getSingleJournals = () => {
  return (dispatch:any) => { 
    dispatch(getSinglePending());
    return (
      axios
        .get('/journals')
        .then(res => {
            dispatch(getSingleJournalAction(res.data.data))
          return res.data.data;
        })
        .catch((error:any) => {
          dispatch(getSingleError(error));
          throw error;
        })
    );
  };
};