from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

import numpy as np
import time
import datetime as dt
import pandas as pd

# path of chromedriver
PATH = "H:/Foot-Prints/selenium/chromedriver.exe"

options = webdriver.ChromeOptions() 
options.add_experimental_option("excludeSwitches", ["enable-logging"])
driver = webdriver.Chrome(options=options, executable_path=r'H:\Foot-Prints\selenium\chromedriver.exe')

# Go to footfall login
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

# Select prescriptions from drop down
time.sleep(2)
drop_down = Select(driver.find_element_by_id('filter-request'))
drop_down.select_by_value('16')

# grab links for pt repeat prescription pages
# get basic pt info, dob and full name
table = driver.find_element_by_xpath('//table')
links = []
pt_info = []

for row in table.find_elements_by_xpath(".//tr"):
    links.append([td.get_attribute('href') for td in row.find_elements_by_xpath(".//td/b/a")])
    pt_info.append([td.text for td in row.find_elements_by_xpath(".//td/b/a")])

## clear up lists as haven't found good way of not including []
links = [x for x in links if x != []]
pt_info = [x[0].split('; ') for x in pt_info if x != []]   

for ind in range(len(links)):
    # load pt repeat prescription page
    driver.get(links[ind][0])
    time.sleep(1)

    # get initial info
    requested = driver.find_element_by_class_name('text-muted').text
    dob = pt_info[ind][1]
    full_name = pt_info[ind][0]
    email = ''

    # find email
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

    for num in range(5, len(answers)):

        # strength
        if num % 3 == 0:
            strength.append(answers[num].text)
        # quantity
        if num % 3 == 1:
            quantity.append(answers[num].text)
        # medication
        if num % 3 == 2:
            if num == 35:
                break
            medication.append(answers[num].text)

    # print(f'len str {len(strength)}, len quantity {len(quantity)}, len medication {len(medication)}')

    # create dataframe and compile
    pt_summary = pd.DataFrame()
    pt_summary['medication'] = medication
    pt_summary['dosage'] = strength
    pt_summary['quantity'] = quantity
    pt_summary['date'] = [requested for _ in medication]
    pt_summary['email'] = [email for _ in medication]
    pt_summary['full_name'] = [full_name for _ in medication]
    pt_summary['dob'] = [dob for _ in medication]

    pt_summary.to_csv('scripts.csv')
    pt_summary


    print('medications: ')
    print(medication)
    print('quantities:')
    print(quantity)
    print('strengths:')
    print(strength)