const promotionalLiteratureURL = name => {
    const baseURL = process.env.REACT_APP_PROMOTIONALLITERATUREURL;
    const imageURL = (`${baseURL}${name}?alt=media`);
  
    return imageURL;
  };
  
  export { promotionalLiteratureURL };