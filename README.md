# Stock Simulator
Stock market is a huge opportunity but equally risky and daunting. Having knowledge of the stock market is essential to make informed decisions. However, gaining that is as difficult as it is intimidating. All of the fancy terms and jargon have obscured the simple fact - it is a market and you want to maximise your profits buy buying low and selling high.
I believe the best way to learn about something is to experience it firsthand and keeping that in view - I have built this platform which allows a user to simulate the stock market as it happens - live and most importantly completely risk-free. The platform allows a user to buys and sell stocks. Also short selling of stocks is allowed. The  portfolio can be viewed and trade-history is maintained. The user can look at market trends, stock prices and all other information in elegant, easy to read charts. The user can also add stocks to their watchlist and keep an eye on them.

The thing to note is that this is absolutely free and no real money is involved. The users get $100k virtual money which they use to buy stocks and see how they perform. This is a great way to learn about the stock market and get a feel of how it works.

Note: This platform is currently limited to stocks only and a lot more occurs in the actual stock market which this platform ignores for the sake of a simple minimal introduction to the heart of the market.

In the future, I intend to bring cryptocurrencies to the platform as well.

Visit the platform : [Stock Simulator](https://stock-simulator-beta.vercel.app/)

Make an account or use the demo : <u> demo@example.com; password: 12345678 </u>

## Features include:
- User Accounts 
    - Secure authentication
    - Storage of history and portfolio
    - Easy and secure delete account feature
- Stock trading
    - Buy and sell stocks
    - Short sell stocks
    - View portfolio
- Interactive stock chart
    - View stock prices
    - View trends
- Interface
    - Intuitive and easy to use
    - Minimalist and devoid of all jargon
- Built with NextJS for a fast and responsive experience

## Future development include: 

- Section for resources to learn further about features of the market.
- Cryptocurrency trading
- A what if section where users can simulate having made certain trades in the past.

## How to use the platform:

1. Visit the platform : [Stock Simulator](https://stock-simulator-beta.vercel.app/)
2. Create an account / Use the demo account
    - Click on sign up for creating an account
    - Or use continue with Google
    - Demo account credentials : ```username:demo@example.com; password: 12345678```
    - Log In
3. Go the Portfolio (/dashboard)
    - Here, you can look at your account value, holdings, trade history and market trends. You can use embedded links for navigation.
4. Go to stock lookup (/research)
    - Here, you will find popular stocks and a search bar. You can click on a stock to lookup more information about it and access its price and trend chart.
    - From this dialog box, you'll be able to add the stock to watchlist or access it on the trading page.
5. Go to Trade Page (/trade)
    - This is the page where you actually make trades. Search for a stock in the search bar and select it. The page will give you the overview for the share. For more information, go to the stock lookup option.
    - You have 4 actions available in trading as of now - Buy-Sell and Short-Buy to Cover.
    - Buying and selling are straightforward, you can enter the number of shares you want to buy or sell and the platform will calculate the total amount for you and ask for confirmation. Obviously, you cannot sell shares you don't own - although there is a way to do exactly that. 
    - The way is short selling a stock. A stock is short sold when we think that it will go down in price. In a crude way, you borrow shares of that stock and sell them at current market price. Then you buy back the shares at some later time at the then price. So, if the stock went down, you sell higher and buy lower, you make a profit margin. If the price were to go up, we'd have to buy them at a higher price and end up losing money. Most shorts are allowed intraday, but here you can keep them for as long as you want. Additionally, since shorts are actually borrowing the shares, there are some restrictions on their trade - like you need to have money >= 150% of the stock value in your account. Although this seems unkind, it is necessary to guarantee fulfillment in case of loss. And since short selling is mostly the only way to make money from lowering prices.
    - Making a trade is simple, select the stock, what you want to do and how many stocks you want. The platform will calculate the total amount and ask for confirmation.
    - El viola, you've made a trade albeit virtual but you've dipped your feet in the ocean called the stock market.
6. Watchlist (/watchlist)
    - This is the page where you can pin out some stocks and observe them with convenience. Add a stock to the watchlist from the stock lookup page and it will show up here. The watchlist shows you the price at which you marked a stock and the price it is currently trading at. It also gives you option to remove a stock from the list or go to the trading page for that stock.

## Some difference from the actual stock market. 
- The platform is limited to stocks only which goes to say that, as of now, the platform does not support futures and options trading which are derivatives built upon stocks.
- The platform executes trades at market price while a bunch of options are available in the actual market. You can make limit trades where a set percentage or limit of stock can be set.
- There is no actual trading involved that is to say that virtual stocks are being created with each trade instead of changing hands as is done in the stock market. It is very possible that, under some conditions, no one is buying or selling a stock at market price in the real market.
- The platform works 24x7 whereas the market is closed on weekends and opens only 9:30 AM to 4:00 PM EST. Also it has additional holidays. In case of trades made when the market is closed, the trade will be executed at the closing price of the stock on the most recent trading day.


## Technologies used and attributions:
- Built with ReactJS and NextJS
- FirebaseAuth for user authentication
- Firebase Firestore for database
- API Ninja and FinnHub for stock data
- shadcn/ui for sidebar and some other components
- TradingView for stock charts
- TailwindCSS for styling
- Vercel for deployment

## Journey and Challenges:
This is a bit of a personal note and feel free to skip this. I have been thinking about this project for a while now - mostly because I needed something like this which introduced me to the stock market and be actually able to invest. The has been a great learning experience- not only did I learn about the technologies I used, it also helped further my knowledge about the stock market.


<details>

<summary>Read about the journey</summary>

I faced many challenges along the way but all were overcome. 
The biggest challenge was definitely getting accustomed with typescript as I have been building stuff only in JS and Python for quite a long time now. Getting the stock data and to display it in a way that is easy to understand was no easy feat. I couldn't really find an API for historical data with free quota which would suit the projects need. Then displaying that data in an interactive way was proving extremely difficult but I stumbled upon TradingView by total chance and that completely saved me - though it did come with its own share of troubles. 

With the UI, I thought me not being a designer should use some ready made components which would be a help and I decided on ui.shadcn.com which did make some part of my project look better but gave me headaches. I realised then how difficult it was to work with someone else's components. So I kinda reverted back to building things from ground up. which had its own share of challenges with the UI/UX and the design of the platform but I have learnt a lot from them and I am happy with the way it has turned out.

This project was really big for me and so, I decided to integrate authenticaion and users in this. This was my first time dealing with secure auth. To get the user authentication right and to store the data in a way that is secure and easy to access did have me rummaging through my head and then I found Firebase for this and it has been a great help. I also worked with reset password, email, delete account, changing name and the like. Figuring out auth was quite a milestone and I thing, very important. Working with auth will definitely open some new doors i think.

I made a table of popular stocks and had to collect data for that because no sane api would offer that much data for free and store that personally. I did collect a lot - a whole lot - of tickers data - logo, name, prices, and what not. Then I did have to reduce that down bcz the site started hanging 'cause of the huge number of images.

Figuring out the platform flow and the mechanism for trading was a challenge in and of itself because I did not want to have a dedicated backend working all the time just burning through money and resources. I did figure out a nice way and am quite proud of it. Make sell and buy trades did come a bit easier but the short selling and cover buying was a huge headache and I had to implement an independent flow for them.

Anticipating flaws - bugs and possible errors was a challenge but - I can do this all day (catch the reference pls ;) and well, I did do that all day. I have tried to make the platform as bug free as possible but I am sure there are some bugs and I am ready to tackle them as they come. 

If you had the patience to read this, please know that you are deeply appreciated. 

</details>


I am happy with the way the project has turned out and I am excited to see where it goes from here. I have a lot of plans for this project and I hope to see them through. 


## TL;DR:
This project has been a great learning experience and I am happy with the way it has turned out. I have learnt a lot about the stock market and the technologies I used. I am excited to see where this project goes from here and I am looking forward to working on it more. I hope this project helps people learn about the stock market and get a feel for it. 
Any feedback is appreciated and I am open to suggestions.