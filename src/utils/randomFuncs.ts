export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getShuffledList = <T>(list: T[]): T[] => {
  return [...list].sort(() => Math.random() - 0.5);
};
