"""app.py: A Flask app that interacts with a React app and can be deployed to Heroku"""
__author__ = "Jared McArthur"
__date__ = "11/01/2021"

from flask import Flask, jsonify
from flask.helpers import send_from_directory

# comment out on deployment
#from flask_cors import CORS

# uses 'frontend' because that is where our react app is stored
app = Flask(__name__, static_folder="frontend/build", static_url_path="")

# comment out on deployment
#CORS(app)

# Global names dictionary
names_d = {"William" : "Wooten"}

# Input: firstname a string, from the REACT frontend 
# Output: Jsonified string based off whether or not the input was in the servers name table
@app.route("/names/<firstname>", methods=["GET"])
def serverRequest(firstname : str):
    if firstname in names_d:
        return jsonify(response = names_d[firstname])
    else:
        return jsonify(response = "User not found: " + firstname)

# Input: A hyphenated first and last name pair to add to the dictionary
# Output : a message signaling if was a sucess or failure
@app.route("/addnames/<names>", methods = ["Get"])
def serverAddNames(names : str):
    # Separate the names into firstname and lastname
    names = names.split("-")
    first = names[0]
    last  = names[1]
    if first in names_d:
        if last == names_d[first]:
            return jsonify(response = "Name already in use")
        else:
            names_d[first] = last
            return jsonify(response = "Overriding the last name associated with: " + first)
    # Add it to the dictionary
    names_d[first] = last
    # Check if it was added
    if first in names_d:
        return jsonify(response = "Success")
    else:
        return jsonify(response = "Failure")



# Default app behavior, render the index.html file   
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
    
if __name__ == "__main__":
    app.run(host="0.0.0.0")