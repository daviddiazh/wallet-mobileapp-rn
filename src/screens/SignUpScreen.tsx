import React, { Fragment } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR, FONT_SIZES, PADDING_BUTTONS } from '../theme/index';

export const SignUpScreen = () => {

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
                            source={require('../images/dale!.png')}
                            style={[ styles.logo ]}
                        />
                    </View>

                    <View style={[ styles.containerForm ]}>
                        <View style={ styles.textInputBackground }>
                            <TextInput 
                                placeholder="Nombre completo"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                textContentType="name"
                                placeholderTextColor={ COLOR.GRAY_DARK }
                            />
                        </View>

                        <View style={ styles.textInputBackground }>
                            <TextInput 
                                placeholder="Número de celular"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                textContentType="telephoneNumber"
                                secureTextEntry={true}
                                placeholderTextColor={ COLOR.GRAY_DARK }                                
                            />
                        </View>

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
                            activeOpacity={0.9}
                            style={[ styles.btnLogin ]}
                        >
                            <Text style={[ styles.textBtn ]}>Registrarme</Text>
                        </TouchableOpacity>

                        <Text style={{ textAlign: 'center', paddingVertical: 50 }}>Ó si ya tienes una cuenta,</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[ styles.btnSignUp]}
                        onPress={() => navigator.navigate("LoginScreen")}
                    >
                        <Text style={[ styles.textBtn ]}>Iniciar sesión</Text>
                        <Icon 
                            name="arrow-forward-outline" 
                            size={25} 
                            color={COLOR.WHITE}
                            style={{ marginLeft: 10 }}
                        />
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
        width: 190,
        height: 90,
        // borderRadius: 100,
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
        backgroundColor: COLOR.BLUE_DARK,
        paddingVertical: 15,
        borderRadius: 6,
        marginTop: 8
    },

    textBtn: {
        color: COLOR.WHITE,
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : FONT_SIZES.TEXT_IOS,
        textAlign: 'center',
        fontWeight: "500",
    },

    btnSignUp: {
        backgroundColor: COLOR.BLUE_DARK,
        paddingVertical: 16,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30
    }

});