import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import * as Localization from 'expo-localization';

export const BackBtn = (props) => {
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback style={styles.btn} onPress={props.goBack}>
                <Text style={styles.text}>Back</Text>
                <Image style={styles.backIcon} source={require('../assets/icons/back.png')} />
            </TouchableNativeFeedback>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: Localization.isRTL ? 'flex-end' : 'flex-start',
    },
    btn: {
        flexDirection: Localization.isRTL ? 'row' : 'row-reverse',
        position: 'relative',
        left: 0,
        width: 100,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    backIcon: {
        width: 30,
        height: 30,
        marginRight: 10
    }
})