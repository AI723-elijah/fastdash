const slideInURL = name => {
    const baseURL = process.env.REACT_APP_SLIDE_IN;
    const imageURL = (`${baseURL}${name}?alt=media`);

    return imageURL;
};

export { slideInURL };