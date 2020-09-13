import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from 'react-native-gesture-handler';

export const Transactions = (props) => {
    const renderItems = ({ item }) => {
        return (
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.text}>{item.toContactName} </Text>
                    <Text style={styles.text}> ${item.amount} </Text>
            </View>
        )
    }
    return (
        <View>
            <Text style={[styles.text, {marginTop: 10, marginBottom: 20, fontFamily: 'Rubik-SemiBold'}]}>
                BitKohn status
                </Text>
            <FlatList
                data={props.transactions}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View>
                        <Text style={styles.text}>
                            You don't have transactions yet
                    </Text>
                    </View>
                )}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Rubik-Regular',
    },
})