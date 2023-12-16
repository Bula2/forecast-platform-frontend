import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';

const rootReducer = combineReducers({});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleWare))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
