import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export class ContactPreview extends React.PureComponent {

    contactClicked = (contact) => {
        this.props.navigation.navigate('Transfers', {
            contact: {
                phone: contact.phoneNumbers[0].number,
                name: contact.name
            }
        })
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.contactClicked(this.props.item)}>
                <View style={styles.contact}>
                    <Text style={styles.text}>
                        {this.props.item.name}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    contactScreen: {
        flex: 1,
        backgroundColor: `transparent`,
    },
    contact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: 'white',
        borderTopWidth: 0.5,
        paddingVertical: 15,
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})