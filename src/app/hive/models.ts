import firebase from 'firebase/app';

export type Timestamp = firebase.firestore.Timestamp;

export interface Hive {
  active: boolean;
  id?: string;
  date: Timestamp;
  name: string;
  remarks?: string;
}
