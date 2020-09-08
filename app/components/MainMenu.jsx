import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const MainMenu = (props) => {
    const closeMenu = () => {
        props.openCloseMenu(false);
    }

    return (
        <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.menuScreen}>
            <ScrollView style={styles.menuContainer}>
                <View style={styles.navLink}>
                    <Text>HomePage</Text>    
                </View>
                <View style={styles.navLink}>
                    <Text>Contacts</Text>    
                </View>
            </ScrollView>
        </View>        
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
        menuScreen: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 2
        },
        menuContainer: {
            backgroundColor: 'grey',
            width: 200,
            height: '100%',
            position: 'absolute',
            right: 0
        },
        navLink: {
            borderBottomColor: 'black',
            borderStyle: 'solid',
            borderWidth: 1,
            marginBottom: 3
        }
})