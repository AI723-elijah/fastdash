import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_PUBLISHURL
});

const publish = {
  post: options => async dispatch => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      instance.post(options.url)
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

export { publish };
