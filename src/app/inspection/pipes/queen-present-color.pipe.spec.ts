import { transform } from '@elgervb/mock-data';
import { Inspection } from '../models';
import { QueenPresentColorPipe, QueenPresentColors } from './queen-present-color.pipe';

describe('QueenPresentColorPipe', () => {

  it('create an instance', () => {
    const pipe = new QueenPresentColorPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns present', () => {
    const pipe = new QueenPresentColorPipe();
    let inspection = transform<Inspection>({ queen: true });
    expect(pipe.transform(inspection)).toBe(QueenPresentColors.present);

    inspection = transform<Inspection>({ eggs: true });
    expect(pipe.transform(inspection)).toBe(QueenPresentColors.present);
  });

  it('returns missing', () => {
    const pipe = new QueenPresentColorPipe();
    const inspection = transform<Inspection>({ queen: false, eggs: false, larva: false });
    expect(pipe.transform(inspection)).toBe(QueenPresentColors.missing);
  });

  it('returns maybe', () => {
    const pipe = new QueenPresentColorPipe();
    const inspection = transform<Inspection>({ queen: false, eggs: false, larva: true });
    expect(pipe.transform(inspection)).toBe(QueenPresentColors.maybe);
  });

});
