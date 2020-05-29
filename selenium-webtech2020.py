'''
    Tests written and developed by Aekansh Dixit,
    For Web-Tech-2020 Project of Sixth Semester,
    CSE Department of PES University, Bengaluru.
'''

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.dirname(os.path.abspath(__file__))+"/backend/.env", verbose=True)
base_dir = os.getenv("PYTHON_FILE_LOCATION")
driver_file_location = os.getenv("WEBDRIVER_FILE_LOCATION")
browser = os.getenv("CHROME_OR_FIREFOX")
if browser == "CHROME":
    driver = webdriver.Chrome(executable_path=driver_file_location)
elif browser == "FIREFOX":
    driver = webdriver.Firefox(executable_path=driver_file_location)
else:
    raise Exception("Invalid Driver. Values supported: CHROME,FIREFOX")
'''
    Set the configuration here.
    debug = True or False decided whether 
            debug logs print or not.
    tests_to_run = Which tests to run? Mention them in order.
'''
debug = False
tests_to_run = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

'''
    Begin Testing...
'''

# Test #1: Anonymous Successful Book Search
if 1 in tests_to_run:
    driver.get("http://localhost:3000/")
    time.sleep(2)
    search_box_id = '//*[@id="search"]'
    search_box = driver.find_element_by_xpath(search_box_id)
    print("Begin Test: Anonymous Successful Book Search")
    print("Found searchbox. Searching a book...") if debug else None
    search_box.send_keys("Harry Potter and the Philosopher's Stone")
    search_box.send_keys(Keys.RETURN);
    print("Waiting for 2 secs to be sure of the API...") if debug else None
    time.sleep(2)
    book_id = '/html/body/div/div/div/div/main/div/div[2]/div/a[1]'
    book = driver.find_element_by_xpath(book_id)
    print("Found the book! Clicking on it...") if debug else None
    book.click()
    time.sleep(2)
    print("\tTest #1: Anonymous Successful Book Search: TEST SUCCESS.")
    print("End Test: Anonymous Successful Book Search: Complete.")
    print("====================")

# Test #2: Anonymous Unsuccessful Book Search
if 2 in tests_to_run:
    driver.get("http://localhost:3000/")
    time.sleep(2)
    print("Begin Test: Anonymous Unsuccessful Book Search")
    print("Found searchbox. Searching for garbage...") if debug else None
    search_box_id = '//*[@id="search"]'
    search_box = driver.find_element_by_xpath(search_box_id)
    search_box.send_keys("asdfghjoikjhgf21231sxdsd")
    search_box.send_keys(Keys.RETURN);
    print("Waiting for 2 secs to be sure of the API...") if debug else None
    time.sleep(2)
    print("Checking for correct result...") if debug else None
    no_results_id = '//main/div/h1'
    no_results = driver.find_element_by_xpath(no_results_id)
    if no_results.text == "Try searching for a book...":
        print("\tTest #2: Anonymous Unsuccessful Book Search: TEST SUCCESS.")
    else:
        print("\tTest #2: Anonymous Unsuccessful Book Search: TEST FAILED.")
    print("End Test: Anonymous Unsuccessful Book Search: Complete.")
    print("====================")

