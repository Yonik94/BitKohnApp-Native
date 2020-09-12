import React from 'react';
import { Text, StyleSheet, SafeAreaView } from "react-native";
import * as Localization from 'expo-localization';

export const MainHeader = () => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <Text style={styles.logo}>BitKohn</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: Localization.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    }
})