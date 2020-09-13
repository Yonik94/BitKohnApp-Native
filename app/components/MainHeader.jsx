import React from 'react';
import { Text, StyleSheet, SafeAreaView, Image } from "react-native";
import * as Localization from 'expo-localization';

export const MainHeader = () => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <Image style={styles.logo} source={require('../assets/icons/logo1.png')} />
            <Text style={styles.text}>BitKohn</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: Localization.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10
    },
    text: {
        fontSize: 30,
        fontFamily: 'Rubik-SemiBold',
        color: 'white'
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 10
    }
})