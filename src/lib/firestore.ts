
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

export async function makeTrade({action, quantity, ticker, price} : {action: string, quantity: number, ticker: string, price: number}){
    const uid = auth.currentUser?.uid;
    const trade = {
        action,
        quantity,
        ticker,
        timestamp: Date.now(),
        price
    }
    setDoc(doc(db, `${uid}-trades/${Date.now()}`), trade);



    const portfolio = await getPortfolio();
    
    const tickerPrice = (await stockInfo(ticker))[0].price;
    // const tickerPrice = '0';
    if (action == 'buy'){
        setDoc(doc(db, `portfolios/${uid}`),
        {
        money: (portfolio?.money) - (parseFloat(tickerPrice) *quantity),
        stocks: {
            ...portfolio?.stocks,
            [ticker]: (portfolio?.stocks[ticker] || 0) + quantity
        }
    }   )
    }else if (action =='sell'){
        setDoc(doc(db, `portfolios/${uid}`), 
        {
            money : (portfolio?.money) + (parseFloat(tickerPrice) * quantity),
            stocks : {
                ...portfolio?.stocks,
                [ticker]: (portfolio?.stocks[ticker] || 0) - quantity
            }
        }
    )
    }else if(action == 'short'){
        const shorts = await getShorts();

        if (shorts.some(short => short.ticker == ticker)){
            const short = shorts.find(short => short.ticker == ticker);
            const newAvgPrice = (short!.price * short!.quantity + price*quantity) / (short!.quantity + quantity);

            setDoc(doc(db, `${uid}-shorts/${ticker}`),{
                ticker : ticker,
                quantity : shorts.find(short => short.ticker == ticker)!.quantity + quantity,
                price : newAvgPrice
            }
        )
        }else{
            setDoc(doc(db, `${uid}-shorts/${ticker}`),{
                ticker : ticker,
                quantity : quantity,
                price : price,
            })
        }
    }else if(action == 'cover'){
        const shorts = await getShorts();

        const short = shorts.find(short => short.ticker == ticker);
        
        if (short!.quantity == quantity){
            deleteDoc(doc(db, `${uid}-shorts/${ticker}`));
        }else{
            setDoc(doc(db, `${uid}-shorts/${ticker}`),{
                ticker : ticker,
                quantity : short!.quantity - quantity ,
                price : price
            }
        )
        }

        setDoc(doc(db, `portfolios/${uid}`), 
        {
            money : (portfolio?.money) - (parseFloat(tickerPrice) * quantity) + (short!.price*quantity),
            stocks : portfolio.stocks,
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

    const data = docSnap.data() as {money: number, stocks: {[key: string]: number}};

    return data;
}


export async function getTrades(){
    const uid = auth.currentUser?.uid;
    const docSnap = await getDocs(collection(db, `${uid}-trades`));
    const data = docSnap.docs.map(doc => doc.data()) as {action: string, quantity: number, ticker: string, timestamp: number, price: number}[];
    return data.sort((a,b) => b.timestamp - a.timestamp);
}

export async function getHoldings(){
    const portfolio = await getPortfolio();

    let holdings : {ticker:string, quantity:number, price:number}[] = [];

    for (let i =0; i < Object.keys(portfolio.stocks).length; i++){
        const stocks = portfolio.stocks[Object.keys(portfolio.stocks)[i]];
        const price = (await stockInfo(Object.keys(portfolio.stocks)[i]))[0].price;

        holdings = [...holdings, {ticker: Object.keys(portfolio.stocks)[i], quantity: stocks, price: parseFloat(price)}];
    }

    return holdings;
}


export async function getShorts(){
    const uid = auth.currentUser?.uid;
    const docSnap = await getDocs(collection(db, `${uid}-shorts`));
    console.log(docSnap.docs);
    const data = docSnap.docs.map(doc => doc.data()) as {ticker:string, quantity:number, price:number}[];
    console.log(data);
    return data;
    }

export async function getShort(ticker: string){
    const uid = auth.currentUser?.uid;
    const docSnap = await getDoc(doc(db, `${uid}-shorts/${ticker}`));
    return docSnap.data();
}


export async function getShortsWithPrice(){
    const shorts = await getShorts();
    const shortsWithPrices : {ticker:string, quantity:number, price:number, newPrice:number}[] = [];
    for (let i=0; i< shorts.length; i++){
        const short = shorts[i];
        const price = (await stockInfo(short.ticker))[0].price;
        shortsWithPrices[i] = {...short, newPrice: parseFloat(price)};
    }

    return shortsWithPrices;
}

export async function deleteUserData(uid:string){
    deleteDoc(doc(db, `portfolios/${uid}`));
    deleteDoc(doc(db, `${uid}-watchlist`));
    deleteDoc(doc(db, `${uid}-trades`));
    deleteDoc(doc(db, `${uid}-shorts`));
}