import yake
import os
import requests as requests
import urllib
import urllib.request as url
from PIL import Image
import numpy as np
import cv2 
def search_images(query,idx):
    main_url = 'https://api.unsplash.com/search/photos?query='
    main_url+=query
    main_url+='&page=1&perpage=30&client_id=6N0foFHDU8lmpK68-C9dX8fWFVuVZey1B4T37BFuO1E'
    r = requests.get(main_url)
    
    if(r):
        data = r.json()
        for i in range(1,2):
            if(i<(data['total'])):
                return data['results'][i]['urls']['regular']
            else:
                break
    return None

def generate_keyword(text):
    
    kw_extractor = yake.KeywordExtractor()
    language = "en"
    max_ngram_size = 3
    deduplication_threshold = 0.9
    numOfKeywords = 20
    

    custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold,
                                                 top=numOfKeywords, features=None)
    res=[]
    keywords = custom_kw_extractor.extract_keywords(text)
    idx=0
    check=0
    for kw in keywords:
        check+=1
        idx+=1
        tem=(search_images(kw[0],idx))
        res.append([tem,kw[0]])
    return res