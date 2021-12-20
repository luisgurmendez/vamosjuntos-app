import { combineReducers } from 'redux';
import { reducer as camera } from './camera/reducer';
import { reducer as user } from './user/reducer';
import { reducer as ride } from './ride/reducer';
import { reducer as notification } from './notification/reducer';
import { reducer as general } from './general/reducer';
import { reducer as featureFlags } from './featureFlags/reducer';
import { reducer as storage } from './storage/reducer';

const rootReducer = combineReducers({
  camera,
  user,
  ride,
  notification,
  general,
  featureFlags,
  storage
});

export default rootReducer;
