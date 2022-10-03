export interface LoginResponse {
  userId: string;
  userName: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface GetUserResponse {
  userData: UserData;
  userId: string;
}

export interface UserData {
  mail: string;
  name: string;
  phone: string;
  surname: string;
}

export interface UserModificationResponse {
  message: string;
  metadata: Metadata;
  newUserData: NewUserData;
}

export interface Metadata {
  $metadata: MetadataClass;
}

export interface MetadataClass {
  attempts: number;
  httpStatusCode: number;
  requestId: string;
  totalRetryDelay: number;
}

export interface NewUserData {
  mail: string;
  name: string;
  phone: string;
  surname: string;
}

export interface UserDataModifyError {
  error: {message: string};
}
