export const truncate = (str, n) => {
  const date = new Date(str);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate.length > n
    ? formattedDate.substr(0, n - 1)
    : formattedDate;
};
