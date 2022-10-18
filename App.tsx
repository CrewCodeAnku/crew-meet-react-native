import RNBootSplash from 'react-native-bootsplash';
import {PersistGate} from 'redux-persist/integration/react';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/stores';
import StartScreenNavigation from './src/navigation/StartScreenNavigation';
import {connectWithSocketIOServer} from './src/utils/wss';
import {MenuProvider} from 'react-native-popup-menu';

export const {persistor, store} = configureStore();

const App = () => {
  useEffect(() => {
    connectWithSocketIOServer();
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <StartScreenNavigation />
          </MenuProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
