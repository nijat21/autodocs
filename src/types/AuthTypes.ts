export interface LoginType {
  email: string;
  password: string;
}

export interface SignupType extends LoginType {
  name: string;
}

export interface UserProfile {
  name: string;
  email: string;
  imgUrl: string;
}

export interface UserRes extends UserProfile {
  token: string;
}
