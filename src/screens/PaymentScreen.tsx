import React, { useContext, useEffect } from 'react';
import { StatusBar, Text, View, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useForm } from '../hooks/useForm';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR, FONT_SIZES, PADDING_BUTTONS } from '../theme/index';
import { MovementContext } from '../context/movements/MovementContext';
import { AccountContext } from '../context/account/AccountContext';
import { AuthContext } from '../context/auth/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { moneyTransfer_thunk } from '../store/movement/thunks';

export const PaymentScreen = () => {

    const navigator: any = useNavigation();
    const dispatch: any = useDispatch();

    // const { user } = useContext( AuthContext );
    // const { account, findByUserEmail } = useContext( AccountContext );
    // const { moneyTransfer } = useContext( MovementContext );

    const { user } = useSelector((state: any) => state.auth );
    const { account } = useSelector((state: any) => state.account );

    let { accountId_Income, accountId_Outcome, amount, reason, onChange, resetFields } = useForm({
        accountId_Income: '',
        accountId_Outcome: '',
        amount: '',
        reason: '',
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
                    onPress: onMoneyTransfer
                }
            ]
        )
    }

    const onMoneyTransfer = () => {
        accountId_Outcome = account?._id!
        console.log('accountId_Outcome: ', accountId_Outcome)
        // moneyTransfer(accountId_Income, accountId_Outcome, reason, amount);
        dispatch( moneyTransfer_thunk({
            accountId_Income: account?._id,
            accountId_Outcome,
            amount,
            reason
        }) )
        navigator.navigate('HomeScreen')

        resetFields("accountId_Income");
        resetFields("amount");
        resetFields("reason");
    }

    // useEffect(() => {
    //     findByUserEmail(user?.email!);
    // }, [account.balance ]);

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLOR.GRAY_LIGHT} />
            <View style={{ ...styles.main }}>
                <Text style={{ ...styles.titleScreen }}>Transferir Dinero</Text>
                <View style={{ ...styles.mainContainer }}>
                    <View style={{ ...styles.containerForm }}>

                        <View style={{ ...styles.containerAccount }}>
                            <View style={{ ...styles.container_titleAccounts }}>
                                <Icon name="list-outline" style={{ ...styles.iconAccount }} />
                                <Text style={{ ...styles.titleAccount }}>Cuentas</Text>
                            </View>

                            <Text style={{ ...styles.containerAccount_title }}>Cuentas de Ahorro</Text>
                            <Text style={{ ...styles.containerAccount_subtitle }}>Ahorros</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ ...styles.containerAccount_accountId }}>{ account._id }</Text>
                                </View>
                                <View>
                                    <Text style={{ ...styles.containerAccount_titleBalance }}>Saldo disponible</Text>
                                    <Text style={{ ...styles.containerAccount_balance }}>{ account.balance }</Text>
                                </View>
                            </View>
                        </View>

                        <View style={ styles.textInputBackground }>
                            <TextInput
                                placeholder="Número de la cuenta"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                placeholderTextColor={ COLOR.GRAY_DARK }
                                autoCapitalize="none"

                                onChangeText={ (value) => onChange(value, 'accountId_Income') }
                                value={ accountId_Income }
                            />
                        </View>

                        <View style={ styles.textInputBackground }>
                            <TextInput
                                placeholder="Monto a transferir"
                                style={{ 
                                    ...styles.textInput,
                                }}
                                placeholderTextColor={ COLOR.GRAY_DARK }
                                autoCapitalize="none"

                                onSubmitEditing={ openAlert }

                                onChangeText={ (value) => onChange(value, 'amount') }
                                value={ amount }
                            />
                        </View>

                        <View style={ styles.textInputBackground }>
                            <TextInput
                                placeholder="Motivo de la transferencia"
                                style={{ 
                                    ...styles.textInput,
                                }}
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
                            <Text style={[ styles.textBtn ]}>Continuar</Text>
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
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleScreen: {
        fontSize: Platform.OS === 'android' ? 24 : 20,
        color: COLOR.BLACK,
        fontWeight: "600",
    },

    containerAccount: {
        backgroundColor: COLOR.WHITE,
        marginBottom: Platform.OS === 'ios' ? 60 : 70,
        borderRadius: 6,
        padding: 15,

        shadowColor: "#ccc",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.90,
        shadowRadius: 3.84,

        elevation: 5,
    },

    container_titleAccounts: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: COLOR.GRAY_LIGHT,
        borderBottomWidth: 1
    },

    iconAccount: {
        color: COLOR.BLACK,
        fontSize: Platform.OS === 'android' ? 20 : 16,
        marginRight: 10
    },

    titleAccount: {
        fontSize: Platform.OS === 'android' ? 19 : 16,
        color: COLOR.BLACK,
    },

    containerAccount_title: {
        fontSize: Platform.OS === 'android' ? 16 : 14,
        color: COLOR.BLACK,
        fontWeight: "600",
        paddingTop: 10
    },

    containerAccount_subtitle: {
        fontSize: Platform.OS === 'android' ? 14 : 12,
        color: COLOR.GRAY_DARK,
        fontWeight: "400",
        paddingVertical: Platform.OS === 'android' ? 1 : 2,
    },

    containerAccount_accountId: {
        fontSize: Platform.OS === 'android' ? 14.5 : 12.5,
        color: COLOR.BLUE_DARK,
    },

    containerAccount_titleBalance: {
        fontSize: Platform.OS === 'android' ? 14 : 12,
        color: COLOR.GRAY_DARK,
        textAlign: 'right'
    },

    containerAccount_balance: {
        fontSize: Platform.OS === 'android' ? 18 : 15,
        color: COLOR.BLACK,
        fontWeight: "600",
        textAlign: 'right',
        paddingTop: 2
    },

    containerForm: {
        width: '100%', 
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