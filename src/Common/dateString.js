const dateString = value => {
  const date = new Date(value);
  const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const m = parseInt(date.getMonth()) + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const y = date.getFullYear();

  return `${m}/${d}/${y}`;
};

export { dateString };