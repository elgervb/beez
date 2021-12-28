import { randomDate, randomNumber, randomString, register } from '@elgervb/mock-data';
import { LedgerEntry, LedgerEntryType } from './lib/ledger/models';

import firebase from 'firebase';

register<LedgerEntry>('LedgerEntry', {
  amount: () => randomNumber(1, 100, 2),
  date: () => new firebase.firestore.Timestamp(randomDate().getTime() / 1000, 0),
  description: () => randomString(10),
  type: () => randomNumber(1, 10) % 2 ? LedgerEntryType.income : LedgerEntryType.expense
});
