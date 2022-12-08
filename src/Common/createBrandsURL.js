const brandsURL = name => {
    const baseURL = process.env.REACT_APP_BRANDSURL;
    const imageURL = (`${baseURL}${name}?alt=media`);
  
    return imageURL;
  };
  
  export { brandsURL };