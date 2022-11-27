import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';


export type RootStackParams = {
    LoginScreen: undefined, 
    SignUpScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
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
            <Stack.Screen name="LoginScreen" component={ LoginScreen } />
            <Stack.Screen name="SignUpScreen" component={ SignUpScreen } />
        </Stack.Navigator>
    );
}
