// import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import type { NextApiRequest, NextApiResponse } from 'next'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDDnGKWTZRKMn1z6c1oYdNTUGWRGUWuss",
    authDomain: "stock-simulator-603dc.firebaseapp.com",
    projectId: "stock-simulator-603dc",
    storageBucket: "stock-simulator-603dc.firebasestorage.app",
    messagingSenderId: "441894120881",
    appId: "1:441894120881:web:44d3ce880ed779fffda190"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export async function login(email:string, password:string){

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        return ({user : userCredential.user});
    })
    .catch((error) => {
        const errorMessage = error.message;
        return ({error: errorMessage});
    });
}

export async function signup(email:string, password:string){

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        return {status:200, user : userCredential.user};
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {status:errorCode,error: errorMessage};
    });

}

export async function googleLogin(){

    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    signInWithPopup(auth, provider)
    .then((result) => {

        return({status:200, user: result.user});

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        return({status:errorCode, error:errorMessage});
      });
    
    
}