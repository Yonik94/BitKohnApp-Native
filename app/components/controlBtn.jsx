import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
export const ControlBtn = (props) => {
    const bgc = props.bgc
    const text = props.text
    const imgSource = props.source
    '../assets/icons/send.png'
    return (
            <View style={styles.btnContainer}>
                <View style={[styles.iconContainer, { backgroundColor: bgc }]}>
                    <Image style={styles.icon} source={imgSource} />
                </View>
                <Text style={styles.text}>{ text }</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Rubik-Medium',
    },
    icon: {
        width: 20,
        height: 20,
    }
})