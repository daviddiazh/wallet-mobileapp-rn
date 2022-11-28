import React, { useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from '../context/auth/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';


export type RootStackParams = {
    LoginScreen: undefined, 
    SignUpScreen: undefined,
    WelcomeScreen: undefined,
    HomeScreen: undefined,
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

    const { userStatus } = useContext( AuthContext );

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
                        </>
                    ) 
                    : (
                        <>
                            <Stack.Screen name="HomeScreen" component={ HomeScreen } />
                            <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } />
                        </>
                    ) 
            }
        </Stack.Navigator>
    );
}
