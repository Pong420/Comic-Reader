import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epics';
import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(epicMiddleware));

const store = createStore(rootReducer, undefined, enhancer);

epicMiddleware.run(rootEpic);

export default store;

export * from './actions';
export * from './reducers';
export * from './epics';
