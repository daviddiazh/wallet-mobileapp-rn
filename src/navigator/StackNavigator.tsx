import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from '../screens/HomeScreen';
import { SignUpScreen } from '../screens/SignUpScreen';


export type RootStackParams = {
    HomeScreen: undefined, 
    SignUpScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
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
            <Stack.Screen name="HomeScreen" component={ HomeScreen } />
            <Stack.Screen name="SignUpScreen" component={ SignUpScreen } />
        </Stack.Navigator>
    );
}
