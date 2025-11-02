from flask import Flask, request, jsonify
from flask_cors import CORS

from utils import search_top_5

app = Flask(__name__)
CORS(app)  # Allow all domains by default


@app.route("/")
def root():
    return "Hello movies!"


@app.route("/api/v1/top_match")
def return_top_matches():
    keyword = request.args.get("keyword")
    if not keyword:
        return {"error": "Missing 'keyword' parameter"}, 400  # Bad Request

    result = search_top_5(keyword)
    return jsonify(result)
