import React, { useEffect, useContext } from 'react'
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export const HomeScreen = () => {

    const navigator: any = useNavigation();
    const { user, logout } = useContext( AuthContext )

    useEffect(() =>
        navigator.addListener('beforeRemove', (e: any) => {
        e.preventDefault();
        if (true) return
    }),[]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>HomeScreen</Text>
                    <Button 
                        title='Cerrar sesión'
                        onPress={ logout }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
