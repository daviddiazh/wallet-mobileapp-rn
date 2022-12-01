import React, { useContext, useEffect } from 'react';
import { StatusBar, Text, View, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLOR, FONT_SIZES, PADDING_BUTTONS } from '../theme/index';
import { useForm } from '../hooks/useForm';
import { MovementContext } from '../context/movements/MovementContext';
import { AccountContext } from '../context/account/AccountContext';
import { AuthContext } from '../context/auth/AuthContext';

export const CreditScreen = () => {

    const navigator: any = useNavigation();

    const { user } = useContext( AuthContext );
    const { account, findByUserEmail } = useContext( AccountContext );
    const { requestCredit } = useContext( MovementContext );

    const { amount, reason, onChange, resetFields } = useForm({
        amount: '',
        reason: ''
    });

    const openAlert = () => {

        Alert.alert(
            `Espera 
            `,
            '¿Estás seguro de que deseas continuar?',
            [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Continuar',
                    onPress: onRequestCredit
                }
            ]
        )
    }

    const onRequestCredit = () => {
        requestCredit(account?._id!, amount, reason);
        navigator.navigate('HomeScreen')
        // navigator.navigate('ApprovedCreditScreen')
        resetFields("amount");
        resetFields("reason");
    }

    useEffect(() => {
        findByUserEmail(user?.email!);
    }, [account.balance ]);

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLOR.GRAY_LIGHT} />
            <View style={{ ...styles.main }}>
                <Text style={{ ...styles.titleScreen }}>Solicitar Credito</Text>
                <View style={{ ...styles.mainContainer }}>
                    <View style={{ ...styles.containerForm }}>

                        {/* <View style={{ marginBottom: 50 }}>
                            <Text>Saldo actual:</Text>
                            <Text>{ account.balance }</Text>
                        </View> */}

                        <View style={ styles.textInputBackground }>
                            <TextInput
                                placeholder="Monto del credito"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                // textContentType=""
                                placeholderTextColor={ COLOR.GRAY_DARK }
                                autoCapitalize="none"

                                onSubmitEditing={ openAlert }

                                onChangeText={ (value) => onChange(value, 'amount') }
                                value={ amount }
                            />
                        </View>

                        <View style={ styles.textInputBackground }>
                            <TextInput
                                placeholder="Razón del credito"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                // textContentType=""
                                placeholderTextColor={ COLOR.GRAY_DARK }
                                autoCapitalize="none"

                                onChangeText={ (value) => onChange(value, 'reason') }
                                value={ reason }
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[ styles.btnRequestCredit ]}
                            onPress={ openAlert }
                        >
                            <Text style={[ styles.textBtn ]}>Solicitar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        margin: 15,
    },

    mainContainer: {
        height: '96%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },

    titleScreen: {
        fontSize: Platform.OS === 'android' ? 24 : 20,
        color: COLOR.BLACK,
        fontWeight: "600",
    },

    containerForm: {
        // backgroundColor: COLOR.WHITE,
        width: '100%',
        // height: 150
    },

    textInputBackground: {
        marginVertical: 8,
        // backgroundColor: COLOR.GRAY_LIGHT,
        backgroundColor: COLOR.WHITE,
        borderRadius: 6,
        paddingVertical: Platform.OS === 'android' ? PADDING_BUTTONS.SPACE_ANDROID : PADDING_BUTTONS.SPACE_IOS,
        fontSize: Platform.OS === 'android' ? FONT_SIZES.TEXT_ANDROID : FONT_SIZES.TEXT_IOS,
        paddingHorizontal: 20,
        // marginHorizontal: 15,
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

    btnRequestCredit: {
        // backgroundColor: COLOR.BLUE,
        backgroundColor: COLOR.BLUE_DALE,
        paddingVertical: 15,
        // borderRadius: 6,
        borderRadius: 100,
        marginTop: 8
    },

    textBtn: {
        color: COLOR.WHITE,
        fontSize: Platform.OS === 'android' ? 17 : 14,
        textAlign: 'center',
        fontWeight: "500",
    },
});