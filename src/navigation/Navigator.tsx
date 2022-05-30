import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MainScreen } from 'src/screens/MainScreen';

import { ROUTES } from './routes';

const Stack = createNativeStackNavigator();

export const Navigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name={ROUTES.Main} component={MainScreen} />
  </Stack.Navigator>
);
