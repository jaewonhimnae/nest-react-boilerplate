import { AuthActionType } from "./type";
const { TOGGLE_AUTH, SIGN_OUT } = AuthActionType;

interface User {
    username: string;
    image: string;
}
export type AuthState = User;

type AuthAction = {
    type: AuthActionType;
    payload: User;
};

export const authReducer = (state: AuthState, action: AuthAction) => {
    const { payload } = action;
    switch (action.type) {
        case TOGGLE_AUTH:
            return {
                ...state,
                username: payload.username,
                image: payload.image
            };
        case SIGN_OUT:
            return {
                ...state,
                username: "",
                image: ""
            };
        default:
            return state;
    }
};
