const videoURL = vid => {
  const baseURL = process.env.REACT_APP_PRODUCTIMAGEURL;
  let videoURL = (`${baseURL}${vid}`);
  videoURL = `${videoURL}?alt=media`;

  return videoURL;
};

const imageURL = img => {
  const baseURL = process.env.REACT_APP_PRODUCTIMAGEURL;
  let imageURL = (`${baseURL}${img}`);
  imageURL = `${imageURL}?alt=media`;

  return imageURL;
};

const bannerURL = img => {
  const baseURL = process.env.REACT_APP_BANNER;
  return `${baseURL}${img}?alt=media`;
}

const sliderURL = img => {
  const baseURL = process.env.REACT_APP_SLIDER;
  return `${baseURL}${img}?alt=media`;
}

export { videoURL, imageURL, bannerURL, sliderURL };
