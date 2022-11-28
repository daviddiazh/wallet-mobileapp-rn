import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/auth/AuthProvider';
import { COLOR } from './src/theme/index';


const ApplicationState = ({ children }: any) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  );
}


const App = () => {

  return (
    <ApplicationState>
      <NavigationContainer>        

        <SafeAreaView />
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.BLUE_DARK}}>

          <StackNavigator />
          
          <StatusBar backgroundColor={COLOR.BLUE_DARK} />

        </SafeAreaView> 

      </NavigationContainer>
    </ApplicationState>
  );
}

export default App;