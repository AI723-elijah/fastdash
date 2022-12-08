const videoURL = vid => {
    const baseURL = process.env.REACT_APP_PRODUCTIMAGEURL;
    let videoURL = (`${baseURL}${vid}`);
    videoURL = `${videoURL}?alt=media`;
  
    return videoURL;
  };

export { videoURL };