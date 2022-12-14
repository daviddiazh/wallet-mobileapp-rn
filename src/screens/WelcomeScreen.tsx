import React, { Fragment, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { COLOR } from '../theme/index';
import { useSelector } from 'react-redux';

export const WelcomeScreen = () => {

    const navigator: any = useNavigation();

    const { user } = useSelector((state: any) => state.auth );

    useEffect(() => {

        const timer = setTimeout(() => {
            navigator.navigate("HomeScreen");
        }, Platform.OS === 'ios' ? 4500 : 4800)
        
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
                <Text
                    style={{ 
                        fontSize: Platform.OS === 'ios' ? 16 : 20,
                        color: COLOR.BLACK,
                        fontWeight: "600"
                     }}
                >
                    Bienvenido(a)
                </Text>
                <Text
                    style={{
                        fontSize: Platform.OS === 'ios' ? 20 : 23,
                        color: COLOR.BLUE_DARK,
                        fontWeight: "600",
                        paddingTop: 10,
                    }}
                >
                    { user?.fullName.split(' ')[0] }
                </Text>
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