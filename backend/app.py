from flask import Flask, request, jsonify
from random import random
HOST = '0.0.0.0'
PORT = 8081

app = Flask(__name__)

@app.route('/api/predict', methods=['POST'])
def predict():
    X = request.get_json()
    res = float(X['numero']) * random()
    return jsonify({'response': res})

if __name__ == '__main__':
    app.run(host=HOST, debug=True, port=PORT)