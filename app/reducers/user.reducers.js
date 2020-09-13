const INITIAL_STATE = {
    loggedInUser: null,
    contacts: null,
    transactions: null,
}
export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
        case 'SET_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
        case 'SET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.transactions
            }
        default:
            return state
    }
};