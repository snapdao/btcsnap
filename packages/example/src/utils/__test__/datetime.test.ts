import { addLeadingZero, covertSecondsToHM } from './../datetime';

describe('datetime', () => {
  describe('covertSecondsToHM', () => {
    const seconds = 155;
    it('should return covertSecondsToHM given seconds', async () => {
      const data = covertSecondsToHM(seconds);
      expect(data).toEqual({
        hours: 0,
        minutes: 2,
        seconds: 35
      });
    });
  });

  describe('addLeadingZero', () => {
    it('should return the padZero text given number', () => {
      const hour = 9;
      const padText = addLeadingZero(hour);
      expect(padText).toBe('0' + hour);
    });
  });
});
