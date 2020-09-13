import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
export const Filter = (props) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
                style={styles.filterInput}
                onChangeText={text => props.setFilterText(text)}
                placeholder={'Contact name or Phone number'}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    filterInput: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: 'white',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginBottom: 20,
        marginTop: 20,
        width: 300
    }
})