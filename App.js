import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './src/screens/Index';
import Reports from './src/screens/Reports';
import Trend from './src/screens/Trend';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="Reports" component={Reports} options={{ title: 'Reports' }} />
        <Stack.Screen name="Trend" component={Trend} options={{ title: 'Trend' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;