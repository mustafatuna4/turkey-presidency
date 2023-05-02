import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//process.env.REACT_APP_KEY,
const firebaseConfig = {
  apiKey: "AIzaSyCYGQ-xg0SF8KS6X9jjdDvXD02M0U8ICqE",

  authDomain: "casestudy-27fd2.firebaseapp.com",

  projectId: "casestudy-27fd2",

  storageBucket: "casestudy-27fd2.appspot.com",

  messagingSenderId: "850744404859",

  appId: "1:850744404859:web:1b896df08ef303eb8aebde",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
