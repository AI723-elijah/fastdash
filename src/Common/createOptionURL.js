const optionURL = name => {
    const baseURL = process.env.REACT_APP_OPTIONURL;
    const iconURL = (`${baseURL}${name}?alt=media`);
  
    return iconURL;
  };
  
  export { optionURL };