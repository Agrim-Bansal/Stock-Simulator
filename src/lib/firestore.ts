
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { stockInfo } from '@/pages/api/stocks';
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
    const docSnap = await getDocs(collection(db, `${uid}-watchlist`));
    const data = docSnap.docs.map(doc => doc.data());
    return data;
}

export async function addToWatchlist(stock : {ticker: string, name: string, markedPrice: string, logo: string}){
    await setDoc(doc(db, `${auth.currentUser?.uid}-watchlist`, stock.ticker, ), stock); 
}

export async function removeFromWatchlist(ticker: string){
    // const docSnap = await getDocs(collection(db, `${auth.currentUser?.uid}/watchlist`));
    await deleteDoc(doc(db, `${auth.currentUser?.uid}-watchlist`, ticker));  
}

export async function makeTrade({action, quantity, ticker} : {action: string, quantity: number, ticker: string}){
    const uid = auth.currentUser?.uid;
    const trade = {
        action,
        quantity,
        ticker,
        timestamp: Date.now()
    }
    setDoc(doc(db, `${uid}-trades/${Date.now()}`), trade);



    const portfolio = await getPortfolio();
    
    const tickerPrice = (await stockInfo(ticker))[0].price;
    // const tickerPrice = '0';
    if (action == 'buy'){
        setDoc(doc(db, `portfolios/${uid}`),
        {
        money: parseFloat(portfolio?.money) - (parseFloat(tickerPrice) *quantity),
        stocks: {
            ...portfolio?.stocks,
            [ticker]: (portfolio?.stocks[ticker] || 0) + quantity
        }
    }   )
    }else if (action =='sell'){
        setDoc(doc(db, `portfolios/${uid}`), 
        {
            money : parseFloat(portfolio?.money) + (parseFloat(tickerPrice) * quantity),
            stocks : {
                ...portfolio?.stocks,
                [ticker]: (portfolio?.stocks[ticker] || 0) - quantity
            }
        }
    )
    }

}

export async function getPortfolio(){
    const uid = auth.currentUser?.uid;
    const docSnap = await getDoc(doc(db, `portfolios/${uid}`));

    if (!docSnap.exists()){
        setDoc(doc(db, `portfolios/${uid}`),
        {
            money: 100000,
            stocks: {}
        })
        return({money:100000, stocks:{}})
    }

    const data = docSnap.data();

    return data;
}