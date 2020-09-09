import React from 'react';
import { View, StyleSheet, Text, WebView } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';

export const NumberInput = (props) => {
    const getInputs = () => {
        let strHtml = ``
        for(let i = 0; i < props.cells; i++) {
            strHtml += `${<TextInput 
            style={styles.input}
            secureTextEntry={props.isSecure}
            />}`
        }
        console.log({strHtml});
        return strHtml
    }

    return (
        <View>
        </View>        
    );
}
const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        width: 30,
        height: 30,
        marginRight: 10,
    }
})