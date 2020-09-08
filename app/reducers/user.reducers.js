const INITIAL_STATE = {
    contacts: null,
    user: null
}
export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'GET_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
            default: return state
    }
};