"use server";
const apiKey = process.env.ALPHAVANTAGE_API_KEY;
const logoApiKey = process.env.API_NINJA_KEY;


export async function commonStocks() : (Promise<{name: string, symbol: string, price: string, change: string, logo: string}[]>){
    const commonTickerList = ['AAPL', 'NVDA'];
    // const commonTickerList = ['AAPL', 'NVDA', 'TSLA', 'MSFT', 'AMZN', 'GOOG', 'JPM', 'NFLX']
    const stocks = [];


    for(const ticker of commonTickerList){

        const stock = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`
        ).then(res => res.json() as Promise<{['Global Quote']: {'05. price': string, '10. change percent': string}}>);

        const logo = await fetch(
            `https://api.api-ninjas.com/v1/logo?ticker=${ticker}`, 
            {
            headers:{'X-Api-Key': `${logoApiKey}`}
        }).then(res => res.json() as Promise<{name: string, url: string}>);


        stocks.push({
            name: logo.name,
            symbol: ticker,
            price: (stock['Global Quote']['05. price']),
            change: (stock['Global Quote']['10. change percent']),
            logo: logo.url
        });
    }
    return stocks;   
}