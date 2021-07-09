from flask import Flask
from flask import *
from flask_cors import CORS
import os
import cv2
from werkzeug.utils import secure_filename
app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'C:/Users/91969/PycharmProjects/learn/lucid/lucid/public'

import image_to_text
from datetime import datetime
import crop_images

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

if __name__ == "__main__":
    app.run(debug=True)