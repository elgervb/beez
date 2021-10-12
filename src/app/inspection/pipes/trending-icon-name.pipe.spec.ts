import { transform } from '@elgervb/mock-data';
import { TrendingIconName } from '.';
import { Inspection } from '../models';
import { TrendingIconNamePipe } from './trending-icon-name.pipe';

describe('TrendingIconNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TrendingIconNamePipe();
    expect(pipe).toBeTruthy();
  });


  it('goes up', () => {
    const pipe = new TrendingIconNamePipe();
    const inspection = transform<Inspection>({ health: 50 });

    expect(pipe.transform(inspection, [ inspection, { ...inspection, health: 40 } ])).toBe(TrendingIconName.up);
  });

  it('goes down', () => {
    const pipe = new TrendingIconNamePipe();
    const inspection = transform<Inspection>({ health: 50 });

    expect(pipe.transform(inspection, [ inspection, { ...inspection, health: 60 } ])).toBe(TrendingIconName.down);
  });

  it('is the same', () => {
    const pipe = new TrendingIconNamePipe();
    const inspection = transform<Inspection>({ health: 50 });

    expect(pipe.transform(inspection, [ inspection, { ...inspection, health: 50 } ])).toBe(TrendingIconName.equal);
  });

  it('is last', () => {
    const pipe = new TrendingIconNamePipe();
    const inspection = transform<Inspection>({ health: 50 });

    expect(pipe.transform(inspection, [ inspection ])).toBe(TrendingIconName.equal);
  });

  it('with empty list', () => {
    const pipe = new TrendingIconNamePipe();
    const inspection = transform<Inspection>({ health: 50 });

    expect(pipe.transform(inspection, [])).toBe(TrendingIconName.equal);
  });

  it('without list', () => {
    const pipe = new TrendingIconNamePipe();
    const inspection = transform<Inspection>({ health: 50 });

    expect(pipe.transform(inspection)).toBe(TrendingIconName.equal);
  });

  it('not in the list', () => {
    const pipe = new TrendingIconNamePipe();
    const inspection = transform<Inspection>({ health: 50 });

    expect(pipe.transform(inspection, [ { ...inspection }, { ...inspection } ])).toBe(TrendingIconName.equal);
  });
});
