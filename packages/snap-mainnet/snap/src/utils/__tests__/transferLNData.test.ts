import { formatTime } from '../transferLNData';

describe('formatTime', () => {
  it('should returns a time containing minutes if expire time more than 60s', () => {
    const sec = 90;
    expect(formatTime(sec)).toBe('0H 1M');
  });

  it('should returns a time containing hours if expire time less than 3600s', () => {
    const sec = 86400;
    expect(formatTime(sec)).toBe('24H 0M');
  });

  it('should returns a time containing hours, minutes and seconds if expire time less than 3600s', () => {
    const sec = 86490;
    expect(formatTime(sec)).toBe('24H 1M');
  });
});
