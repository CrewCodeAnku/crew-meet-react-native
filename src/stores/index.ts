import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
//import {Platform} from 'react-native';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middle =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(sagaMiddleware))
      : compose(applyMiddleware(sagaMiddleware));

  const store = createStore(rootReducer(), middle);
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return {persistor, store};
}
