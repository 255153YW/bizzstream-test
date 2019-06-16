import { createStore } from 'redux';
import { combineReducers } from 'redux'

import layoutReducer from 'reducers/layoutReducer';
import documentReducer from 'reducers/documentReducer';

const combinedReducers = combineReducers({layoutReducer,documentReducer});

let LayoutStore = createStore(combinedReducers);

export default LayoutStore;