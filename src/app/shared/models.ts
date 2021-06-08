import firebase from 'firebase/app';

export type Timestamp = firebase.firestore.Timestamp;

export interface QRBeezModel {
  type: 'hive' | 'queen';
  id: string;
}
