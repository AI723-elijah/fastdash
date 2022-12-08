import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  // baseURL: "http://localhost:4040/api/",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

const loading = () => ({ type: "LOADING" });
const select_loading = () => ({ type: "SELECT_LOADING" });
const loading_complete = () => ({ type: "LOADING_COMPLETE" });

const api = {
  get:
    (options, select = null, noLoading = false) =>
    async (dispatch) => {
      if (!noLoading) {
        if (select) {
          dispatch(select_loading());
        } else {
          dispatch(loading());
        }
      }
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        return instance
          .get(options.url)
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
  post:
    (options, params = null) =>
    async (dispatch) => {
      dispatch(loading());
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        instance
          .post(options.url, params)
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
  put:
    (options, params = null, noLoading = false) =>
    async (dispatch) => {
      if (!noLoading) {
        dispatch(loading());
      }
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        instance
          .put(options.url, params)
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
  delete:
    (options, params = null) =>
    async (dispatch) => {
      dispatch(loading());
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        instance
          .delete(options.url, { data: params && params.ids })
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

export { api };
