import firebase from 'firebase/app';

export type Timestamp = firebase.firestore.Timestamp;

export interface Queen {
  active: boolean;
  id?: string;
  color?: string;
  date: Timestamp;
  isMarked?: boolean;
  name: string;
  remarks?: string;
}
