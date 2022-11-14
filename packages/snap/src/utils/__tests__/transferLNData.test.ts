import { switchUnits, formatTime } from "../transferLNData"

describe('switchUnits', () => {
  it(`should return invoice amount if letters has 'm'`, () => {
    const letters = '20m';
    expect(switchUnits(letters)).toBe("0.02");
  })

  it(`should return invoice amount if letters has 'u'`, () => {
    const letters = '200u'
    expect(switchUnits(letters)).toBe("0.0002");
  })

  it(`should return invoice amount if letters has 'n'`, () => {
    const letters = '20n'
    expect(switchUnits(letters)).toBe("0.00000002");
  })

  it(`should return invoice amount if letters has 'p'`, () => {
    const letters = '20p'
    expect(switchUnits(letters)).toBe("0.00000000002");
  })
})

describe('formatTime', () => {
  it('should returns a time containing minutes if expire time more than 60s', () => {
    const sec = 90;
    expect(formatTime(sec)).toBe("0H 1M")
  })

  it('should returns a time containing hours if expire time less than 3600s', () => {
    const sec = 86400;
    expect(formatTime(sec)).toBe("24H 0M")
  })

  it('should returns a time containing hours, minutes and seconds if expire time less than 3600s', () => {
    const sec = 86490;
    expect(formatTime(sec)).toBe("24H 1M")
  })
 
})
