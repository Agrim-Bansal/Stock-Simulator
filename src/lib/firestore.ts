
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
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


const db = getFirestore(app);
const auth = getAuth(app);

export async function getWatchlist(){

    const uid = auth.currentUser?.uid;
    console.log(uid);
    const docSnap = await getDocs(collection(db, `${uid}-watchlist`));
    const data = docSnap.docs.map(doc => doc.data());
    console.log(data);
    return data;

}


export async function addToWatchlist(stock : {ticker: string, name: string, markingPrice: string, logo: string}){
    await setDoc(doc(db, `${auth.currentUser?.uid}-watchlist`, stock.ticker, ), stock); 
}

export async function removeFromWatchlist(ticker: string){
    // const docSnap = await getDocs(collection(db, `${auth.currentUser?.uid}/watchlist`));
    await deleteDoc(doc(db, `${auth.currentUser?.uid}-watchlist`, ticker));  
}