import firebase from 'firebase/app';  //base import which gives access to firebase and auth
import 'firebase/firestore'; //we import this for database
import 'firebase/auth'; //for authentication

const config =  {
    apiKey: "AIzaSyDAPhEkuZTSG_dHthO99VQtj4TrP8bVVRA",
    authDomain: "crwn-db-c5780.firebaseapp.com",
    projectId: "crwn-db-c5780",
    storageBucket: "crwn-db-c5780.appspot.com",
    messagingSenderId: "375870887538",
    appId: "1:375870887538:web:e9d33985e0b3d547d194eb",
    measurementId: "G-W181DPY6CC"
};

firebase.initializeApp(config);

export const auth = firebase.auth(); //this method from firebase/auth
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //class from auth library
provider.setCustomParameters({ prompt: 'select_account' }); //always trigger google pop up whenever we use googleauthprovider for authentication & signin
export const signInWithGoogle = () => auth.signInWithPopup(provider); //takes provider class and google popup

export default firebase;