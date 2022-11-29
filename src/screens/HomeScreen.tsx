import React, { useEffect, useContext } from 'react'
import { Button, StyleSheet, Text, View, Platform, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { COLOR, FONT_SIZES } from '../theme/index';
import Icon from 'react-native-vector-icons/Ionicons';

export const HomeScreen = () => {

    const navigator: any = useNavigation();
    const { user } = useContext( AuthContext );

    useEffect(() =>
        navigator.addListener('beforeRemove', (e: any) => {
        e.preventDefault();
        if (true) return
    }),[]);

    return (
        <SafeAreaView style={{ ...styles.main }}>
            <StatusBar backgroundColor={COLOR.GRAY_LIGHT} />
            <ScrollView>
                <View style={{ ...styles.container }}>
                    <Text style={{ ...styles.greeting, textAlign: 'center' }}>Hola, { user?.fullName.split(' ')[0] }</Text>
                </View>
                <View 
                    style={{ ...styles.amountContainer, }}
                >
                    {/* <Image
                        source={require('../images/dale!.png')}
                        style={{width: 50, height: 20, marginHorizontal: 20}}
                    /> */}
                    <View style={{ ...styles.containerIcon }}>
                        <Icon name="wallet-outline" style={{ ...styles.iconMoney }} />
                    </View>
                    <View>
                        { /* //TODO: SI NO HAY CUENTA PONER UN BOTON PARA CREARLA AQUI */ }
                        <Text style={{ ...styles.amount }}>$ 49.464.684</Text>
                        <Text style={{ ...styles.textBalance }}>Balance</Text>
                    </View>
                </View>
                <View style={{ ...styles.container }}>
                    <Text style={{ ...styles.titleMyMovements }}>Mis movimientos</Text>
                    <View style={{ ...styles.containerMyMovements }}>

                        { /* //TODO: Renderizar los movimientos */ }
                        <View style={{ ...styles.noContentContainer }}>
                            <Icon name="file-tray-full-outline" style={{ ...styles.iconNoContent }} />
                            <Text style={{ ...styles.textNoContent }}>No has realizado ningún movimiento</Text>
                        </View>

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: COLOR.GRAY_LIGHT, 
    },

    container: {
        margin: 15,
    },

    greeting: {
        fontSize: Platform.OS === 'ios' ? FONT_SIZES.TEXT_IOS : FONT_SIZES.TEXT_ANDROID, 
        textAlign: 'center', 
        fontWeight: "400", 
        color: COLOR.BLACK,
    },

    amountContainer: {
        height: Platform.OS === 'ios' ? 100 : 110,
        backgroundColor: COLOR.WHITE,
        marginHorizontal: 15,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },

    containerIcon: {
        // borderColor: COLOR.BLUE,
        // borderWidth: 3,
        backgroundColor: COLOR.GRAY_LIGHT,
        borderRadius: 100,
        padding: 10,
        marginHorizontal: 15
    },

    iconMoney: {
        fontSize: 20,
        color: COLOR.BLUE
    },

    amount: {
        fontSize: Platform.OS === 'ios' ? 27 : 30, 
        textAlign: 'center', 
        fontWeight: "600", 
        color: COLOR.BLACK,
    },

    textBalance: {
        fontSize: Platform.OS === 'ios' ? FONT_SIZES.TEXT_IOS : FONT_SIZES.TEXT_ANDROID, 
        textAlign: 'left', 
        fontWeight: "400", 
        color: COLOR.GRAY_DARK_TWO,
        paddingTop: 0,
    },

    titleMyMovements: {
        marginTop: 15,
        fontSize: Platform.OS === 'ios' ? 15 : 18, 
        textAlign: 'left', 
        fontWeight: "600", 
        color: COLOR.GRAY_DARK_TWO,
    },

    containerMyMovements: {
        height: 500,
        padding: 15,
        marginTop: 10,
        backgroundColor: COLOR.WHITE,
        borderRadius: 6,
    },

    noContentContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 180
    },

    iconNoContent: {
        color: COLOR.GRAY_DARK,
        fontSize: 30
    },

    textNoContent: {
        marginTop: 5,
        fontSize: Platform.OS === 'ios' ? FONT_SIZES.TEXT_IOS : FONT_SIZES.TEXT_ANDROID, 
        textAlign: 'center', 
        fontWeight: "400", 
        color: COLOR.GRAY_DARK_TWO,
    },

});