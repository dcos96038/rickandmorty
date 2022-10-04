import AsyncStorage from "@react-native-async-storage/async-storage";
import {createContext, useEffect, useReducer} from "react";

import loginApi from "../api/loginApi";
import {GetUserResponse, LoginForm, LoginResponse, UserData} from "../interfaces/authInterface";

import {authReducer, AuthState} from "./AuthReducer";

interface ProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  errorMsg: string;
  username: string | null;
  userId: string | null;
  status: "checking" | "authenticated" | "not-authenticated";
  userData: UserData | null;
  signIn: (obj: LoginForm) => void;
  logout: () => void;
  removeError: () => void;
}

const authInitialState: AuthState = {
  status: "checking",
  userId: null,
  username: null,
  errorMsg: "",
  userData: null,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) return dispatch({type: "logout"});

    const resp = await loginApi.get<GetUserResponse>(`/user/${token}`);

    const {mail} = resp.data.userData;

    dispatch({
      type: "signIn",
      payload: {userId: token, username: mail, userData: resp.data.userData},
    });
  };

  useEffect(() => {
    checkToken();
  }, []);

  const signIn = async ({email, password}: LoginForm) => {
    try {
      dispatch({type: "setStatus", payload: "checking"});
      const loginRespData = await loginApi.post<LoginResponse>("/login", {mail: email, password});
      const userId = loginRespData.data.userId;
      const username = loginRespData.data.userName;

      if (loginRespData.status === 200) {
        const userDataResp = await loginApi.get<GetUserResponse>(`/user/${userId}`);

        const {userData} = userDataResp.data;

        dispatch({
          type: "signIn",
          payload: {
            userId: userId,
            username: username,
            userData: userData,
          },
        });
      }

      await AsyncStorage.setItem("token", userId);
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
