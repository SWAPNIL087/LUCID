import sys
import cv2
import nltk
import pickle
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx
import os

def color_images(names):
    print(names)
    p = 'C:/Users/91969/PycharmProjects/learn/lucid/lucid/src/coloredImages'
    os.chdir(p)
    for filename in os.listdir(p):
        os.remove(filename)
    
    path = 'C:/Users/91969/PycharmProjects/learn/lucid/lucid/src/cropped_images/'
    '''loading models'''
    net = cv2.dnn.readNetFromCaffe('C:/Users/91969/PycharmProjects/learn/model_funbook/colorization_deploy_v2.prototxt','C:/Users/91969/PycharmProjects/learn/model_funbook//colorization_release_v2.caffemodel')
    pts = np.load('C:/Users/91969/PycharmProjects/learn/model_funbook/pts_in_hull.npy')
    class8 = net.getLayerId('class8_ab')
    conv8 = net.getLayerId('conv8_313_rh')
    pts = pts.transpose().reshape(2,313,1,1)

    net.getLayer(class8).blobs = [pts.astype("float32")]
    net.getLayer(conv8).blobs = [np.full([1,313],2.606,dtype='float32')]
    res={}
    idx=0
    for key in names:
        idx+=1
        p = path + names[key]
        image=cv2.imread(p)
        scaled = image.astype('float32')/255.0
        lab = cv2.cvtColor(scaled,cv2.COLOR_BGR2LAB)

        resized = cv2.resize(lab,(224,224))
        L = cv2.split(resized)[0]
        L -= 50

        net.setInput(cv2.dnn.blobFromImage(L))
        ab = net.forward()[0,:,:,:].transpose((1,2,0))

        ab = cv2.resize(ab,(image.shape[1],image.shape[0]))

        L = cv2.split(lab)[0]
        colorized = np.concatenate((L[:,:,np.newaxis],ab),axis=2)

        colorized = cv2.cvtColor(colorized,cv2.COLOR_LAB2BGR)
        colorized = np.clip(colorized,0,1)

        colorized = (255 * colorized).astype('uint8')
        print('success')
        '''just have the save the image and send back the path to it'''
        name = 'img'+str(idx)+'.png'
        pp=name
        cv2.imwrite("C:/Users/91969/PycharmProjects/learn/lucid/lucid/src/coloredImages/" + name,colorized)
        res[idx] = pp
        
    return res