import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCbr9nxgehT3SFr51Evt0Mic7-P2EsVdo8',
  authDomain: 'crwn-db-82436.firebaseapp.com',
  databaseURL: 'https://crwn-db-82436.firebaseio.com',
  projectId: 'crwn-db-82436',
  storageBucket: 'crwn-db-82436.appspot.com',
  messagingSenderId: '419112708385',
  appId: '1:419112708385:web:26460224ec982343cef660',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
