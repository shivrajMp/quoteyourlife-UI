// src/app/reducers.js

import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './slice';
import registerReducer from './registerslice';

const rootReducer = combineReducers({
  api: apiReducer,
  // profile: profileReducer,
  register:registerReducer
  // Add more reducers as needed
});

export default rootReducer;
