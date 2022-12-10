// import React, { useContext, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { checkToken_thunk, logout_thunk } from '../store/auth/thunks';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
// import { ApprovedCreditScreen } from '../screens/ApprovedCreditScreen';
// import { checkToken_thunk } from '../store/auth/thunks';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParams = {
    LoginScreen: undefined, 
    SignUpScreen: undefined,
    WelcomeScreen: undefined,
    HomeScreen: undefined,
    Tabs: undefined,
    CreditScreen: undefined,
    PaymentScreen: undefined,
    // ApprovedCreditScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

    // const { userStatus } = useContext( AuthContext );
    // const dispatch: any = useDispatch();
    
    const { status } = useSelector( (state: any) => state.auth );

    // const checkToken = async () => {
    //     const token: any = await AsyncStorage.getItem('token');

    //     dispatch( checkToken_thunk( token ) );
        // await AsyncStorage.removeItem('token');
    // }

    // useEffect(() => {
    //     checkToken();
    // }, []);

    if( status === 'checking' ) return <Loading />

    console.log({status})

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
                ( status === 'not-authenticated' ) 
                    ? (
                        <>
                            <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                            <Stack.Screen name="SignUpScreen" component={ SignUpScreen } />
                            {/* <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } /> */}
                        </>
                    ) 
                    : (
                        <Stack.Group>
                            <Stack.Screen name="Tabs" component={ Tabs } />
                            <Stack.Screen name="HomeScreen" component={ HomeScreen } />
                            <Stack.Screen name="CreditScreen" component={ CreditScreen } />
                            <Stack.Screen name="PaymentScreen" component={ PaymentScreen } />
                            {/* <Stack.Screen name="ApprovedCreditScreen" component={ ApprovedCreditScreen } /> */}
                        </Stack.Group>
                    ) 
            }


            {/* <Stack.Screen name="LoginScreen" component={ LoginScreen } />
            <Stack.Screen name="SignUpScreen" component={ SignUpScreen } /> */}
        </Stack.Navigator>
    );
}
