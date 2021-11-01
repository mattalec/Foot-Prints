from flask import Flask, render_template, request
import webbrowser
import pandas as pd

app = Flask(__name__)

ds = pd.read_csv('./data/scripts.csv')

@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'POST':
		task_content = request.form['content']
	else:
		scripts = [row for row in ds.iterrows()]
		return render_template('index.html', scripts=scripts)

if __name__ == "__main__":
	#!/usr/bin/python
	# run selenium prescription scraping script
	import get_data
	webbrowser.open('http://127.0.0.1:5000/')
	app.run(debug=True)
	