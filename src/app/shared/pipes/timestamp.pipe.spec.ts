import { transform } from '@elgervb/mock-data';
import { TimestampPipe } from './timestamp.pipe';
import firebase from 'firebase/app';

describe('TimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms a timestamp into a date string', () => {
    const pipe = new TimestampPipe();
    const timestamp = transform<unknown, firebase.firestore.Timestamp>({ seconds: 1620766153, nanoseconds: 0 });
    expect(pipe.transform(timestamp)).toBe('05-11-2021');
  });
});
