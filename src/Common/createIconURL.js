const iconURL = name => {
  const baseURL = process.env.REACT_APP_ICONURL;
  const iconURL = (`${baseURL}${name}?alt=media`);

  return iconURL;
};

export { iconURL };