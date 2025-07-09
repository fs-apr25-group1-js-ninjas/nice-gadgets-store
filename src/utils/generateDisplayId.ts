export const generateDisplayId = (): string => {
  return String(Date.now()).slice(-6);
};
