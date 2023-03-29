export const getFormattedDateForDBUpdate = (date: Date) => {
  const newDate = new Date(date);
  const dateString =
    newDate.getFullYear() +
    '-' +
    (newDate.getMonth() + 1) +
    '-' +
    newDate.getDate() +
    ' 23:59:59';
  return new Date(dateString);
};

export const getYearsDiff = (dt1: Date, dt2: Date) => {
  let date1 = new Date(dt1);
  let date2 = new Date(dt2);
  let yearsDiff = date2.getFullYear() - date1.getFullYear();
  return yearsDiff;
};

export const toUpperCase = (s: string) => {
  return s.toUpperCase();
};

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export const getStringInfo = (arg: String): stringInfo => {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
};

export const WORK_TYPE_PART_TIME = 2;
export const CONTRACT_TYPE_CONTRACT = 2;
