const newsURL = name => {
    const baseURL = process.env.REACT_APP_NEWS;
    const imageURL = (`${baseURL}${name}?alt=media`);
  
    return imageURL;
  };
  
  export { newsURL };