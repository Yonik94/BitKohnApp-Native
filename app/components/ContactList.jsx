import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { ContactPreview } from './ContactPreview';
export const ContactList = (props) => {

    const renderItem = ({ item }) => {
        return (
            <ContactPreview item={item} navigation={props.navigation} />
        )
    }

    return (
        <FlatList
            data={props.contacts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
                <View>
                    <Text style={styles.text}>
                        Contacts didn't found
                            </Text>
                </View>
            )}
        />

    );
}
const styles = StyleSheet.create({

})
