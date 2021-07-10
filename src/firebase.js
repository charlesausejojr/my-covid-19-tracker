import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDBKIHSTd-V2DG50duYERnmweJxO2gj7Tk",
    authDomain: "my-covid19-tracker-411e6.firebaseapp.com",
    databaseURL: "https://my-covid19-tracker-411e6.firebaseio.com",
    projectId: "my-covid19-tracker-411e6",
    storageBucket: "my-covid19-tracker-411e6.appspot.com",
    messagingSenderId: "367081448818",
    appId: "1:367081448818:web:7255d1310deb9cbec969eb",
    measurementId: "G-STE8SNEBY6"
  }

  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;