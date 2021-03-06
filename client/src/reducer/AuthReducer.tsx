import { AuthActionType } from "./type";
const { TOGGLE_AUTH, SIGN_OUT } = AuthActionType;

interface User {
    id: string;
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
                id: payload.id,
                username: payload.username,
                image: payload.image
            };
        case SIGN_OUT:
            return {
                ...state,
                id: "",
                username: "",
                image: ""
            };
        default:
            return state;
    }
};
