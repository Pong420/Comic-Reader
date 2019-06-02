import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import rootEpic from './epics';
import rootReducers from './reducers';

const epic$ = new BehaviorSubject(rootEpic);
const hotReloadingEpic: Epic<any> = (actions$, state$, dependencies) =>
  epic$.pipe(switchMap(epic => epic(actions$, state$, dependencies)));

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(epicMiddleware));

const store = createStore(rootReducers, undefined, enhancer);

epicMiddleware.run(hotReloadingEpic);

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducers = require('./reducers').default;
      store.replaceReducer(nextRootReducers);
    });

    module.hot.accept('./epics', () => {
      const nextRootEpic = require('./epics').default;
      epic$.next(nextRootEpic);
    });
  }
}

export default store;
export * from './actions';
export * from './reducers';
export * from './epics';
