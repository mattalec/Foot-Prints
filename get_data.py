from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

import numpy as np
import time
import datetime as dt
import pandas as pd

# functions #####################################

# creates index per variable [1,2,2,3,1,1]=>[0,0,1,0,0,1]
def var_ind(col):
    pt_ind = []
    col = ds.full_name.values

    for i in range(len(col)):
        if i == 0: 
            x = 0
        else:
            if col[i] == col[i-1]: x += 1 
            else: x = 0
        pt_ind.append(x)
    
    return np.array(pt_ind)

# selenium #####################################

options = webdriver.ChromeOptions() 
options.add_experimental_option("excludeSwitches", ["enable-logging"])

# home chromedriver dir
driver = webdriver.Chrome(options=options, executable_path=r'C:/Users/Alec/root/work/git/MPS/selenium/chromedriver.exe')
# MPS chromedriver dir
# driver = webdriver.Chrome(options=options, executable_path=r'H:/Foot-Prints/selenium/chromedriver.exe')

# go to footfall login
driver.get("https://www.merrowparksurgery.org.uk/dashboard/login?intended=https://www.merrowparksurgery.org.uk/dashboard/")

# log in
username = driver.find_element_by_id('user_login')
username.send_keys('alec.matthews@nhs.net')
password = driver.find_element_by_id('password')
password.send_keys('Static_shocky1')
login_button = driver.find_element_by_class_name('btn-primary')
login_button.send_keys(Keys.RETURN)
time.sleep(1)
ok_checkbox = driver.find_element_by_class_name('btn-success')
ok_checkbox.send_keys(Keys.RETURN)

# select prescriptions from drop down options
time.sleep(2)
drop_down = Select(driver.find_element_by_id('filter-request'))
drop_down.select_by_value('16')

# grab links to the repeat prescription pages
# get basic pt info, dob and full name
table = driver.find_element_by_xpath('//table')
links = []
pt_info = []

for row in table.find_elements_by_xpath(".//tr"):
    links.append([td.get_attribute('href') for td in row.find_elements_by_xpath(".//td/b/a")])
    pt_info.append([td.text for td in row.find_elements_by_xpath(".//td/b/a")])

## clear up lists
links = [x for x in links if x != []]
pt_info = [x[0].split('; ') for x in pt_info if x != []]   

# iterate through pts
for ind in range(len(links)):
    
    # get link
    driver.get(links[ind][0])
    time.sleep(1)

    # get initial info
    requested = driver.find_element_by_class_name('text-muted').text
    dob = pt_info[ind][1]
    full_name = pt_info[ind][0]
    email = ''

    ## find email
    page_info = driver.find_elements_by_class_name('mr-5')
    for i in page_info:
        if "Email:" in i.text:
            email = i.text.split("Email: ")[1]
            break

    # get prescription info
    answers = driver.find_elements_by_class_name('answer_value')
    medication = []
    quantity = []
    strength = []
    table = []

    ## starting at 5 as first 5 'answer_values' are column names
    for num in range(5, len(answers)):

        ## strength
        if num % 3 == 0:
            strength.append(answers[num].text)
        ## quantity
        if num % 3 == 1:
            quantity.append(answers[num].text)
        ## medication
        if num % 3 == 2:
            if num == 35:
                ## additional info
                strength.append('')
                quantity.append('')
            medication.append(answers[num].text)

# pandas #####################################

    # create dataframe and compile
    ds = pd.DataFrame()
    ds['dob'] = [dob for _ in medication]
    ds['full_name'] = [full_name for _ in medication]
    ds['medication'] = medication
    ds['email'] = [email for _ in medication]
    ds['dosage'] = strength
    ds['quantity'] = quantity
    ds['date'] = [requested for _ in medication]

    df.to_csv('pre-scripts.csv')

    # process dataframe to be of correct format for app.html
    ## sort by date and then by name, note order used to create pt_ind
    ds = ds.sort_values(['full_name', 'date'], ascending=[True,False])
    ## pt_no indexing for each pt
    pts = {name: num for (num, name) in enumerate(ds.full_name.unique())}
    ds['pt_no'] = ds['full_name'].apply(lambda x: pts[x])
    ## pt_ind indexing for each item per pt
    ds['pt_ind'] = var_ind(ds['full_name'].values)

    ## if first create larger dataframe
    if ind == 0:
        df = pd.DataFrame()
    ## concat with larger dataframe
    df = pd.concat([ds,df])

## sort
ds = ds.sort_values(['full_name', 'date'], ascending=[True,False])
# save complete dataframe as csv
df.to_csv('scripts.csv')