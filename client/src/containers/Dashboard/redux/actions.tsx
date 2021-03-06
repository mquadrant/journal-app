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
    return { type: types.GET_SINGLE_JOURNAL, payload};
  }
  
  export function getSinglePending(){
    return { type: types.GET_SINGLE_JOURNAL_PENDING};
  }
  
  export function getSingleError(error:any) {
    return { type: types.GET_SINGLE_JOURNAL_ERROR, error };
  }

export const getSingleJournals = (id:any) => {
  return (dispatch:any) => { 
    dispatch(getSinglePending());
    return (
      axios
        .get(`/journals/${id}`)
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

export function getUpdateJournalAction(payload:any) {
    return { type: types.UPDATE_JOURNAL, payload};
  }
  
  export function updatePending(){
    return { type: types.UPDATE_JOURNAL_PENDING};
  }
  
  export function updateError(error:any) {
    return { type: types.UPDATE_JOURNAL_ERROR, error };
  }

export const updateJournal = (payload:any,id:any) => {
  return (dispatch:any) => { 
    dispatch(updatePending());
    return (
      axios
        .put(`/journals/${id}`,{
            title:payload.title,
            body:payload.body
        })
        .then(res => {
            dispatch(getUpdateJournalAction(res.data.data))
          return res.data.data;
        })
        .catch((error:any) => {
          dispatch(updateError(error));
          throw error;
        })
    );
  };
};

//DELETE JOURNAL
export function deleteJournalAction(id:any) {
    return { type: types.DELETE_JOURNAL,id};
  }
  
  export function deletePending(){
    return { type: types.DELETE_JOURNAL_PENDING};
  }
  
  export function deleteError(error:any) {
    return { type: types.DELETE_JOURNAL_ERROR, error };
  }

export const deleteJournal = (id:any) => {
  return (dispatch:any) => { 
    dispatch(deletePending());
    return (
      axios
        .delete(`/journals/${id}`)
        .then(res => {
            dispatch(deleteJournalAction(id))
          return ;
        })
        .catch((error:any) => {
          dispatch(deleteError(error));
          throw error;
        })
    );
  };
};