import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import rootEpic from './epics';
import createRootReducer from './reducers';

const epic$ = new BehaviorSubject(rootEpic);
const hotReloadingEpic: Epic = (...args) =>
  epic$.pipe(switchMap(epic => epic(...args)));

export const history = createHashHistory();

export default function configureStore() {
  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(epicMiddleware, routerMiddleware(history))
  );

  const store = createStore(createRootReducer(history), undefined, enhancer);

  epicMiddleware.run(hotReloadingEpic);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(createRootReducer(history));
      });

      module.hot.accept('./epics', () => {
        const nextRootEpic = require('./epics').default;
        epic$.next(nextRootEpic);
      });
    }
  }

  return store;
}

export * from './actions';
export * from './reducers';
export * from './epics';
export * from './selectors';
