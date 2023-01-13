import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import player from './player';

const rootReducer = combineReducers({ loginReducer, player });

export default rootReducer;
