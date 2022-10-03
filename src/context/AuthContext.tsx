import AsyncStorage from "@react-native-async-storage/async-storage";
import {createContext, useReducer} from "react";

import loginApi from "../api/loginApi";
import {LoginForm, LoginResponse} from "../interfaces/authInterface";

import {authReducer, AuthState} from "./AuthReducer";

interface ProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  errorMsg: string;
  username: string | null;
  userId: string | null;
  status: "checking" | "authenticated" | "not-authenticated";
  signIn: (obj: LoginForm) => void;
  logout: () => void;
  removeError: () => void;
}

const authInitialState: AuthState = {
  status: "authenticated",
  userId: null,
  username: null,
  errorMsg: "",
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const signIn = async ({email, password}: LoginForm) => {
    try {
      const {data} = await loginApi.post<LoginResponse>("/login", {mail: email, password});

      dispatch({
        type: "signIn",
        payload: {
          userId: data.userId,
          username: data.userName,
        },
      });

      await AsyncStorage.setItem("token", data.userId);
    } catch (error: any) {
      dispatch({
        type: "addError",
        payload: error.response.data.message || "Informacion incorrecta",
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch({type: "logout"});
  };

  const removeError = () => {
    dispatch({type: "removeError"});
  };

  return (
    <AuthContext.Provider value={{...state, signIn, logout, removeError}}>
      {children}
    </AuthContext.Provider>
  );
};
