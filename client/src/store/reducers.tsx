import { combineReducers } from 'redux';
import login from '../containers/Login/redux/reducer';

const rootReducer = combineReducers({
  login
});

export default rootReducer;
