import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_CLOUDURL
});

const cloudAPI = {
  post: (options, params = null) => async dispatch => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      instance.post(options.url, params)
        .then(res => {
          resolve(dispatch({
            type: success,
            payload: res.data
          }))
        })
        .catch(err => {
          reject(dispatch({
            type: failure,
            payload: err
          }))
        })
    }

    return new Promise(promise);
  }
}

export { cloudAPI };
