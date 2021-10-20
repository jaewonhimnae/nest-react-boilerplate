import { createContext, FC, useReducer } from "react";
import { authReducer, AuthState } from "../reducer/AuthReducer";
import { AuthActionType } from "../reducer/type";
import { api } from "../utils/axiosInstance";
const { TOGGLE_AUTH, SIGN_OUT } = AuthActionType;

interface AuthContextDefault {
    authInfo: AuthState;
    authentication: () => void;
    signOut: () => void;
}
const authDefault = {
    username: "",
    image: ""
};

export const AuthContext = createContext<AuthContextDefault>({
    authInfo: authDefault,
    authentication: () => { },
    signOut: () => { }
});

type AxiosReponse = {
    username: string;
    image: string;
}

const AuthContextProvider: FC = ({ children }) => {
    const [authInfo, dispatch] = useReducer(authReducer, authDefault);
    const authentication = async () => {
        const { data } = await api().get<AxiosReponse>(`/auth`)
        return dispatch({
            type: TOGGLE_AUTH,
            payload: data
        });
    }
    const signOut = () => {
        return dispatch({
            type: SIGN_OUT,
            payload: authDefault
        });
    }
    const AuthContextData = {
        authInfo,
        authentication,
        signOut
    };
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContextProvider;
