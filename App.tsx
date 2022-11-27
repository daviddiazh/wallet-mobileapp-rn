import 'react-native-gesture-handler';

import React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {

  return (
    <NavigationContainer>        

      <SafeAreaView />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>

        <StackNavigator />
        
        <StatusBar backgroundColor="#faea07" />

      </SafeAreaView> 

      </NavigationContainer>
  );
}

export default App;