import json
import time
from selenium import webdriver
import random
from selenium.webdriver.common.by import By
import requests
import csv
from geopy.geocoders import GoogleV3

def create_apartment(userid,apartmentlist):
    geolocator = GoogleV3(api_key='AIzaSyBIzBq78AMY7ALjM6v0fN7Kgw3b8j-N31g')
    name = apartmentlist[4]
    des = apartmentlist[5]
    city = apartmentlist[12].split(",")[0]
    address = geolocator.reverse(str(apartmentlist[29])+', '+str(apartmentlist[30]))
    price = apartmentlist[39].replace("$",'').replace(",",'')
    maxvisitors = apartmentlist[33]
    res = {
        'name': name,
        'city':city,
        'description':des.split(".")[0],
        'address':address.address,
        'price':float(price),
        'maxvisitors':maxvisitors,
        'ownerid':userid
    }
    return res

def random_phone():
    res = '05'
    for i in range(8):
        res+=str(random.randint(0,9))
    return str(res)

def create_user(user):
    firstname = user.split(' ')[0]
    lastname = user.split(' ')[1]
    res = {
        'firstname': firstname,
        'lastname': lastname,
        'email': firstname+lastname+'@groundbnb.com',
        'password':'123456',
        'phone':random_phone()
    }
    return res

def insert_user(n):
    driver = webdriver.Chrome('/Users/omerk/Downloads/chromedriver')
    driver.get("https://fossbytes.com/tools/random-name-generator")
    time.sleep(10)
    element = driver.find_element(By.XPATH, "//input[@name='totalNames']").send_keys(str(n))
    time.sleep(3)
    element = driver.find_element(By.XPATH, "//button[text()='Generate Names']").click()
    time.sleep(5)
    all_names = {}
    for element in driver.find_elements(By.XPATH, "/html/body/div/div[1]/div/div[3]/div[2]/div/div[2]/div[2]/ul//li"):
        name = element.text
        response = requests.post(url="http://localhost:3000/api/auth/signup", data=create_user(name))

def insert_listing(n):
    res = requests.get(url="http://localhost:3000/api/users")
    users = json.loads(res.text)
    users_id = []
    print(users)

    for i,user in enumerate(users):
        if i > 9:
            break
        users_id.append(user['_id'])

    filename = 'listings.csv'
    with open(filename, 'r') as csvfile:
        datareader = csv.reader(csvfile)
        for i,row in enumerate(datareader):
            if i >n:
                break
            if i == 0:
                continue
            apartment = create_apartment(users_id[int(i/10)],row)
            response = requests.post(url="http://localhost:3000/api/apartments/add", data=apartment)
            print(response)
            print(i)




# insert_listing(100)
insert_user(100)


