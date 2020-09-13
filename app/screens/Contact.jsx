import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import * as Contacts from 'expo-contacts';
import { LinearGradient } from 'expo-linear-gradient';

import { setContacts } from '../actions/UserActions';

import { Filter } from '../components/Filter';
import { ContactList } from '../components/ContactList';

export const Contact = ({ navigation }) => {
    const contacts = useSelector(state => state.contacts);
    const dispatch = useDispatch()
    const [contactsToShow, setContactsToShow] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');

    const filterContacts = (str) => {
        const filteredContacts = contacts.filter(contact => {
            return (
                contact.name.toLowerCase().includes(str.toLowerCase()) ||
                contact.phoneNumbers.some(phoneNumber => phoneNumber.number.includes(str))
            )
        })
        setContactsToShow(filteredContacts);
    }

    useEffect(() => {
        dispatch(setContacts(Platform.OS));
    }, [])
    useEffect(() => {
        if (contacts) {
            setLoading(false);
        }
    }, [contacts])

    useEffect(() => {
        if (contacts) {
            filterContacts(filterText)
        }
    }, [filterText])

    return (
        <View style={styles.contactScreen}>
            <LinearGradient
                style={{ flex: 1, width: '100%', paddingRight: 20, paddingLeft: 20 }}
                colors={['rgba(44,124,157,0.8)', 'rgba(23,115,66,0.8)']}
                start={[0.8, 0.6]}
                end={[1, 1]}
            >
                <Filter setFilterText={setFilterText} />
                {isLoading && <Text style={styles.text}>Loading...</Text>}
                {!isLoading && <ContactList
                    contacts={filterText ? contactsToShow : contacts}
                    navigation={navigation}
                />}
            </LinearGradient>
        </View>
    )
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
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})

// const mapStateProps = state => {
//     if (state && state.user && state.user.contacts) {
//         return {
//             contacts: state.user.contacts
//         }
//     } else {
//         return { contacts: state }
//     }
// }
// const mapDispatchToProps = {
//     setContacts
// }

// export const Contact = connect(mapStateProps, mapDispatchToProps)(_Contact);
// if (contacts.length > 0) return;
        // (async () => {
        //     if (Platform.OS !== 'android') return
        //     const { status } = await Contacts.requestPermissionsAsync();
        //     if (status === 'granted') {
        //         const { data } = await Contacts.getContactsAsync({
        //             fields: [Contacts.Fields.PhoneNumbers],
        //         });
        //         const contactsToUpdate = [];
        //         if (data.length > 0) {
        //             data.forEach(contact => {
        //                 if (contact.phoneNumbers && contact.phoneNumbers[0].number) {
        //                     contactsToUpdate.push(contact)
        //                 }
        //             });
        //             setContacts(contactsToUpdate);
        //         }
        //     }
        // })();