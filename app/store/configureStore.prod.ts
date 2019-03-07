import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootEpic from './epics';
import createRootReducer from './reducers';

const history = createHashHistory();
const epicMiddleware = createEpicMiddleware();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(epicMiddleware, router);

function configureStore(initialState?: any) {
  const store = createStore(rootReducer, initialState, enhancer);

  epicMiddleware.run(rootEpic);

  return store;
}

export default { configureStore, history };
