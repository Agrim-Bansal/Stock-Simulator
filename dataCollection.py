'''
This file is going to create a dataset for the table of stocks. The data with apis is not available in the form i need for free. so i'll manually have to scrap and make this.
This is not used in the project and is only a data scrapping script which has been used to create the dataset for the project.
So, this file can safely be deleted without problems.
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
# def get_data(symbol):
#     url = f'https://finnhub.io/api/v1/stock/profile2?symbol={symbol}'

#     response = requests.get(url, headers={'X-Finnhub-Token': API_KEY})
    

#     data = response.json()
#     return data

def get_data(symbol):
    url = f'https://finnhub.io/api/v1/quote?symbol={symbol}'

    response = requests.get(url, headers={'X-Finnhub-Token': API_KEY})
    
    data = response.json()

    return [data['c'], data['c'] - data['pc']]


symbolList = pd.read_excel('./src/data/allSymbols.xlsx')

symbolInfo = pd.DataFrame(columns=['symbol', 'logoUrl', 'name', 'marketCap', 'volume', 'industry', 'price' ,'change'])
# symbolInfo = pd.read_excel('./symbolInfo.xlsx')


# for symbol in symbolList:
#     try:
#         print(f'Getting data for {symbol}')
#         data = get_data(symbol)
#         newData = {
#             'symbol': symbol,
#             'logoUrl' : data['logo'],
#             'name': data['name'],
#             'marketCap': data['marketCapitalization'],
#             'volume' : data['shareOutstanding'],
#             'industry': data['finnhubIndustry'],
#         }
#         symbolInfo = pd.concat([symbolInfo, pd.DataFrame([newData])], ignore_index=True)
#         time.sleep(1)
#         symbolInfo.to_excel('./symbolInfo.xlsx', index=False)
#     except KeyboardInterrupt:
#         break
#     except Exception as e:
#         print(f'Error in getting data for {symbol} : {e}')
# else:
#     symbolInfo.to_excel('./symbolInfo.xlsx', index=False)
#     print('Data Collection Done!')
    
# print(symbolList['symbol'][2750])



for index, row in symbolList.iterrows():
    try:
        print(f'Getting data for {row["symbol"]}')

        data = get_data(row['symbol'])

        newData = {
            'symbol': row['symbol'],
            'logoUrl' : row['logoUrl'],
            'name': row['name'],
            'marketCap': row['marketCap'],
            'volume' : row['volume'],
            'industry': row['industry'],
            'price': data[0],
            'change': data[1]
        }
        symbolInfo = pd.concat([symbolInfo, pd.DataFrame([newData])], ignore_index=True)
        time.sleep(1)
        symbolInfo.to_excel('./src/data/symbolInfo.xlsx', index=False)
        symbolInfo.to_json('./src/data/symbolInfo.json', orient='records')
    except KeyboardInterrupt:
        break
    except Exception as e:
        print(f'Error in getting data for {row["symbol"]} : {e}')
else:
    symbolInfo.to_excel('./src/data/symbolInfo.xlsx', index=False)
    symbolInfo.to_json('./src/data/symbolInfo.json', orient='records')
    print('Data Collection Done!')
    