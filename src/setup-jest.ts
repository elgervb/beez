import { Queen } from './app/queen/models';
import { UserInfo } from 'auth';
import { randomDate, randomString, register } from '@elgervb/mock-data';
import { Inspection } from './app/inspection/models';

// mocks
register<UserInfo>('user', {
  displayName: () => randomString(10),
  photoURL: () => `https://${randomString(6)}/${randomString(4)}.png`, // TODO: add randomUrl to @elgervb/mock-data
  uid: () => randomString(8)
});

register<Queen>('queen', {
  id: () => randomString(16),
  name: () => `${randomString(4)} ${randomString(6)}`
});

register<Inspection>('inspection', {
  date: () => randomDate(),
  remarks: () => randomString(15)
});
