import React, { Fragment, useEffect } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR, FONT_SIZES, PADDING_BUTTONS } from '../theme/index';
import { useForm } from '../hooks/useForm';
import { Alert } from 'react-native';
import { login_thunk } from '../store/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorReducer } from '../store/auth/authSlice';

export const LoginScreen = () => {

    const navigator: NavigationProp<any, any> = useNavigation();

    const dispatch: any = useDispatch();
    const { errorMessage, titleError } = useSelector( (state: any) => state.auth );

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    const onClearError = () => {
        dispatch( clearErrorReducer() )
    }

    useEffect(() => {
        if( errorMessage === undefined ) return;

        Alert.alert(
            `${ titleError }`, 
            `${ errorMessage }`,
            [
                {
                    text: 'Ok',
                    onPress: onClearError
                }
            ]
        )
    }, [ errorMessage ]);
    

    const onLogin = () => {
        Keyboard.dismiss();
        if( email.length < 4 || password.length < 2 ) return;
        
        dispatch( login_thunk({ email, password }) );
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
                                placeholder="Correo electrónico"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                textContentType="emailAddress"
                                placeholderTextColor={ COLOR.GRAY_DARK }
                                autoCapitalize="none"
                                autoComplete="off"

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

                                onSubmitEditing={ onLogin }

                                onChangeText={ (value) => onChange(value, 'password') }
                                value={ password }
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[ styles.btnLogin ]}
                            onPress={ onLogin }
                        >
                            <Text style={[ styles.textBtn ]}>Ingresar</Text>
                        </TouchableOpacity>

                        <Text style={{ textAlign: 'center', paddingVertical: 80 }}>Ó registrate, ¡es gratis!</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[ styles.btnSignUp]}
                        onPress={() => navigator.navigate("SignUpScreen")}
                    >
                        <Text style={[ styles.textBtn ]}>Crear una cuenta</Text>
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
        backgroundColor: COLOR.BLUE_DALE,
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
        backgroundColor: COLOR.BLUE_DALE,
        paddingVertical: 16,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30
    }

});