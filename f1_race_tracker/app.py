from flask import Flask, request, jsonify
from flask_cors import CORS
from models import session, Race

# Create the Flask app
app = Flask(__name__)

# Allow the frontend to communicate with this API later
CORS(app)


# Basic homepage route to confirm the server is running
@app.route("/")
def home():
    return "F1 Race Tracker API is running"


# GET route to return all races
@app.route("/races", methods=["GET"])
def get_races():
    races = session.query(Race).all()

    race_list = []
    for race in races:
        race_list.append({
            "id": race.id,
            "name": race.name,
            "location": race.location,
            "date": race.date
        })

    return jsonify(race_list)


# POST route to add a new race
@app.route("/races", methods=["POST"])
def create_race():
    data = request.get_json()

    new_race = Race(
        name=data["name"],
        location=data["location"],
        date=data["date"]
    )

    session.add(new_race)
    session.commit()

    return jsonify({"message": "Race created successfully"}), 201


# PUT route to update an existing race by ID
@app.route("/races/<int:id>", methods=["PUT"])
def update_race(id):
    race = session.query(Race).filter_by(id=id).first()

    if race is None:
        return jsonify({"error": "Race not found"}), 404

    data = request.get_json()

    race.name = data["name"]
    race.location = data["location"]
    race.date = data["date"]

    session.commit()

    return jsonify({"message": "Race updated successfully"})


# DELETE route to remove an existing race by ID
@app.route("/races/<int:id>", methods=["DELETE"])
def delete_race(id):
    race = session.query(Race).filter_by(id=id).first()

    if race is None:
        return jsonify({"error": "Race not found"}), 404

    session.delete(race)
    session.commit()

    return jsonify({"message": "Race deleted successfully"})


# This must stay at the bottom of the file
if __name__ == "__main__":
    app.run(debug=True)