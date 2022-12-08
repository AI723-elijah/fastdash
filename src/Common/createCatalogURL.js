const catalogURL = name => {
    const baseURL = process.env.REACT_APP_CATALOGURL;
    const imageURL = (`${baseURL}${name}?alt=media`);
  
    return imageURL;
  };
  
  export { catalogURL };