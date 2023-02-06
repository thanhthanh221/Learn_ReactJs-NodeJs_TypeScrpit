import { AccountActionTypes, AccountState, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./types";

const initalState: AccountState = {
    user: null,
    loading: false,
    error: null,
    token: null
}

const accountReducer = (
    state: AccountState = initalState,
    action: AccountActionTypes
): AccountState => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return { ...state, loading: true };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                token: action.payload.token
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
                token: null,
                error: null
            }
        }
        default : return state
    }
}

export {accountReducer}