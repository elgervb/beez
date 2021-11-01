import { arrayFrom } from '@elgervb/mock-data';
import { LedgerEntry } from '../models';
import { SumPipe } from './sum.pipe';

describe('SumPipe', () => {
  it('create an instance', () => {
    const pipe = new SumPipe();
    expect(pipe).toBeTruthy();
  });

  it('calculates the sum of the ledger', () => {
    const pipe = new SumPipe();
    const ledgers = arrayFrom<LedgerEntry>('LedgerEntry', 2).map(ledger => ({ ...ledger, amount: 5 }));

    expect(pipe.transform(ledgers)).toBe(10);
  });

  it('returns null on empty array', () => {
    const pipe = new SumPipe();
    expect(pipe.transform([])).toBeNull();
    expect(pipe.transform(null)).toBeNull();
  });
});
