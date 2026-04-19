from flask import Flask

# Create the Flask application instance
# __name__ helps Flask locate files like templates and static folders
app = Flask(__name__)

# Define a basic route (homepage)
# This is just to confirm the server is running correctly
@app.route("/")
def home():
    return "F1 Race Tracker API is running"

# Run the app in debug mode
# debug=True automatically reloads the server when you save changes
# and shows helpful error messages during development
if __name__ == "__main__":
    app.run(debug=True)
