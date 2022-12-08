import axios from "axios";

const portalInstance = axios.create({
  baseURL: "https://us-central1-westgate-portal-api.cloudfunctions.net/"
});

const loading = () => ({ type: "LOADING" });
const select_loading = () => ({ type: "SELECT_LOADING" });
const loading_complete = () => ({ type: "LOADING_COMPLETE" });

const portalApi = {
  get: (options, select = null, noLoading = false) => async (dispatch) => {
    if (!noLoading) {
      if (select) {
        dispatch(select_loading());
      } else {        
        dispatch(loading());
      }
        } 
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      return portalInstance
        .get(options.url, options.headers)
        .then((res) => {
          if (!noLoading) {
            dispatch(loading_complete());
          }
          resolve(
            dispatch({
              type: success,
              payload: res.data,
            })
          );
        })
        .catch((err) => {
          if (!noLoading) {
            dispatch(loading_complete());
          }
          reject(
            dispatch({
              type: failure,
              payload: err,
            })
          );
        });
    };

    return new Promise(promise);
  },
  post: (options, params = null) => async (dispatch) => {
    dispatch(loading());
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
        portalInstance 
        .post(options.url, options.body, options.headers, params)
        .then((res) => {
          dispatch(loading_complete());
          resolve(
            dispatch({
              type: success,
              payload: res.data,
            })
          );
        })
        .catch((err) => {
          dispatch(loading_complete());
          reject(
            dispatch({
              type: failure,
              payload: err,
            })
          );
        });
    };

    return new Promise(promise);
  },
  put: (options, params = null, noLoading = false) => async (dispatch) => {
    if (!noLoading) {
      dispatch(loading());
    }
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      return portalInstance
        .put(options.url, options.body, params, options.headers)
        .then((res) => {
          if (!noLoading) {
            dispatch(loading_complete());
          }
          resolve(
            dispatch({
              type: success,
              payload: res.data,
            })
          );
        })
        .catch((err) => {
          if (!noLoading) {
            dispatch(loading_complete());
          }
          reject(
            dispatch({
              type: failure,
              payload: err,
            })
          );
        });
    };

    return new Promise(promise);
  },
  delete: (options, noLoading = false) => async (dispatch) => {
    if (!noLoading) {
      dispatch(loading());
    }
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
        portalInstance
        .delete(options.url, options.headers)
        .then((res) => {
          dispatch(loading_complete());
          resolve(
            dispatch({
              type: success,
              payload: res.data,
            })
          );
        })
        .catch((err) => {
          dispatch(loading_complete());
          reject(
            dispatch({
              type: failure,
              payload: err,
            })
          );
        });
    };

    return new Promise(promise);
  },
};

export { portalApi };
