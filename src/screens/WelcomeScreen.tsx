import React, { Fragment, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

export const WelcomeScreen = () => {

    const navigator: any = useNavigation();

    useEffect(() => {

        const timer = setTimeout(() => {
            navigator.navigate("HomeScreen");
        }, 5500)
        
        return () => {
            clearTimeout(timer);
        }
    }, []);
    
    return (
        <Fragment>
            <View style={[ styles.mainScreen ]}>
                <ConfettiCannon 
                    count={250}
                    origin={{
                        x: -15, 
                        y: 20
                    }}
                    autoStart={true}
                />
                <Text>Bienvenido(a), [nombre]</Text>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
//TODO: hacer del 100%