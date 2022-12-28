export const covertSecondsToHM = (seconds: number) => {
  seconds = Number(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return {
    hours,
    minutes,
    seconds: Math.floor((seconds % 3600) % 60),
  };
};

export const addLeadingZero = (time: number) => {
  return time < 10 ? `0${time}` : time;
};
