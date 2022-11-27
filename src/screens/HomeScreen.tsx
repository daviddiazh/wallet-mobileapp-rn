import { useNavigation } from '@react-navigation/native';
import React, { Fragment } from 'react'
import { View, Text, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
                    <Text>Hello world</Text>
                </View>
            </ScrollView>
        </Fragment>
    );
}
