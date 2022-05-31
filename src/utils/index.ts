export const checkNumber = (num: number) => {
  if (!!isNaN(num)) {
    return "error.main";
  }
  if (num.toString().includes(".")) {
    return "purple";
  }
  return "success.main";
};
