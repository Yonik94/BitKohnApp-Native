import { userService } from '../services/user.service'
import * as Contacts from 'expo-contacts';

export const getContacts = async (dispatch) => {
    // return async () => {
    if (Platform.OS !== 'android') return
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
            const contacts = data.filter(contact => contact.phoneNumbers && contact.phoneNumbers[0].number);
            dispatch({ type: 'GET_CONTACTS', contacts });
        }
    }
    // }
}