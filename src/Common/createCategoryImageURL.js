const categoryImageURL = name => {
  const baseURL = process.env.REACT_APP_CATEGORYIMAGE;
  const categoryImageURL = (`${baseURL}${name}?alt=media`);

  return categoryImageURL;
};

export { categoryImageURL };