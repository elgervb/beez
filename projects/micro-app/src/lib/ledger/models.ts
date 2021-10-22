import firebase from 'firebase/app';

export interface LedgerEntry {
  type: LedgerEntryType;
  date: firebase.firestore.Timestamp;
  description: string;
  amount: number;
  comment?: string;
}

export enum LedgerEntryType {
  expense = 'expense',
  income = 'income'
}
