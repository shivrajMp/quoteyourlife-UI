// src/app/reducers.js

import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './slice';
import registerReducer from './registerslice';
import loginReducer from './loginslice';
import postquoteReducer from './postquote'
import deleteReducer from './deleteslice';

const rootReducer = combineReducers({
  api: apiReducer,
  // profile: profileReducer,
  register:registerReducer,
  login:loginReducer,
  postquote:postquoteReducer,
  deletequote: deleteReducer
  // Add more reducers as needed
});

export default rootReducer;
