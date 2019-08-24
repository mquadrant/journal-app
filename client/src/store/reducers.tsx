import { combineReducers } from 'redux';
import login from '../containers/Login/redux/reducer';
import signup from '../containers/Signup/redux/reducer';

const rootReducer = combineReducers({
  login,
  signup
});

export default rootReducer;
