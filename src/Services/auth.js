import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from '../config';
firebase.initializeApp(config);

const AUTH = firebase.auth();
const store = firebase.firestore();

const loading = () => ({ type: 'LOADING' });
const loading_complete = () => ({ type: 'LOADING_COMPLETE' });

const authorization = {
  login: (options) => async dispatch => {
    dispatch(loading());
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      return AUTH.signInWithEmailAndPassword(options.email, options.password)
        .then(async (user) => {
          let snapshot = await store.collection('users').doc(user.user.uid).get()
          let cUser = snapshot.data() || {}
          if (cUser && cUser.status === 'Active') {
            dispatch(loading_complete());
            localStorage.setItem('userEmail', user && user.user && user.user.email);
            localStorage.setItem('userRole', cUser && cUser.role);
            localStorage.setItem('newUser', cUser && cUser.new);
            resolve(dispatch({
              type: success,
              payload: user && user.user
            }))
          }
          else {
            dispatch(loading_complete());
            reject(dispatch({
              type: failure,
              payload: 'Sorry! Your account has been deactivated.'
            }))
          }

        })
        .catch(err => {
          dispatch(loading_complete());
          reject(dispatch({
            type: failure,
            payload: err.message
          }))
        });
    }

    dispatch(loading_complete());
    return new Promise(promise);
  },
  changePassword: options => async dispatch => {
    dispatch(loading());
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      let { currentPassword, newPassword } = options;
      let user = AUTH.currentUser;
      var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      return user.reauthenticateWithCredential(cred)
        .then(() => {
          let user = AUTH.currentUser;
          user.updatePassword(newPassword)
            .then(async () => {
              await store.collection("users").doc(user && user.uid).update({ new: false })
              let snapshot = await store.collection("users").doc(user && user.uid).get()
              let currentUser = snapshot.data() || {}
              dispatch(loading_complete());
              localStorage.setItem('newUser', false);
              resolve(dispatch({
                type: success,
                payload: currentUser
              }))
            })
            .catch((error) => {
              dispatch(loading_complete());
              reject(dispatch({
                type: failure,
                payload: error.message
              }))
            });
        })
        .catch((err) => {
          dispatch(loading_complete());
          reject(dispatch({
            type: failure,
            payload: 'Sorry! Your current password is invalid'
          }))
        });
    }

    return new Promise(promise);
  },
  logout: () => async dispatch => {
    dispatch(loading());
    const promise = (resolve, reject) => {
      AUTH.signOut()
        .then(res => {
          dispatch(loading_complete());
          localStorage.clear('userEmail');
          localStorage.clear('userRole');
          localStorage.clear('userToken');
          resolve(res);
        })
        .catch(err => {
          dispatch(loading_complete);
          reject(err);
        });
    }

    return new Promise(promise);
  },
  verifyPDF: options => async dispatch => {
    dispatch(loading());
    const [success, failure] = options.types;
    let { password } = options;
    const promise = (resolve, reject) => {
      let pdfs = [];
      return store.collection('pdfs').where('password', '==', password).get()
        .then(async (res) => {
          // eslint-disable-next-line
          for (let doc of res.docs) {
            pdfs.push(doc.data())
          }

          dispatch(loading_complete());
          resolve(dispatch({
            type: success,
            payload: pdfs.length > 0 && true
          }))
        })
        .catch(err => {
          dispatch(loading_complete());
          reject(dispatch({
            type: failure,
            payload: err.message
          }))
        });
    }

    return new Promise(promise);
  },
  changPDFPassword: options => async dispatch => {
    dispatch(loading());
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      let { currentPassword, newPassword } = options;
      let pdfs = [];
      return store.collection('pdfs').where('password', '==', currentPassword).get()
        .then(async (res) => {
          // eslint-disable-next-line
          for (let doc of res.docs) {
            pdfs.push(doc.id)
          }
          if (pdfs.length > 0) {
            await store.collection("pdfs").doc(pdfs && pdfs[0]).update({ password: newPassword })
            let snap = await store.collection("pdfs").doc(pdfs && pdfs[0]).get()
            let currentUser = snap.data() || {}
            dispatch(loading_complete());
            resolve(dispatch({
              type: success,
              payload: currentUser
            }))
          }
          else {
            dispatch(loading_complete());
            reject(dispatch({
              type: failure,
              payload: 'Sorry! Your current password is invalid.'
            }))
          }
        })
        .catch((err) => {
          dispatch(loading_complete());
          reject(dispatch({
            type: failure,
            payload: 'Sorry! Your current password is invalid.'
          }))
        });
    }

    return new Promise(promise);
  }
}

export { authorization };
