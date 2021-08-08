from flask import Flask, render_template, url_for, request, redirect
# from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from datetime import datetime
import webbrowser

app = Flask(__name__)



# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
# db = SQLAlchemy(app)

ds = pd.read_csv('scripts.csv')

# class Scripts(db.Model):
# 	id = db.Column(db.Integer, primary_key=True)
# 	dob = db.Column(db.String(200), nullable=False)
# 	name = db.Column(db.String(200), nullable=False)
# 	email = db.Column(db.String(200), nullable=False)
# 	medication = db.Column(db.String(200), nullable=False)
# 	dose = db.Column(db.String(200), nullable=False)
# 	quantity = db.Column(db.String(200), nullable=False)
# 	time = db.Column(db.DateTime, default=datetime.utcnow)
# 	date = db.Column(db.DateTime, default=datetime.utcnow)

# 	def __repr__(self): 
# 		return '<Script %r>' % self.id

@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'POST':
		task_content = request.form['content']
		# new_task = Todo(content=task_content)

		# try:
		# 	db.session.add(new_task)
		# 	db.session.commit()
		# 	return redirect('/')
		# except:
		# 	return 'There was an issue adding your task'

	else:
		scripts = [row for row in ds.iterrows()]
		# scripts = Scripts.query.order_by(Scripts.date).all()
		return render_template('index.html', scripts=scripts)

@app.route('/delete/<int:id>')
def delete(id):
	task_to_delete = Todo.query.get_or_404(id)

	try:
		db.session.delete(task_to_delete)
		db.session.commit()
		return redirect('/')
	except:
		return 'There was a problem deleting that task'

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
	task = Todo.query.get_or_404(id)

	if request.method == 'POST':
		task.content = request.form['content']

		try:
			db.session.commit()
			return redirect('/')
		except:
			return 'There was an issue updating your task'
	else:
		return render_template('update.html', task=task)

if __name__ == "__main__":
	# webbrowser.open('http://127.0.0.1:5000/')
	app.run(debug=True)