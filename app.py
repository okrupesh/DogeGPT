from flask import Flask, render_template, session, request, jsonify
import random

app = Flask(__name__)
app.secret_key = 'your-secret-key'

@app.route('/')
def index():
    if 'counter' not in session:
        session['counter'] = 0
    session['counter'] += 1
    return render_template('index.html', counter=session['counter'])

@app.route('/answer', methods=['POST'])
def answer():
    question = request.json['question']
    response = generate_response(question)
    return jsonify({'response': response})

def generate_response(question):
    if question.endswith('?'):
        answers = ['woof woof!', 'bhow bhow!', 'arf arf!']
        return random.choice(answers)
    else:
        return 'I am a dog, I can only respond to questions. Include a "?"'

if __name__ == '__main__':
    app.run(debug=True)