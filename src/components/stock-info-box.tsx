import TradingViewChart from '@/components/tradingViewChart';
import { stockInfo } from '@/pages/api/stocks';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { addToWatchlist } from '@/lib/firestore';

export default function StockInfoBox({ticker} : {ticker:string}) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [stock, setStock] = useState<{'price': string, 'change percent': string}>();
    const [logo, setLogo] = useState<{name: string, image: string}>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function getStockInfo(){
            const [stock, logo] = await stockInfo(ticker);
            setStock(stock);
            setLogo(logo);
        }

        getStockInfo().then(() => setLoading(false));

        if(ticker==''){
            setIsActive(false);
        }else{
            setIsActive(true);
        }
    },[ticker]);

    async function watchlistAdder(){
        setLoading(true);
        await addToWatchlist(
            {
                ticker: ticker,
                name: logo!.name,
                markedPrice: stock!.price,
                logo: logo!.image

            }
        );
        setLoading(false);
    }

    return (
        <div className={`stock-info-box ${isActive ? 'visible' : 'hidden'} h-screen w-full fixed z-10 flex backdrop-blur-sm left-0`}>
            <div className='flex flex-col w-256 mx-auto my-10 bg-black justify-between p-5 rounded-lg border border-white'>

            {!loading ?
            <>
                <div className='flex flex m-2 items-center w-full justify-center '>
                
                <Image src={logo?.image? logo?.image : '@/app/icon.png'} alt={logo? logo.name : 'image'} width={100} height={10} style={{'width':'auto', 'height':'50px'}}/>
                
                <div className='p-5 m-10'>
                    <div className='text-3xl'>{logo?.name}</div>
                    <div className='text-lg text-gray-500'>({ticker})</div>
                </div>

                <div className='p-5 m-10 text-2xl ml-auto'>    
                    <p>Price: ${stock?.price}</p>
                </div>

            </div>

            <div className='w-full h-96'>
                <TradingViewChart ticker={ticker} key={ticker}/>
            </div>

            <div className='flex justify-evenly w-128 mx-auto'>
                <button className='bg-primary text-primary-foreground rounded-lg p-2 w-36'>Trade</button>
                <button className='bg-accent text-accent-foreground rounded-lg p-2 w-36' onClick={watchlistAdder}>Add to Watchlist</button>
                <button className='bg-destructive text-destructive-foreground rounded-lg p-2 w-36' onClick={()=>setIsActive(false)}>Close</button>
            </div>
            </>
        :
        <div className='loader m-auto'></div>
                
        }

            </div>
        </div>
    )


    
}