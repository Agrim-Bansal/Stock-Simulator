'''
This file is going to create a dataset for the table of stocks. The data with apis is not available in the form i need for free. so i'll manually have to scrap and make this.
'''

# Importing the required libraries
import requests
import pandas as pd
import os
from dotenv import load_dotenv
import time

load_dotenv('.env')
API_KEY = os.environ.get('FINNHUB_API_KEY')

# Function to get the data from the api
def get_data(symbol):
    url = f'https://finnhub.io/api/v1/stock/profile2?symbol={symbol}'

    response = requests.get(url, headers={'X-Finnhub-Token': API_KEY})
    

    data = response.json()
    return data

symbolList = pd.read_excel('./allSymbols.xlsx')

# symbolInfo = pd.DataFrame(columns=['symbol', 'logoUrl', 'name', 'marketCap', 'volume', 'industry'])
symbolInfo = pd.read_excel('./symbolInfo.xlsx')


for symbol in symbolList['symbol'][2750:]:
    try:
        print(f'Getting data for {symbol}')
        data = get_data(symbol)
        newData = {
            'symbol': symbol,
            'logoUrl' : data['logo'],
            'name': data['name'],
            'marketCap': data['marketCapitalization'],
            'volume' : data['shareOutstanding'],
            'industry': data['finnhubIndustry'],
        }
        symbolInfo = pd.concat([symbolInfo, pd.DataFrame([newData])], ignore_index=True)
        time.sleep(1)
        symbolInfo.to_excel('./symbolInfo.xlsx', index=False)
    except KeyboardInterrupt:
        break
    except Exception as e:
        print(f'Error in getting data for {symbol} : {e}')
else:
    symbolInfo.to_excel('./symbolInfo.xlsx', index=False)
    print('Data Collection Done!')
    
# print(symbolList['symbol'][2750])
