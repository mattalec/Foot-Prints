from flask import Flask, render_template, url_for, request, redirect
# from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from datetime import datetime
import webbrowser
#import pdfkit

app = Flask(__name__)

ds = pd.read_csv('scripts.csv')

@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'POST':
		task_content = request.form['content']
	else:
		scripts = [row for row in ds.iterrows()]
		return render_template('index.html', scripts=scripts)

# @app.route('/delete/<int:id>')
# def delete(id):
# 	task_to_delete = Todo.quem
# 	y.get_or_404(id)
# 	try:
# 		db.session.delete(task_to_delete)
# 		db.session.commit()
# 		return redirect('/')
# 	except:
# 		return 'There was a problem deleting that task'

# @app.route('/update/<int:id>', methods=['GET', 'POST'])
# def update(id):
# 	task = Todo.query.get_or_404(id)

# 	if request.method == 'POST':
# 		task.content = request.form['content']

# 		try:
# 			db.session.commit()
# 			return redirect('/')
# 		except:
# 			return 'There was an issue updating your task'
# 	else:
# 		return render_template('update.html', task=task)

if __name__ == "__main__":
	# webbrowser.open('http://127.0.0.1:5000/')
	app.run(debug=True)