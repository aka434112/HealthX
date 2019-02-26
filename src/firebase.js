import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCcSwsZabYJawSPIAc6k83ooBxaYMj3-78",
  authDomain: "healthx-3e74e.firebaseapp.com",
  databaseURL: "https://healthx-3e74e.firebaseio.com",
  projectId: "healthx-3e74e",
  storageBucket: "healthx-3e74e.appspot.com",
  messagingSenderId: "569200110487"
};

firebase.initializeApp(config)

export default firebase
