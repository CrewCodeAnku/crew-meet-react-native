import {persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import {StateType} from 'typesafe-actions';
import app, {appState} from './app.reducer';
import session, {sessionState} from './session.reducer';
import meet, {meetState} from './meet.reducer';
//import encryptor from './encryptor';
import createCompressor from 'redux-persist-transform-compress';

const compressor = createCompressor();
const config = {
  blacklist: ['app', 'network', 'toast'],
  key: 'primary',
  storage,
  transforms: [compressor],
};

export interface rootState {
  app: appState;
  session: sessionState;
  meet: meetState;
}

const rootReducer = combineReducers({
  app: app,
  session: session,
  meet: meet,
});

export type RootState = StateType<typeof rootReducer>;

const reducers = () =>
  persistReducer(
    config,
    combineReducers<rootState>({
      app: app,
      session: session,
      meet: meet,
    }),
  );

export default reducers;
