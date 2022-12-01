import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { COLOR } from '../theme'

export const ApprovedCreditScreen = () => {

  const navigator: any = useNavigation();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigator.navigate("HomeScreen");
    }, 4500)
    
    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLOR.GRAY_LIGHT} />
      <View style={{ ...styles.main }}>
        <Text
          style={{ 
            fontSize: Platform.OS === 'ios' ? 16 : 20,
            color: COLOR.BLACK,
            fontWeight: "600"
         }}
        >
          Felicidades
        </Text>
        <Text
          style={{ 
            fontSize: Platform.OS === 'ios' ? 14 : 18,
            color: COLOR.BLACK,
            fontWeight: "400",
            paddingTop: 10
         }}
        >
          Tu credito ha sido aprobado!
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});