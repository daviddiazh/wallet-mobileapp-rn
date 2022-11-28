import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from 'react-native-splash-screen';
import { AuthContext } from '../context/auth/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Loading } from '../components/Loading';


export type RootStackParams = {
    LoginScreen: undefined, 
    SignUpScreen: undefined,
    WelcomeScreen: undefined,
    HomeScreen: undefined,
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

    const { userStatus } = useContext( AuthContext );

    if( userStatus === 'checking' ) return <Loading />

    useEffect(() => {
        SplashScreen.hide();
    }, []);

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
