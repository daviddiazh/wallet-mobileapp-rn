import React, { Fragment } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

export const WelcomeScreen = () => {
    let ref;
    return (
        <Fragment>
            <View style={[ styles.mainScreen ]}>
                <ConfettiCannon 
                    count={250}
                    origin={{
                        x: -15, 
                        y: 35
                    }}
                    autoStart={true}
                    ref={_ref => ref = _ref}
                />
                <Text>WelcomeScreen</Text>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
//TODO: hacer del 100%