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

symbolInfo = pd.read_excel('./symbolInfo.xlsx')


symbolInfo.to_json('./symbolInfo.json', orient='records')