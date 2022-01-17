import firebase from 'firebase';

export type Timestamp = firebase.firestore.Timestamp;

export interface Hive {
  active: boolean;
  id?: string;
  color?: string;
  type?: string;
  date: Timestamp;
  name: string;
  remarks?: string;
}
