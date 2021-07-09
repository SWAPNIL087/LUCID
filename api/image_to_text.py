from threading import Thread
import sys
import numpy as np
import pytesseract
import nltk
import cv2
import pickle
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import networkx as nx
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
import summary
def extract_text(imgPath):
    # img = cv2.imread('../public/picture1.jpg')
    img = cv2.imread(imgPath)
    img = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    adaptive_threshold = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,85,11)
    config = "--psm 3"
    text = pytesseract.image_to_string(adaptive_threshold,config=config)
    sumry = summary.generate_summary(text)
    ans = {}
    ans[0] = sumry
    ans[1] = text
    return (ans)