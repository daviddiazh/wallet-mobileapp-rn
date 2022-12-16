import React, { useState } from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { logout_thunk, updatePicture_thunk } from '../store/auth/thunks';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../theme';

export const MenuScreen = () => {

    const navigator: any = useNavigation();

    const { user } = useSelector((state: any) => state.auth );
    const dispatch: any = useDispatch();

    const [ tempImage, setTempImage ] = useState<string>('')

    const takePictureFromGallery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        }, (resp: any) => {
            if( resp?.didCancel ) return;
            if( !resp?.assets[0]?.uri ) return;

            setTempImage( resp?.assets[0]?.uri );

            dispatch( updatePicture_thunk( user._id, resp ) );
        });
    }

    const logout = () => {
        dispatch( logout_thunk() );
    }

    return (
        <SafeAreaView>
            <View style={{ ...styles.mainMenu }}>
                <Text style={{ ...styles.titleMenu }}>Menú</Text>

                <TouchableOpacity
                    activeOpacity={ .7 }
                    onPress={ takePictureFromGallery }
                >
                    <View style={{ ...styles.containerPicture }}>
                        <Image 
                            source={{ uri: user.profilePicture }}
                            style={{ ...styles.avatar }}
                        />
                        <View style={{ ...styles.containerIconAvatar }}>
                            <Icon 
                                name="image-outline"
                                style={{ ...styles.iconAvatar }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.75}
                    style={{ ...styles.menuItem }}
                    onPress={ () => navigator.navigate("HomeScreen") }
                >
                    <Icon name='home-outline' style={{ ...styles.icon }} />
                    <Text style={{ ...styles.titleOpcMenu }}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.75}
                    style={{ ...styles.menuItem }}
                    onPress={ () => navigator.navigate("CreditScreen") }
                >
                    <Icon name='cash-outline' style={{ ...styles.icon }} />
                    <Text style={{ ...styles.titleOpcMenu }}>Solicitar Credito</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.75}
                    style={{ ...styles.menuItem }}
                    onPress={ () => navigator.navigate("PaymentScreen") }
                >
                    <Icon name='cash-outline' style={{ ...styles.icon }} />
                    <Text style={{ ...styles.titleOpcMenu }}>Transferir Dinero</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.75}
                    style={{ ...styles.menuItem }}
                >
                    <Icon name='wallet-outline' style={{ ...styles.icon }} />
                    <Text style={{ ...styles.titleOpcMenu }}>Mis cuentas de ahorro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.75}
                    style={{ ...styles.menuItem }}
                >
                    <Icon name='settings-outline' style={{ ...styles.icon }} />
                    <Text style={{ ...styles.titleOpcMenu }}>Ajustes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.75}
                    style={{ ...styles.menuItem }}
                    onPress={ logout }
                >
                    <Icon name='log-out-outline' style={{ ...styles.icon }} />
                    <Text style={{ ...styles.titleOpcMenu }}>Cerrar sesión</Text>
                </TouchableOpacity>

                <View style={{ alignItems: 'center', marginTop: Platform.OS === 'ios' ? 100 : 200 }}>
                    <Image 
                        source={require('../images/dale!.png')}
                        style={{width: 120, height: 50,}}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainMenu: {
        margin: 15,
    },

    titleMenu: {
        fontSize: Platform.OS === 'android' ? 24 : 20,
        color: COLOR.BLACK,
        fontWeight: "600",
    },

    containerPicture: {
        alignItems: 'center',
    },

    avatar: {
        width: 100, 
        height: 100, 
        borderRadius: 100,
        marginVertical: 40
    },

    containerIconAvatar: {
        bottom: 75,
        right: -40,
        borderRadius: 100, 
        backgroundColor: COLOR.WHITE, 
    },

    iconAvatar: {
        padding: 7,
        fontSize: 18
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 13
    },

    icon: {
        fontSize: 17,
        marginRight: 10,
        color: COLOR.BLACK
    },

    titleOpcMenu: {
        fontSize: Platform.OS === 'android' ? 16 : 13,
        color: COLOR.BLACK,
        fontWeight: "600"
    },

});
