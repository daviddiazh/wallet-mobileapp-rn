import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {

    const navigator: any = useNavigation();

    useEffect(() =>
        navigator.addListener('beforeRemove', (e: any) => {
        e.preventDefault();
        if (true) return
    }),[]);

    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    );
}
