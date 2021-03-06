# Foot-Prints
### footfall scraping to proccess, save and print patient requests

To succefully run Foot-Prints, _**change the chromedriver directory in get-data.py**_
Once ready, run => `py app.py`

---

The idea of foot-prints was to help cover the crossover era we currently work in, where tech is taking over, but its user-interface isn't quite as intuitive as it needs to be.
I found reception to be a key example of this, where bringing tech back to paper was an extreemly viable and time saving strategy.

---

Here is the mechanism:

1. get-data.py will open up a browser that will head to footfall, it will then go through and find all users that have requested prescriptions
2. it will go through all those users, saving what they have requested and when they requested it
3. once saved, get-data.py will automatically reply to the pt with confirmation of receipt
4. after all data is collected, app.py will launch it's jinja templated web app which will display all collected data in the order oldest request first
5. the web app allows users to either print off the list or interact directly with the site, selecting different error messages which will be recorded alongside the 
success/ failure of each inidividual script.
