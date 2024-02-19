// src/app/reducers.js

import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './slice';

const rootReducer = combineReducers({
  api: apiReducer,
  // Add more reducers as needed
});

export default rootReducer;
