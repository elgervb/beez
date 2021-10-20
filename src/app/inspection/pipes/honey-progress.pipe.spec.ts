import { transform } from '@elgervb/mock-data';
import { Inspection } from '../models';
import { HoneyProgressPipe } from './honey-progress.pipe';

describe('HoneyProgressPipe', () => {
  it('create an instance', () => {
    const pipe = new HoneyProgressPipe();
    expect(pipe).toBeTruthy();
  });

  it('shows honey vs closed honey', () => {
    const pipe = new HoneyProgressPipe();
    const inspection = transform<Inspection>({ honey: 50, honeyClosed: 40 });
    expect(pipe.transform(inspection)).toBe('50 / 40');
  });

  it('shows no honey available', () => {
    const pipe = new HoneyProgressPipe();
    const inspection = transform<Inspection>({ honey: undefined, honeyClosed: 40 });
    expect(pipe.transform(inspection)).toBe('n/a');
  });
});
