import firebase from "firebase/app";
import "firebase/firestore"; // NEW
import "firebase/auth";
import "firebase/storage";
const uuidv4 = require('uuid/v4');

const config = {
  apiKey: "AIzaSyBhik0xm9CdDYcLv4CnMGzwTv41gk6mXUY",
  authDomain: "rent-me-165ca.firebaseapp.com",
  databaseURL: "https://rent-me-165ca.firebaseio.com",
  projectId: "rent-me-165ca",
  storageBucket: "rent-me-165ca.appspot.com",
  messagingSenderId: "621945387574",
  appId: "1:621945387574:web:b081b038375bbe7dc87697"
};

firebase.initializeApp(config);
export const storage = firebase.storage();
export const firestore = firebase.firestore(); // NEW
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const fbprovider = new firebase.auth.FacebookAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithFacebook = () => auth.signInWithPopup(fbprovider);
export const signOut = () => auth.signOut();


export const createUserDocument = async (user, additionalData) => {
  // If there is no user, let's not do this.
  if (!user) return;

  // Get a reference to the location in the Firestore where the user
  // document may or may not exist.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch a document from that location.
  const snapshot = await userRef.get();

  // If there isn't a document for that user. Let's use information
  // that we got from either Google or our sign up form.
  if (!snapshot.exists) {
    console.log(user);
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        uid:user.uid,
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user", console.error);
    }
  }

  // Get the document and return it, since that's what we're
  // likely to want to do next.
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};
export default firebase;