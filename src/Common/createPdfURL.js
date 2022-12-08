const pdfDocURL = (name) => {
    let baseURL = '';
      baseURL = process.env.REACT_APP_PDFDOCUMENTURL;
    const pdfDoc = (`${baseURL}${name}?alt=media`);
  
    return pdfDoc;
  };

  const pdfImageURL = img => {
    const baseURL = 'https://firebasestorage.googleapis.com/v0/b/westgatedash-d1341.appspot.com/o/pdfImages%2F'
    //process.env.REACT_APP_PDF;
    const pdfImage = (`${baseURL}${img}?alt=media`);

    return pdfImage
  }
  
  export { pdfDocURL, pdfImageURL };
  