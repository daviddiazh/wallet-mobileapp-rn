import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/auth/AuthProvider';
import { COLOR } from './src/theme/index';
import SplashScreen from 'react-native-splash-screen';
import { AccountProvider } from './src/context/account/AccountProvider';
import { MovementsProvider } from './src/context/movements/MovementProvider';


const ApplicationState = ({ children }: any) => {
  return (
    <AuthProvider>
      <AccountProvider>
        <MovementsProvider>
          { children }
        </MovementsProvider>
      </AccountProvider>
    </AuthProvider>
  );
}


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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