export const switchUnits = (letters: string) => {
  const num = Number(letters.slice(0, letters.length - 1));
  const unit = letters.slice(letters.length - 1);
  const numLen = letters.slice(0, letters.length - 1).length - 1;

  switch(unit) {
    case "m":
      return (num * 0.001).toFixed(3 - numLen);
    case "u":
      return (num * 0.000001).toFixed(6 - numLen);
    case "n":
      return (num * 0.000000001).toFixed(9 - numLen);
    case "p":
      return (num * 0.000000000001).toFixed(12 - numLen);
    default:
      return letters;
  }
}

export const calcTime = (sec: number) => {
  let min = 0;
  let hour = 0;
  let result = '';
  if(sec < 60) {
    return sec + 's';
  }
  if(sec >= 60) {
    min = Math.trunc(sec / 60);
    sec = Math.trunc(sec % 60);
    if(min >= 60) {
      hour = Math.trunc(min / 60);
      min = Math.trunc(min % 60);
    }
  }
  if(sec > 0) {
    result = sec + 's'
  }
  if(min > 0) {
    result = min + "m" + result;
  }
  if(hour > 0) {
    result = hour + "h" + result;
  }
  return result;
}
