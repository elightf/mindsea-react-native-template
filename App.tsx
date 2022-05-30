/**
 * MindSea React Native Template
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { Navigator } from 'src/navigation/Navigator';
import { store } from 'src/app/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
