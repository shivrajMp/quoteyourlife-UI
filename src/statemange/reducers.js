// src/app/reducers.js

import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './slice';
import registerReducer from './registerslice';
import loginReducer from './loginslice';

const rootReducer = combineReducers({
  api: apiReducer,
  // profile: profileReducer,
  register:registerReducer,
  login:loginReducer,
  // Add more reducers as needed
});

export default rootReducer;
