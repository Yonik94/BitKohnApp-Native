import React from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
export const NextBtn = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.nextBtn}>
                <Text style={{ fontSize: 20, color: 'white' }}>Next</Text>
            </View>
        </TouchableNativeFeedback>
    );
}
const styles = StyleSheet.create({
    nextBtn: {
        padding: 20,
        backgroundColor: '#d32733',
        justifyContent: 'center',
        alignItems: 'center'
    }
})