export const strToNum = (strNum?: string): number | undefined => {
  if (!strNum) return undefined;
  const parsedNum = parseInt(strNum);
  return !isNaN(parsedNum) ? parsedNum : undefined;
};
