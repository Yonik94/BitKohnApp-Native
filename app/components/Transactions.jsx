import React from 'react';
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
            <Text style={[styles.text, {marginBottom: 10, marginTop: 10}]}>
                BitKohn status:
                </Text>
            <FlatList
                data={props.transactions}
                renderItem={renderItems}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View>
                        <Text style={styles.text}>
                            You don't have transaction yet
                    </Text>
                    </View>
                )}>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
})