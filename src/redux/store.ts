import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import userReducer from './userReducer';

const rootReducer = combineReducers({ userReducer });

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleWare))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
