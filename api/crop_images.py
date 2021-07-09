import cv2
import os
p = 'C:/Users/91969/PycharmProjects/learn/lucid/lucid/src/cropped_images'

def crop_the_image(path):
    org_img = cv2.imread(path)
    image = org_img
    edged = cv2.Canny(image, 10, 250)
    (cnts, _) = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    idx = 0
    os.chdir(p)
    for filename in os.listdir(p):
        os.remove(filename)
    res={}
    for c in cnts:
        x, y, w, h = cv2.boundingRect(c)
        if w > 80 and h > 80:
            idx += 1
            new_img = image[y:y + h, x:x + w]
            name = 'img'+str(idx)+'.png'
            pp=name
            
            cv2.imwrite("C:/Users/91969/PycharmProjects/learn/lucid/lucid/src/cropped_images/" + name, new_img)
            res[idx] = pp
            #color_images(new_img,idx)
    return res