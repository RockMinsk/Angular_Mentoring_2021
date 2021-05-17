import { MinutesToHoursPipe } from './minutes-to-hours.pipe';

describe('Pipe: MinutesToHoursPipe', () => {
  let pipe: MinutesToHoursPipe;

  beforeEach(() => {
    pipe = new MinutesToHoursPipe();
  });

  it('providing 0 minutes', () => {
    expect(pipe.transform(0)).toBe('N/A');
  });

  it('providing more than 0 minutes but less than 1 hour', () => {
    expect(pipe.transform(45)).toBe('45 min');
  });

  it('providing more than 1 hour', () => {
    expect(pipe.transform(135)).toBe('2 h 15 min');
  });
});
