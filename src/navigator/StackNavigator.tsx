import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../context/auth/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Loading } from '../components/Loading';
import { Tabs } from './Tabs';
import { CreditScreen } from '../screens/CreditScreen';
import { PaymentScreen } from '../screens/PaymentScreen';


export type RootStackParams = {
    LoginScreen: undefined, 
    SignUpScreen: undefined,
    WelcomeScreen: undefined,
    HomeScreen: undefined,
    Tabs: undefined,
    CreditScreen: undefined,
    PaymentScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

    const { userStatus } = useContext( AuthContext );

    if( userStatus === 'checking' ) return <Loading />

    return (
        <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            {
                ( userStatus === 'not-authenticated' ) 
                    ? (
                        <>
                            <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                            <Stack.Screen name="SignUpScreen" component={ SignUpScreen } />
                            <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } />
                        </>
                    ) 
                    : (
                        <Stack.Group>
                            <Stack.Screen name="Tabs" component={ Tabs } />
                            <Stack.Screen name="HomeScreen" component={ HomeScreen } />
                            <Stack.Screen name="CreditScreen" component={ CreditScreen } />
                            <Stack.Screen name="PaymentScreen" component={ PaymentScreen } />
                        </Stack.Group>
                    ) 
            }
        </Stack.Navigator>
    );
}
