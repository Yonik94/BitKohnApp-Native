import React, { useState, useEffect, } from 'react';
import { View, StyleSheet, } from 'react-native';
import { TextInput, FlatList, } from 'react-native-gesture-handler';

export const NumberInput = (props) => {
    const [inputValue, setInputValue] = useState(new Array(props.cellsCount));
    const onChangeValue = (text, index) => {
        const newInputValues = [...inputValue];
        newInputValues[index] = text;
        setInputValue(newInputValues);
        focusInput(index);
    }

    useEffect(() => {
        if (inputValue[props.cellsCount - 1]) {
            const value = inputValue.join('')
                console.log({ value });
                props.setValue(value)
        }
    }, [inputValue])

    const focusInput = (index) => {
        if (!inputValue[index]) {
            const nextIndex = parseInt(index) + 1
            inputsRefs[index].blur();
            if (nextIndex < props.cellsCount) inputsRefs[nextIndex].focus();
        }
    }

    const inputsRefs = [];
    const renderInput = ({ item, index }) => {
        return (
            <TextInput
                style={styles.input}
                secureTextEntry={props.isSecure}
                onChangeText={text => onChangeValue(text, index)}
                maxLength={1}
                keyboardType={"number-pad"}
                blurOnSubmit={false}
                autoFocus={true}
                ref={(input) => inputsRefs[index] = input}
            />)
    }

    return (
        <View>
            <FlatList
                contentContainerStyle={styles.inputContainer}
                data={inputValue}
                renderItem={renderInput}
                keyExtractor={(value, index) => index.toString()} />
        </View>
    );
}
const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },

    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: 30,
        height: 30,
        marginRight: 10,
        textAlign: 'center'
    }
})