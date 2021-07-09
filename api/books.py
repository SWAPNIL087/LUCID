import yake
import os
import requests as requests
import urllib
import urllib.request as url
from PIL import Image
import numpy as np
import cv2 
def search_books(keywords):
    res=[]
    print(keywords,'-------------note-------')
    for i in range(min(len(keywords),5)):

        query = keywords[i]
        main_url = 'https://www.googleapis.com/books/v1/volumes?q='
        main_url+= query
        main_url+='&download=epub&key=AIzaSyDG67AiOnGLbba_7Oeg2IL6c-eMr24ZnEQ'
        r = requests.get(main_url)
        data = r.json()
        if(data['items']):
            res.append(data['items'][1])
    return res