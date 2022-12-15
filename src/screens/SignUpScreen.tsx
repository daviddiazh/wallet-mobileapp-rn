import React, { Fragment } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR, FONT_SIZES, PADDING_BUTTONS } from '../theme/index';
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { signUp_thunk } from '../store/auth/thunks';

export const SignUpScreen = () => {

    const navigator: any = useNavigation();

    const dispatch: any = useDispatch();

    const { fullName, phone, email, password, onChange } = useForm({
        fullName: '',
        phone: '',
        email: '',
        password: '',
    });

    const onSignUp = () => {
        Keyboard.dismiss();
        const cleanFullName = fullName.trim();
        const cleanEmail = email.toLowerCase().trim();
        const cleanPassword = password.trim();

        if( email.length < 4 || password.length < 2 || password.length < 4 || phone.length < 7 ) return;

        dispatch( 
            signUp_thunk({ 
                fullName: cleanFullName,
                email: cleanEmail, 
                password: cleanPassword,
                phone 
            }) 
        );
    }

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

                                onChangeText={ (value) => onChange(value, 'fullName') }
                                value={ fullName }
                            />
                        </View>

                        <View style={ styles.textInputBackground }>
                            <TextInput 
                                placeholder="Número de celular"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                textContentType="telephoneNumber"
                                placeholderTextColor={ COLOR.GRAY_DARK }

                                onChangeText={ (value) => onChange(value, 'phone') }
                                value={ phone }
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

                                onChangeText={ (value) => onChange(value, 'email') }
                                value={ email }
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

                                onChangeText={ (value) => onChange(value, 'password') }
                                value={ password }
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[ styles.btnLogin ]}
                            onPress={ onSignUp }
                        >
                            <Text style={[ styles.textBtn ]}>Registrarme</Text>
                            <Icon 
                                name="arrow-forward-outline" 
                                size={25} 
                                color={COLOR.WHITE}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>

                        {/* <Text style={{ textAlign: 'center', paddingVertical: 50 }}>Ó si ya tienes una cuenta,</Text> */}

                        <View
                            style={{
                                ...styles.containerLogin
                            }}
                        >
                            <Text style={{
                                ...styles.textLogin
                            }}
                            >
                                ¿Ya estás registrado?
                            </Text>
                            <Text
                                style={{
                                    ...styles.textLoginRed
                                }}
                                onPress={() => navigator.navigate("LoginScreen")}
                                suppressHighlighting={true}
                            > 
                                Iniciar sesión en mi dale!
                            </Text>
                        </View>
                    </View>

                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}

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
        // backgroundColor: COLOR.BLUE_DALE,
        backgroundColor: COLOR.RED_DALE,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textBtn: {
        color: COLOR.WHITE,
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : FONT_SIZES.TEXT_IOS,
        textAlign: 'center',
        fontWeight: "500",
    },

    btnSignUp: {
        backgroundColor: COLOR.BLUE_DALE,
        paddingVertical: 16,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30
    },

    containerLogin: {
        paddingTop: 50,
    },

    textLogin: {
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : 13,
        color: COLOR.BLACK,
        fontWeight: "600",
        textAlign: 'center'
    },

    textLoginRed: {
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : 15,
        color: COLOR.RED_DALE,
        fontWeight: "600",
        paddingTop: 12,
        textAlign: 'center'
    },

});