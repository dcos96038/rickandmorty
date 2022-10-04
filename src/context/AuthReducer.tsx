import {UserData} from "../interfaces/authInterface";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  userId: string | null;
  errorMsg: string;
  username: string | null;
  userData: UserData | null;
}

export type AuthAction =
  | {type: "signIn"; payload: {userId: string | null; username: string | null; userData: UserData}}
  | {type: "addError"; payload: string}
  | {type: "removeError"}
  | {type: "notAuthenticated"}
  | {type: "logout"}
  | {type: "setStatus"; payload: "checking" | "authenticated" | "not-authenticated"};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  if (action.type === "addError") {
    return {
      ...state,
      username: null,
      status: "not-authenticated",
      errorMsg: action.payload,
      userId: null,
    };
  }

  if (action.type === "removeError") {
    return {
      ...state,
      errorMsg: "",
    };
  }

  if (action.type === "signIn") {
    return {
      ...state,
      errorMsg: "",
      status: "authenticated",
      userId: action.payload.userId,
      username: action.payload.username,
      userData: action.payload.userData,
    };
  }

  if (action.type === "logout") {
    return {
      ...state,
      status: "not-authenticated",
      userId: null,
      username: null,
      userData: null,
    };
  }

  if (action.type === "setStatus") {
    return {
      ...state,
      status: action.payload,
    };
  }

  return state;
};