# Test #3: User Registration
if 3 in tests_to_run:
    driver.get("http://localhost:3000/")
    print("Begin Test: User Registration")
    login_link_id = '//a[@href="/login"]'
    login_link = driver.find_element_by_xpath(login_link_id)
    print("Found Login Link. Clicking...") if debug else None
    login_link.click()
    time.sleep(1)
    reg_link_id = '//a[@href="/signup"][1]'
    reg_link = driver.find_element_by_xpath(reg_link_id)
    print("Found Reg Link. Clicking...") if debug else None
    reg_link.click()
    time.sleep(1)
    print("Beginning to fill user profile...") if debug else None
    username_box_id = '/html/body/div/div/div/div/div/form/div[1]/div[1]/input'
    username_box = driver.find_element_by_xpath(username_box_id)
    full_name_box_id = '/html/body/div/div/div/div/div/form/div[1]/div[2]/input'
    full_name_box = driver.find_element_by_xpath(full_name_box_id)
    email_box_id = '/html/body/div/div/div/div/div/form/div[1]/div[3]/input'
    email_box = driver.find_element_by_xpath(email_box_id)
    password_box_id = '/html/body/div/div/div/div/div/form/div[1]/div[4]/input'
    password_box = driver.find_element_by_xpath(password_box_id)
    dp_button_id = '//*[@id="profile"]'
    dp_button = driver.find_element_by_xpath(dp_button_id)
    submit_button_id = '/html/body/div/div/div/div/div/form/div[2]/button'
    submit_button = driver.find_element_by_xpath(submit_button_id)
    print("Found all the boxes...") if debug else None
    print("Entering details...") if debug else None
    username_box.send_keys("AekanshDixit")
    full_name_box.send_keys("Aekansh Dixit")
    email_box.send_keys("aekanshpesu@gmail.com")
    password_box.send_keys("MyPassword@123")
    dp_button.send_keys(os.path.join(os.getcwd(),"AekanshDixit.jpg"))
    print("Submitting form...") if debug else None
    submit_button.click()
    print("Waiting for 5 secs to be sure of the API...") if debug else None
    time.sleep(5)
    print("Checking for correct result...") if debug else None
    import requests
    response = requests.post('http://localhost:62020/api/v1/validUserName', data={'username': 'AekanshDixit'})
    print("Response:", response) if debug else None
    if response.status_code == 400:
        print("Response:", response.json()) if debug else None
        if response.json()["error"] == "Username Already Used..":
            print("\tTest #3: User Registration: TEST SUCCESS.")
        else:
            print("\tTest #3: User Registration: TEST FAILED.")
    else:
        print("\tTest #3: User Registration: TEST FAILED.")
    print("End Test: User Registration: Complete.")
    print("====================")

# Test #4: User Verification
if 4 in tests_to_run:
    driver.get("http://localhost:3000/")
    print("Begin Test: User Verification")
    import requests
    response = requests.post('http://localhost:62020/api/v1/validUserName', data={'username': 'AekanshDixit'})
    print("Response:", response) if debug else None
    if response.status_code == 400:
        print("Response:", response.json()) if debug else None
        if response.json()["error"] == "Username Already Used..":
            print("\tTest #3: User Verification: TEST SUCCESS.")
        else:
            print("\tTest #3: User Verification: TEST FAILED.")
    else:
        print("\tTest #3: User Verification: TEST FAILED.")
    print("End Test: User Verification: Complete.")
    print("====================")

# Test #5: User Login
if 5 in tests_to_run:
    driver.get("http://localhost:3000/")
    print("Begin Test: User Login")
    login_link_id = '//a[@href="/login"]'
    login_link = driver.find_element_by_xpath(login_link_id)
    print("Found Login Link. Clicking...") if debug else None
    login_link.click()
    time.sleep(1)
    print("Beginning to fill user login...") if debug else None
    username_box_id = '/html/body/div/div/div/div/div/form/div[1]/div[1]/input'
    username_box = driver.find_element_by_xpath(username_box_id)
    password_box_id = '/html/body/div/div/div/div/div/form/div[1]/div[2]/input'
    password_box = driver.find_element_by_xpath(password_box_id)
    submit_button_id = '/html/body/div/div/div/div/div/form/div[3]/button'
    submit_button = driver.find_element_by_xpath(submit_button_id)
    print("Found all the boxes...") if debug else None
    print("Entering details...") if debug else None
    username_box.send_keys("AekanshDixit")
    password_box.send_keys("MyPassword@123")
    print("Submitting form...") if debug else None
    submit_button.click()
    print("Waiting for 8 secs to be sure of the API...") if debug else None
    time.sleep(8)
    print("Checking for correct result...") if debug else None
    try:
        profile_name_id = '/html/body/div/div/div/div/div/div/h2[1]'
        profile_name = driver.find_element_by_xpath(profile_name_id)
        if profile_name.text == "Aekansh Dixit":
            print("\tTest #5: User Login: TEST SUCCESS.")
        else:
            print("\tTest #5: User Login: TEST FAILED.")
    except Exception as e:
        print(e) if debug else None
        print("\tTest #5: User Login: TEST FAILED.")
    print("End Test: User Login: Complete.")
    print("====================")

