const timeString = value => {
  const date = new Date(value);
  const h = parseInt(date.getHours()) < 10 ? `0${date.getHours()}` : date.getHours();
  const m = parseInt(date.getMinutes()) < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${h}:${m}`;
};

export { timeString };