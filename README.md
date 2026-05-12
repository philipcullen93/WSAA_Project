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
- Race result editing is available through the API but not through the frontend
- The application uses local SQLite storage
- The frontend is designed primarily for desktop use

# Future Improvements
- Add race analytics such as total points per driver, championship standings, constructor points and standings, and fastest lap time
- Improve responsive design for mobile devices
- Integrate FastF1 API to import live Formula 1 data
- Link FastF1 data to racers and to display lap times, telemetry, and other data analysis features.
