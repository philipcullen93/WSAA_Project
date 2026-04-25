from flask import Flask, request, jsonify
from flask_cors import CORS
from models import session, Race, Result

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "F1 Race Tracker API is running"


# RACE ROUTES

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


@app.route("/races/<int:id>", methods=["DELETE"])
def delete_race(id):
    race = session.query(Race).filter_by(id=id).first()

    if race is None:
        return jsonify({"error": "Race not found"}), 404

    session.delete(race)
    session.commit()

    return jsonify({"message": "Race deleted successfully"})


# RESULT ROUTES

@app.route("/results", methods=["GET"])
def get_results():
    results = session.query(Result).all()

    result_list = []
    for result in results:
        result_list.append({
            "id": result.id,
            "race_id": result.race_id,
            "driver_name": result.driver_name,
            "position": result.position,
            "points": result.points
        })

    return jsonify(result_list)


@app.route("/results", methods=["POST"])
def create_result():
    data = request.get_json()

    race = session.query(Race).filter_by(id=data["race_id"]).first()

    if race is None:
        return jsonify({"error": "Race not found"}), 404

    new_result = Result(
        race_id=data["race_id"],
        driver_name=data["driver_name"],
        position=data["position"],
        points=data["points"]
    )

    session.add(new_result)
    session.commit()

    return jsonify({"message": "Result created successfully"}), 201


# This must stay at the very bottom of the file
if __name__ == "__main__":
    app.run(debug=True)