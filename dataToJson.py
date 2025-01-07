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

symbolInfo = pd.read_excel('./symbolInfo.xlsx')


symbolInfo.to_json('./symbolInfo.json', orient='records')