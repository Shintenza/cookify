export const strToNum = (strNum: string): number | undefined => {
  const parsedNum = parseInt(strNum);
  return !isNaN(parsedNum) ? parsedNum : undefined;
};
