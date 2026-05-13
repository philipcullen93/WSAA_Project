# WSAA_Project: Formula 1 Race Tracker

Author: Philip Cullen

## Project Description

F1 Race Tracker is a full-stack web application built using Flask, SQLAlchemy, SQLite, HTML, CSS, and JavaScript.

The application allows users to manage Formula 1 races and race results through a browser-based interface. Users can create, edit, delete, and view races, as well as add and manage driver results linked to specific races.

The project utilises:
- REST API development using Flask
- Database relationships using SQLAlchemy
- CRUD operations
- Frontend and backend integration
- JavaScript Document Object Model (DOM) manipulation
- Client-side validation
- Interactive UI functionality

# Features

## Race Management
- Add new races
- Edit existing races
- Delete races
- View all races

## Race Results
- Add driver race results
- Delete race results
- View all race results grouped by race
- Filter results by selected race

## Validation
- Prevent duplicate finishing positions within the same race
- Prevent negative positions
- Prevent negative points

## Frontend
- Interactive UI built with JavaScript
- Dynamic dropdown menus
- Styled frontend using CSS

# Technologies Used

- Python
- Flask
- SQLAlchemy
- SQLite
- HTML
- CSS
- JavaScript

# How to Run Locally

## 1. Clone the Repository
git clone <https://github.com/philipcullen93/WSAA_Project>

## 2. Run the f1_tracker application
- cd f1_race_tracker
- python -m venv venv
- .\venv\Scripts\Activate.ps1
- pip install -r requirements.txt
- python f1_tracker.py

## 3. Open the Application

Navigate to http://127.0.0.1:5000/ in a web browser.

### API Endpoints

## Race Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /races | Get all races |
| POST | /races | Create a new race |
| PUT | /races/<id> | Update an existing race |
| DELETE | /races/<id> | Delete a race |

## Results Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /results | Get all races |
| POST | /results | Create a new race |
| PUT | /results/<id> | Update an existing race |
| DELETE | /results/<id> | Delete a race |

# Limitations
- No user authentication
- The application uses local SQLite storage
- The frontend is designed primarily for desktop use

# Future Improvements
- Add race additional analytics such as total points per driver, championship standings, constructor points and standings, and fastest lap times
- Integrate FastF1 API to import live Formula 1 data
- Link FastF1 data to racers and to display lap times, telemetry, and more complex data analysis features
- Add circuit layouts and information for selected races
- Add detailed information on drivers such as teams, qualifying and race results, and championship results

# References
# References

1. Flask Documentation – Routing, request handling, JSON responses, and template rendering.  
   Available at: https://flask.palletsprojects.com/

2. SQLAlchemy Documentation – ORM models, database sessions, SQLite integration, and CRUD operations.  
   Available at: https://docs.sqlalchemy.org/

3. Flask-CORS Documentation – Cross-Origin Resource Sharing configuration for Flask APIs.  
   Available at: https://flask-cors.readthedocs.io/

4. Mozilla Developer Network (MDN) – JavaScript Fetch API used for asynchronous API requests between frontend and backend.  
   Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

5. Mozilla Developer Network (MDN) – JavaScript DOM manipulation and event handling used for interactive frontend functionality.  
   Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript

6. Mozilla Developer Network (MDN) – HTML forms, semantic structure, buttons, lists, and input elements.  
   Available at: https://developer.mozilla.org/en-US/docs/Web/HTML

7. Mozilla Developer Network (MDN) – CSS styling, responsive design, layout spacing, button styling, and media queries.  
   Available at: https://developer.mozilla.org/en-US/docs/Web/CSS

8. SQLite Documentation – Local relational database used for race and result storage.  
   Available at: https://www.sqlite.org/docs.html

9. Python Documentation – General Python syntax, functions, dictionaries, loops, and virtual environments.  
   Available at: https://docs.python.org/3/

10. Git Documentation – Version control, commits, branching concepts, and repository management.  
    Available at: https://git-scm.com/doc

11. GitHub Documentation – Remote repositories, pushing commits, and repository hosting.  
    Available at: https://docs.github.com/

12. PythonAnywhere Documentation – Flask web application deployment and WSGI configuration.  
    Available at: https://help.pythonanywhere.com/

13. FastF1 Documentation – Considered as a potential future external Formula 1 data integration source.  
    Available at: https://theoehrly.github.io/Fast-F1/

14. W3Schools JavaScript Tutorials – Referenced for additional examples related to forms, arrays, filtering, and DOM updates.  
    Available at: https://www.w3schools.com/js/

15. W3Schools CSS Tutorials – Referenced for additional frontend styling examples and responsive layouts.  
    Available at: https://www.w3schools.com/css/
