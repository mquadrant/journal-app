import { combineReducers } from 'redux';
import login from '../containers/Login/redux/reducer';
import signup from '../containers/Signup/redux/reducer';
import journals from '../containers/Dashboard/redux/reducer';

const rootReducer = combineReducers({
  login,
  signup,
  journals
});

export default rootReducer;
