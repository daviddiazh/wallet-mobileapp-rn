import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLOR } from '../theme/index';

export const Loading = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLOR.WHITE
            }}
        >
            <ActivityIndicator 
                size={ 50 }
                color={ COLOR.BLUE_DARK }
            />
        </View>
    )
}
