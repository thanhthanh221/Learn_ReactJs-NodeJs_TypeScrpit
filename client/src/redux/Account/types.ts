export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = "LOGOUT"

export interface AuthenticatedUser {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

interface loginRequest {
    type: typeof LOGIN_REQUEST;
    payload: {
        email: string;
        password: string;
    }
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: {
        token: string;
    }
}
interface LoginFailure {
    type: typeof LOGIN_FAILURE;
    payload: {
        error: string;
    }
}

interface Logout {
    type: typeof LOGOUT
}

export interface AccountState {
    user: AuthenticatedUser | null;
    loading: boolean;
    error: string | null;
    token: string | null;
}

export type AccountActionTypes = loginRequest | LoginSuccess | LoginFailure | Logout