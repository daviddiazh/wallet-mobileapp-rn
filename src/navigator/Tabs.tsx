import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '../screens/HomeScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { CreditScreen } from '../screens/CreditScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { COLOR } from '../theme/index';

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

export const Tabs = () => {

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            sceneContainerStyle={{
                backgroundColor: COLOR.GRAY_LIGHT,
            }}
            screenOptions={ ({ route }) => 
                ({
                    headerStyle: {
                        elevation: 0,
                        shadowColor: 'transparent',
                    },
                    headerShown: false,

                    tabBarActiveTintColor: COLOR.BLUE,

                    tabBarIcon: ({color, focused}) => {
                        let iconName: string = '';
                        switch( route.name ) {
                            case 'HomeScreen': 
                                iconName = 'home-outline'
                            break;

                            case 'CreditScreen': 
                                iconName = 'cash-outline'
                            break;

                            case 'PaymentScreen': 
                                iconName = 'card-outline'
                            break;

                            case 'MenuScreen': 
                                iconName = 'menu-outline'
                            break;
                        }
                        return <Icon style={{color}} name={ iconName } size={ 19 } />
                    }
                })
            }
        >
            <Tab.Screen name="HomeScreen" options={{ title: 'Inicio' }} component={HomeScreen} />
            <Tab.Screen name="CreditScreen" options={{ title: 'Solic. Credito' }} component={CreditScreen} />
            <Tab.Screen name="PaymentScreen" options={{ title: 'Transferir Dinero' }} component={PaymentScreen} />
            <Tab.Screen name="MenuScreen" options={{ title: 'Menú' }} component={MenuScreen} />
        </Tab.Navigator>
    );
}
