import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { COLOR, FONT_SIZES } from '../theme/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { Loading } from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { findAccountByUserId_thunk } from '../store/account/thunks';
import { myMovementsByAccountId_thunk } from '../store/movement/thunks';
import { logout_thunk } from '../store/auth/thunks';
import { logoutReducer } from '../store/auth/authSlice';



export const HomeScreen = () => {

    const navigator: any = useNavigation();

    const dispatch: any = useDispatch();

    const { user, status } = useSelector((state: any) => state.auth );
    
    const { account, isLoadingAccount } = useSelector((state: any) => state.account );
    console.log({account})

    const { movements } = useSelector((state: any) => state.movement );
    console.log({movements})
    
    // const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() =>
        navigator.addListener('beforeRemove', (e: any) => {
        e.preventDefault();
        if (true) return
    }),[]);

    const onRefresh = () => {
        setRefresh(true);
        dispatch( findAccountByUserId_thunk( user?.id ) );
        dispatch( myMovementsByAccountId_thunk( account?._id ) );

        // findByUserEmail(user?.email!);
        // myMovementsByAccountId(account?._id!);
        setRefresh(false);
    }

    useEffect(() => {
        dispatch( findAccountByUserId_thunk( user?.id ) );
        dispatch( myMovementsByAccountId_thunk( account?._id ) );

    //     setIsLoading(true);
    //     findByUserEmail(user?.email!);
    //     myMovementsByAccountId(account?._id!);
    //     setIsLoading(false)
    // }, [ account._id ]);
    }, [ account, movements ]);

    // if( isLoading ) return <Loading />;
    // dispatch( logoutReducer() );

    return (
        <SafeAreaView style={{ ...styles.main }}>
            <StatusBar backgroundColor={COLOR.GRAY_LIGHT} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}

                refreshControl={
                    <RefreshControl 
                        refreshing={ refresh }
                        onRefresh={() => onRefresh()}
                    />
                }
            >
                <View style={{ ...styles.container }}>
                    <Text style={{ ...styles.greeting, textAlign: 'center' }}>Hola, { user?.fullName.split(' ')[0] }</Text>
                </View>
                <View 
                    style={{ ...styles.amountContainer, }}
                >
                    <View style={{ ...styles.containerIcon }}>
                        <Icon name="wallet-outline" style={{ ...styles.iconMoney }} />
                    </View>
                    <View>
                        <Text style={{ ...styles.amount }}>{ account.balance }</Text>
                        <Text style={{ ...styles.textBalance }}>Balance</Text>
                    </View>
                </View>
                <View style={{ ...styles.container }}>
                    <Text style={{ ...styles.titleMyMovements }}>Mis movimientos</Text> 
                    <View style={{ ...styles.containerMyMovements }}>

                        {
                            movements.length === 0 ? (
                                <View style={{ ...styles.noContentContainer }}>
                                    <Icon name="file-tray-full-outline" style={{ ...styles.iconNoContent }} />
                                    <Text style={{ ...styles.textNoContent }}>No has realizado ningún movimiento</Text>
                                </View>
                            ) : (
                                <ScrollView>
                                    {
                                        movements.map((movement: any) => (
                                            <View 
                                                key={ movement._id }
                                                style={{ ...styles.containerMovement }}    
                                            >
                                                <View style={{ ...styles.containerAmountAndReason }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {
                                                            movement.accountId_Income == account._id ? (
                                                                <Icon name="trending-up-outline" style={{ ...styles.iconAnalytics, color: movement.accountId_Income === account._id ? COLOR.GREEN : COLOR.RED_DARK }} />
                                                            ) : (
                                                                <Icon name="trending-down-outline" style={{ ...styles.iconAnalytics, color: movement.accountId_Income === account._id ? COLOR.GREEN : COLOR.RED_DARK }} />
                                                            )
                                                        }
                                                        <Text
                                                            style={{ ...styles.descriptionReason }}
                                                        >
                                                            { movement?.reason?.length! >= 20 ? movement.reason?.substring(0, 20) + '...' : movement.reason }
                                                        </Text>
                                                    </View>
                                                    <View>
                                                        <Text 
                                                            style={{ 
                                                                ...styles.movementAmount, 
                                                                color: movement.accountId_Income === account._id ? COLOR.GREEN : COLOR.RED_DARK
                                                            }}
                                                        >
                                                            { movement.amount }
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text style={{ ...styles.createdAt }}>{ movement.createdAt }</Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                            )
                        }

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
        fontSize: Platform.OS === 'ios' ? 25 : 28, 
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
        height: Platform.OS === 'ios' ? 500 : 600,
        padding: 15,
        marginTop: 10,
        backgroundColor: COLOR.WHITE,
        borderRadius: 6,
    },

    noContentContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: Platform.OS === 'ios' ? 180 : 250
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

    containerMovement: {
        marginBottom: 20
    },

    containerAmountAndReason: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
    },

    iconAnalytics: {
        fontSize: 17,
        marginRight: 10,
        // color: COLOR.BLACK,
    },

    descriptionReason: {
        fontSize: Platform.OS === 'ios' ? 14 : 16,
        fontWeight: "600", 
        color: COLOR.GRAY_DARK_TWO,
    },

    movementAmount: {
        fontSize: Platform.OS === 'ios' ? 14 : 16,
        fontWeight: "500", 
    },

    createdAt: {
        fontSize: Platform.OS === 'ios' ? FONT_SIZES.TEXT_IOS : FONT_SIZES.TEXT_ANDROID,
        fontWeight: "400", 
        color: COLOR.GRAY_DARK,
    }

});




// export const HomeScreen = () => {

//     return (
//         <Text>Hello world</Text>
//     )
// }