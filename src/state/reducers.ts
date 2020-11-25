import { combineReducers } from 'redux';
import { reducer as camera } from './camera/reducer';

const rootReducer = combineReducers({
  camera
});

export default rootReducer;
