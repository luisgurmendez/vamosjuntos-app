import { combineReducers } from 'redux';
import { reducer as camera } from './camera/reducer';
import { reducer as user } from './user/reducer';
import { reducer as ride } from './ride/reducer';
import { reducer as notification } from './notification/reducer';

const rootReducer = combineReducers({
  camera,
  user,
  ride,
  notification
});

export default rootReducer;
