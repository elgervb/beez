import firebase from 'firebase/app';

export type User = firebase.User;

export interface UserInfo {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}
