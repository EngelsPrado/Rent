import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


  var config = {
    apiKey: "AIzaSyAmtTInkK7m6HFaDYlBD3-4nAyX5i3WQVo",
    authDomain: "rent-me-165ca.firebaseapp.com",
    databaseURL: "https://rent-me-165ca.firebaseio.com",
    projectId: "rent-me-165ca",
    storageBucket: "rent-me-165ca.appspot.com",
    messagingSenderId: "621945387574"
  };
  //firebase.initializeApp(config);
  
  

  firebase.initializeApp(config)
  firebase.firestore().settings({timestampsInSnapshots:true});
  export default firebase 