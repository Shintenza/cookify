import config from "../config/config";

export const getImagePath = (fileName: string) => {
  const prefix = config.prefix === "/" ? "" : `/${config.prefix}`;
  return `${prefix}/uploads/${fileName}`;
};
