import React, { Fragment } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { COLOR, FONT_SIZES, PADDING_BUTTONS } from '../theme/index';

export const HomeScreen = () => {

    const navigator: any = useNavigation();

    return (
        <Fragment>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View>
                    <View style={[ styles.containerLogo ]}>
                        <Image 
                            source={require('../images/logoMoney.jpeg')}
                            style={[ styles.logo ]}
                        />
                        <Text style={[ styles.poweredByText ]}>by. David Diaz H</Text>
                    </View>

                    <View style={[ styles.containerForm ]}>
                        <View style={ styles.textInputBackground }>
                            <TextInput 
                                placeholder="Correo electrónico"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                textContentType="emailAddress"
                                placeholderTextColor={ COLOR.GRAY_DARK }
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={ styles.textInputBackground }>
                            <TextInput 
                                placeholder="Contraseña"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                textContentType="password"
                                secureTextEntry={true}
                                placeholderTextColor={ COLOR.GRAY_DARK }
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[ styles.btnLogin ]}
                        >
                            <Text style={[ styles.textBtn ]}>Ingresar</Text>
                        </TouchableOpacity>

                        <Text style={{textAlign: 'center', paddingVertical: 70}}>Ó registrate, ¡es gratis!</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[ styles.btnSignUp]}
                    >
                        <Text style={[ styles.textBtn ]}>Crear una cuenta</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    containerLogo: {
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? 150 : 100,
    },

    logo: {
        width: 90,
        height: 90,
        borderRadius: 100,
    },

    poweredByText: {
        color: COLOR.GRAY_DARK,
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : FONT_SIZES.TEXT_IOS,
        paddingVertical: 10
    },

    containerForm: {
        marginTop: 50,
        marginBottom: 30,
        marginHorizontal: 20
    },

    textInputBackground: {
        marginVertical: 8,
        backgroundColor: COLOR.GRAY_LIGHT,
        borderRadius: 6,
        paddingVertical: Platform.OS === 'android' ? PADDING_BUTTONS.SPACE_ANDROID : PADDING_BUTTONS.SPACE_IOS,
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : FONT_SIZES.TEXT_IOS,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        elevation: 5,
    },

    textInput: {
        flex: 1,
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : FONT_SIZES.TEXT_IOS,
    },

    btnLogin: {
        // backgroundColor: COLOR.BLUE,
        backgroundColor: COLOR.BLACK,
        paddingVertical: 15,
        borderRadius: 6,
        marginTop: 8
    },

    textBtn: {
        color: COLOR.WHITE,
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : FONT_SIZES.TEXT_IOS,
        textAlign: 'center',
        fontWeight: "500"
    },

    btnSignUp: {
        backgroundColor: COLOR.BLACK,
        paddingVertical: 18,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'center'
        // marginTop: 8
    }

});