// import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, sendEmailVerification, reauthenticateWithPopup} from 'firebase/auth';
import {initializeApp} from 'firebase/app';

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

export async function login(email:string, password:string) : Promise<string> {

    const result = await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        return ('ok');
    })
    .catch((error) => {
        return (error.code);
    });

    return result;

}

export async function signup(email:string, password:string, name:string) : Promise<string>{

    const result = createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        sendEmailVerification(auth.currentUser!);
        updateProfile(auth.currentUser!, {displayName : name});
        return ('ok');
    })
    .catch((error) => {
        return (error.code);
    });

    return result;

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

export async function logout(){
    signOut(auth).then(() => {
        return({status:200});
      }).catch((error) => {
        return({status:500, error:error});
      });
}

export async function reauth(){
    const user = auth.currentUser;

    if(user?.providerId == 'google.com'){
        const provider = new GoogleAuthProvider();

        reauthenticateWithPopup(user, provider)
        .then(() => {
            return({status:200});
        })
        .catch((error) => {
            return({status:500, error:error});
        });
    }
    
}