export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  userId: string | null;
  errorMsg: string;
  username: string | null;
}

export type AuthAction =
  | {type: "signIn"; payload: {userId: string | null; username: string | null}}
  | {type: "addError"; payload: string}
  | {type: "removeError"}
  | {type: "notAuthenticated"}
  | {type: "logout"};

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
    };
  }

  if (action.type === "logout") {
    return {
      ...state,
      status: "not-authenticated",
      userId: null,
      username: null,
    };
  }

  return state;
};
