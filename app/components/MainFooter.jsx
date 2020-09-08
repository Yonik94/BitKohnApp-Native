import React from 'react';
import { View, Text, StyleSheet } from "react-native";

// import hamburgeMenu from '../assets/icons/hamburgeMenu'

export const MainFooter = () => {
    return (
        <View style={styles.footerContainer}>
            <Text>All rights reserved to BitKohn</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#9ED8DB',
        width: '100%',
        paddingBottom: 5,
        paddingTop: 5,
        paddingStart: 10,
        paddingEnd: 10,
    },
})