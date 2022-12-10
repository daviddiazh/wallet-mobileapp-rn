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

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './src/graphql/apolloClient';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { store } from './src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkToken_thunk } from './src/store/auth/thunks';


const ApplicationState = ({ children }: any) => {
  return (
    <ReduxProvider store={ store }>
      <ApolloProvider client={ apolloClient }>
        { children }
      </ApolloProvider>
    </ReduxProvider>
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