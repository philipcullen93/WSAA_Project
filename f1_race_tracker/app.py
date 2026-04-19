from flask import Flask, request, jsonify
from flask_cors import CORS
from models import session, Race

# Create the Flask app
app = Flask(__name__)

# Enable CORS so the frontend can talk to the API later
CORS(app)

# Basic homepage route to confirm the server is running
@app.route("/")
def home():
    return "F1 Race Tracker API is running"

# GET route to return all races from the database
@app.route("/races", methods=["GET"])
def get_races():
    # Query all race records from the database
    races = session.query(Race).all()

    # Convert each Race object into a dictionary so it can be returned as JSON
    race_list = []
    for race in races:
        race_list.append({
            "id": race.id,
            "name": race.name,
            "location": race.location,
            "date": race.date
        })

    return jsonify(race_list)

# POST route to add a new race to the database
@app.route("/races", methods=["POST"])
def create_race():
    # Get JSON data sent in the request body
    data = request.get_json()

    # Create a new Race object using the submitted data
    new_race = Race(
        name=data["name"],
        location=data["location"],
        date=data["date"]
    )

    # Add the new race to the session and save it to the database
    session.add(new_race)
    session.commit()

    return jsonify({"message": "Race created successfully"}), 201

# Run the Flask development server
if __name__ == "__main__":
    app.run(debug=True)