# Test #6: User Empty Book History
if 6 in tests_to_run:
    driver.get("http://localhost:3000/profile")
    print("Begin Test: User Empty Book History")
    time.sleep(2) if 3 in tests_to_run else time.sleep(5)
    print("Checking for correct result...") if debug else None
    try:
        user_history_id = '/html/body/div/div/div/div/div/div/h1'
        user_history = driver.find_element_by_xpath(user_history_id)
        if user_history.text == "You haven't opened a book yet...":
            print("\tTest #6: User Empty Book History: TEST SUCCESS.")
        else:
            print("\tTest #6: User Empty Book History: TEST FAILED.")
    except Exception as e:
        print(e) if debug else None
        print("\tTest #6: User Empty Book History: TEST FAILED.")
    print("End Test: User Empty Book History: Complete.")
    print("====================")

# Test #7: User Successful Book Search
if 7 in tests_to_run:
    driver.get("http://localhost:3000/")
    time.sleep(2)
    search_box_id = '//*[@id="search"]'
    search_box = driver.find_element_by_xpath(search_box_id)
    print("Begin Test: User Successful Book Search")
    print("Found searchbox. Searching a book...") if debug else None
    search_box.send_keys("Harry Potter and the Philosopher's Stone")
    search_box.send_keys(Keys.RETURN);
    print("Waiting for 2 secs to be sure of the API...") if debug else None
    time.sleep(2)
    book_id = '/html/body/div/div/div/div/main/div/div[2]/div/a[1]'
    book = driver.find_element_by_xpath(book_id)
    print("Found the book! Clicking on it...") if debug else None
    book.click()
    time.sleep(2)
    print("\tTest #7: User Successful Book Search: TEST SUCCESS.")
    print("End Test: User Successful Book Search: Complete.")
    print("====================")

# Test #8: User Unsuccessful Book Search
if 8 in tests_to_run:
    driver.get("http://localhost:3000/")
    time.sleep(2)
    print("Begin Test: User Unsuccessful Book Search")
    print("Found searchbox. Searching for garbage...") if debug else None
    search_box_id = '//*[@id="search"]'
    search_box = driver.find_element_by_xpath(search_box_id)
    search_box.send_keys("asdfghjoikjhgf21231sxdsd")
    search_box.send_keys(Keys.RETURN)
    print("Waiting for 2 secs to be sure of the API...") if debug else None
    time.sleep(2)
    print("Checking for correct result...") if debug else None
    no_results_id = '//main/div/h1'
    no_results = driver.find_element_by_xpath(no_results_id)
    if no_results.text == "Try searching for a book...":
        print("\tTest #8: User Unsuccessful Book Search: TEST SUCCESS.")
    else:
        print("\tTest #8: User Unsuccessful Book Search: TEST FAILED.")
    print("End Test: User Unsuccessful Book Search: Complete.")
    print("====================")

# Test #9: User Book History
if 9 in tests_to_run:
    driver.get("http://localhost:3000/profile")
    print("Begin Test: User Book History")
    time.sleep(2) if 3 in tests_to_run else time.sleep(5)
    print("Checking for correct result...") if debug else None
    try:
        user_history_id = '/html/body/div/div/div/div/div/div/div/div/a'
        user_history = driver.find_element_by_xpath(user_history_id)
        print("Result of Attribute:", user_history.get_attribute("href")) if debug else None
        if user_history.get_attribute("href") == "http://localhost:3000/book/9781582346816":
            print("\tTest #9: User Book History: TEST SUCCESS.")
        else:
            print("\tTest #9: User Book History: TEST FAILED.")
    except Exception as e:
        print(e) if debug else None
        print("\tTest #9: User Book History: TEST FAILED.")
    print("End Test: User Book History: Complete.")
    print("====================")

# Test #10: Delete User
if 10 in tests_to_run:
    driver.get("http://localhost:3000/")
    print("Begin Test: Delete User")
    import requests
    response = requests.delete('http://localhost:62020/api/v1/user/AekanshDixit')
    print("Response:", response) if debug else None
    if response.status_code == 200:
        print("Response Status is 200, verifying...") if debug else None
        response = requests.post('http://localhost:62020/api/v1/validUserName', data={'username': 'AekanshDixit'})
        print("Response:", response) if debug else None
        if response.status_code == 200:
            print("Response:", response.json()) if debug else None
            print("\tTest #10: Delete User: TEST SUCCESS.")
        else:
            print("\tTest #10: Delete User: TEST FAILED.")
    else:
        print("\tTest #10: Delete User: TEST FAILED.")
    print("End Test: Delete User: Complete.")
    print("====================")
