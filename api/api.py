from flask import Flask
from flask import *
from flask_cors import CORS
import os
import cv2
from elasticsearch import Elasticsearch
from werkzeug.utils import secure_filename
import image_to_text
from datetime import datetime
import crop_images
import elasticsearch.helpers
import requests
import json
from flask_restful import Resource,Api,reqparse

es = Elasticsearch()

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'C:/Users/91969/PycharmProjects/learn/lucid/lucid/public'

NODE_NAME = 'book'

class Controller(Resource):
    def __init__(self):
        self.query = parser.parse_args().get("query",None)
        self.baseQuery = {
            "_souirce":[],
            "size":0,
            "min_score":0.5,
            "query":{
                "bool":{
                    "must":[{
                        "match_phrase_prefix":{
                            "name":{
                                "query":"{}".format(self.query)
                            }
                        }
                    }],
                    "filter":[],
                    "should":[],
                    "must_not":[]
                }
            },
            "aggs":{
                "auto_complete":{
                    "terms":{
                        "field":"name.keyword",
                        "order":{
                            "_count":"desc"
                        },
                        "size":25
                    }
                }
            }
        }

    def get(self):
        res = es.search(index=NODE_NAME, size=0, body=self.baseQuery)
        return res

api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument("query",type=str,required=True,help="query parameter is Required")

api.add_resource(Controller,'/autocomplete')


@app.route('/')
def hello_world():
    return ("hello world")

@app.route('/api',methods=['GET'])
def api():
    return{
        'userId':1,
        'title':'LUCID with flask react environment',
        'completed':False
    }
import color_image
import keyword_generation
import books
import booksRec

@app.route('/upload',methods=['POST'])
def upload():
    # uploading books data to elastic search
    # import pandas as pd
    # import numpy as np
    # col1 = ['ISBN','Book-Title']
    # ID = pd.read_csv('C:/Users/91969/PycharmProjects/learn/bookdata/BX-Books.csv', sep=';', error_bad_lines=False, encoding="latin-1",usecols=col1)
    # ids=(ID['ISBN'])
    # names = (ID['Book-Title'])
    # for i,j in zip(ids,names):
    #     es.index(index='book', doc_type='title', id=i, body={'name':j})

    # checking the uploaded data
    # results = es.get(index='book', doc_type='title', id='0002005018')
    # return jsonify(results['_source'])
    

    f = request.files['file']
    ext = f.filename.split('.')[1]
    now = datetime.now()
    dt = now.strftime("%d/%m/%Y %H:%M:%S")
    tem = 'IMAGE'+dt+'.'+ ext
    path = os.path.join(app.config['UPLOAD_FOLDER'],secure_filename(tem))
    f.save(os.path.join(app.config['UPLOAD_FOLDER'],secure_filename(tem)))
    
    t=image_to_text.extract_text(path)  # t[0] => text ; t[1] => summary
    t[2]=crop_images.crop_the_image(path) # t[2] => names if images that are cropped
    t[4]=color_image.color_images(t[2]) # t[3] => the button number that is selected t[4] => colored images names
    t[5] = keyword_generation.generate_keyword(t[1]) # t[5] => keywords that are extracted from summary
    
    store=[]
    for i in t[5]:
        store.append(i[1])
    t[6] = books.search_books(store)
    return (t)

@app.route('/booksRec',methods=['POST'])
def booksRecommender():
    print('request recieved for book recommenders')
    query = request.json['query']
    print(query)
    data=booksRec.recommends(query)
    return (data)

@app.route('/pipe',methods=["GET","POST"])
def pipe():
    print('request recieveed for typehead')
    data = request.json['q']
    print(data)
    payload={}
    headers={}
    url = "http://127.0.0.1:9200/book/_search?q="+str(data)
    response = requests.request('GET',url,headers=headers,data=payload)
    return response.json()

if __name__ == "__main__":
    app.run(debug=True)