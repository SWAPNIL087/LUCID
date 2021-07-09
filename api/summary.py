import sys
import cv2
import nltk
import pickle
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx

def read_article(text):
    artical = text.split(". ")
    sentences=[]
    for sentence in artical:
        sentences.append(sentence.replace("[^a-zA-Z]"," ").split(" "))
    sentences.pop()
    return sentences
def sentence_similarity(sent1,sent2,stopwords=None):
    if(stopwords==None):
        stopwords=[]
    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]
    all_words = list(set(sent1+sent2))

    vector1 = [0]*len(all_words)
    vector2 = [0]*len(all_words)

    for w in sent1:
        if(w in stopwords):continue
        vector1[all_words.index(w)]+=1
    for w in sent2:
        if(w in stopwords):continue
        vector2[all_words.index(w)]+=1

    return 1-cosine_distance(vector1,vector2)

def gen_sim_matrix(sentences,stop_words):
    similarity_matrix = np.zeros((len(sentences),len(sentences)))
    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if(i==j):
                continue
            similarity_matrix[i][j] = sentence_similarity(sentences[i],sentences[j],stop_words)
    return similarity_matrix



def generate_summary(text,top_n=5):
    stop_words = stopwords.words('english')
    summarize_text = []
    sentences = read_article(text)
    if(not sentences):
        print("Empty file")
        return
    sentence_similarity_matrix = gen_sim_matrix(sentences,stop_words)
    sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_matrix)
    scores = nx.pagerank(sentence_similarity_graph)
    ranked_sentence = sorted(((scores[i],s) for i,s in enumerate(sentences)),reverse = True)

    for i in range(top_n):
        summarize_text.append(' '.join(ranked_sentence[i][1]))
    return (". ".join(summarize_text))
    #generate_keyword(''.join(summarize_text))