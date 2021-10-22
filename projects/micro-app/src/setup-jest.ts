import { randomNumber, randomString, register } from '@elgervb/mock-data';
import { LedgerEntry, LedgerEntryType } from './lib/ledger/models';

register<LedgerEntry>('LedgerEntry', {
  amount: () => randomNumber(1, 100, 2),
  date: () => new Date(),
  description: () => randomString(10),
  type: () => randomNumber(1, 10) % 2 ? LedgerEntryType.income : LedgerEntryType.expense
});
