const documentURL = (name, type) => {
  let baseURL = '';
  if(type === 'CAT') {
    baseURL = process.env.REACT_APP_CATDOCUMENTURL;
  }
  if(type === 'IES') {
    baseURL = process.env.REACT_APP_IESDOCUMENTURL;
  }
  if(type === 'LM79') {
    baseURL = process.env.REACT_APP_LMDOCUMENTURL;
  }
  if(type === 'MAN') {
    baseURL = process.env.REACT_APP_MANDOCUMENTURL;
  }
  if(type === 'SPC') {
    baseURL = process.env.REACT_APP_SPCDOCUMENTURL;
  }
  const documentURL = (`${baseURL}${name}?alt=media`);

  return documentURL;
};

export { documentURL };
