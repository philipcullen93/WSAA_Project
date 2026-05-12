// API endpoints for races and results
const racesApiUrl = "/races";
const resultsApiUrl = "/results";

// Get references to race form elements
const raceForm = document.getElementById("raceForm");
const raceList = document.getElementById("raceList");

// Get references to result form elements
const resultForm = document.getElementById("resultForm");
const resultList = document.getElementById("resultList");
const raceIdDropdown = document.getElementById("raceId");

// Get references to view results controls
const viewRaceIdDropdown = document.getElementById("viewRaceId");
const viewResultsButton = document.getElementById("viewResultsButton");
const showAllResultsButton = document.getElementById("showAllResultsButton");


// Fetch all races from the Flask API and display them
function loadRaces() {
    fetch(racesApiUrl)
        .then(response => response.json())
        .then(races => {
            raceList.innerHTML = "";

            // Clear and rebuild dropdowns that use race data
            raceIdDropdown.innerHTML = '<option value="">Select Race</option>';
            viewRaceIdDropdown.innerHTML = '<option value="">Select Race</option>';

            races.forEach(race => {
                const listItem = document.createElement("li");

                const raceText = document.createElement("span");
                raceText.textContent = `${race.name} - ${race.location} - ${race.date}`;

                // Edit button fills the race form with existing data
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";

                editButton.onclick = function() {
                    document.getElementById("name").value = race.name;
                    document.getElementById("location").value = race.location;
                    document.getElementById("date").value = race.date;

                    raceForm.setAttribute("data-edit-id", race.id);
                };

                // Delete button removes the race using the API
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";

                deleteButton.onclick = function() {
                    fetch(`${racesApiUrl}/${race.id}`, {
                        method: "DELETE"
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        loadRaces();
                        loadResults();
                    })
                    .catch(error => {
                        console.error("Error deleting race:", error);
                    });
                };

                listItem.appendChild(raceText);
                listItem.appendChild(document.createTextNode(" "));
                listItem.appendChild(editButton);
                listItem.appendChild(document.createTextNode(" "));
                listItem.appendChild(deleteButton);

                raceList.appendChild(listItem);

                // Add race to dropdown so results can be linked to a race
                const option = document.createElement("option");
                option.value = race.id;
                option.textContent = race.name;
                raceIdDropdown.appendChild(option);

                // Add race to dropdown used for filtering results
                const viewOption = document.createElement("option");
                viewOption.value = race.id;
                viewOption.textContent = race.name;
                viewRaceIdDropdown.appendChild(viewOption);
            });
        })
        .catch(error => {
            console.error("Error loading races:", error);
        });
}


// Fill the result form for editing
function prepareResultEdit(result) {
    document.getElementById("raceId").value = result.race_id;
    document.getElementById("driverName").value = result.driver_name;
    document.getElementById("position").value = result.position;
    document.getElementById("points").value = result.points;

    // Store result ID so the form knows it should update, not create
    resultForm.setAttribute("data-edit-id", result.id);
}


// Create one displayed result item with Edit and Delete buttons
function createResultListItem(result, reloadFunction) {
    const listItem = document.createElement("li");

    const resultText = document.createElement("span");
    resultText.textContent =
        `${result.driver_name} - Position ${result.position} - ${result.points} points`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function() {
        prepareResultEdit(result);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function() {
        fetch(`${resultsApiUrl}/${result.id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => {
            reloadFunction();
        })
        .catch(error => {
            console.error("Error deleting result:", error);
        });
    };

    listItem.appendChild(resultText);
    listItem.appendChild(document.createTextNode(" "));
    listItem.appendChild(editButton);
    listItem.appendChild(document.createTextNode(" "));
    listItem.appendChild(deleteButton);

    return listItem;
}


// Fetch all race results from the Flask API and group them by race
function loadResults() {
    Promise.all([
        fetch(resultsApiUrl).then(response => response.json()),
        fetch(racesApiUrl).then(response => response.json())
    ])
    .then(([results, races]) => {
        resultList.innerHTML = "";

        races.forEach(race => {
            const raceResults = results.filter(result => result.race_id === race.id);

            if (raceResults.length > 0) {
                const raceHeader = document.createElement("h3");
                raceHeader.textContent = race.name;
                resultList.appendChild(raceHeader);

                const raceResultList = document.createElement("ul");

                raceResults.forEach(result => {
                    const listItem = createResultListItem(result, loadResults);
                    raceResultList.appendChild(listItem);
                });

                resultList.appendChild(raceResultList);
            }
        });
    })
    .catch(error => {
        console.error("Error loading results:", error);
    });
}


// Display results for one selected race
function loadResultsForRace(raceId) {
    Promise.all([
        fetch(resultsApiUrl).then(response => response.json()),
        fetch(racesApiUrl).then(response => response.json())
    ])
    .then(([results, races]) => {
        resultList.innerHTML = "";

        const selectedRace = races.find(race => race.id === Number(raceId));

        if (!selectedRace) {
            resultList.innerHTML = "<li>Please select a valid race.</li>";
            return;
        }

        const raceResults = results.filter(result => result.race_id === Number(raceId));

        const raceHeader = document.createElement("h3");
        raceHeader.textContent = selectedRace.name;
        resultList.appendChild(raceHeader);

        if (raceResults.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.textContent = "No results entered for this race yet.";
            resultList.appendChild(emptyMessage);
            return;
        }

        const raceResultList = document.createElement("ul");

        raceResults.forEach(result => {
            const listItem = createResultListItem(result, function() {
                loadResultsForRace(raceId);
            });

            raceResultList.appendChild(listItem);
        });

        resultList.appendChild(raceResultList);
    })
    .catch(error => {
        console.error("Error loading selected race results:", error);
    });
}


// Handle form submission for adding or editing a race
raceForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const raceData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value
    };

    const editId = raceForm.getAttribute("data-edit-id");

    const url = editId ? `${racesApiUrl}/${editId}` : racesApiUrl;
    const method = editId ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(raceData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        raceForm.reset();
        raceForm.removeAttribute("data-edit-id");

        loadRaces();
        loadResults();
    })
    .catch(error => {
        console.error("Error saving race:", error);
    });
});


// Handle form submission for adding or editing a race result
resultForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const resultData = {
        race_id: Number(document.getElementById("raceId").value),
        driver_name: document.getElementById("driverName").value,
        position: Number(document.getElementById("position").value),
        points: Number(document.getElementById("points").value)
    };

    const editId = resultForm.getAttribute("data-edit-id");

    if (resultData.position < 1) {
        alert("Position must be 1 or higher.");
        return;
    }

    if (resultData.points < 0) {
        alert("Points cannot be negative.");
        return;
    }

    fetch(resultsApiUrl)
        .then(response => response.json())
        .then(existingResults => {
            const duplicatePosition = existingResults.some(result =>
                result.race_id === resultData.race_id &&
                result.position === resultData.position &&
                result.id !== Number(editId)
            );

            const duplicatePoints = existingResults.some(result =>
                result.race_id === resultData.race_id &&
                result.points === resultData.points &&
                result.id !== Number(editId)
            );

            if (duplicatePosition) {
                alert("This position has already been entered for this race.");
                return;
            }

            if (duplicatePoints) {
                alert("These points have already been entered for this race.");
                return;
            }

            const url = editId ? `${resultsApiUrl}/${editId}` : resultsApiUrl;
            const method = editId ? "PUT" : "POST";

            fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resultData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                resultForm.reset();
                resultForm.removeAttribute("data-edit-id");

                if (viewRaceIdDropdown.value) {
                    loadResultsForRace(viewRaceIdDropdown.value);
                } else {
                    loadResults();
                }
            })
            .catch(error => {
                console.error("Error saving result:", error);
            });
        })
        .catch(error => {
            console.error("Error checking existing results:", error);
        });
});


// View only the results for the selected race
viewResultsButton.addEventListener("click", function() {
    const selectedRaceId = viewRaceIdDropdown.value;

    if (!selectedRaceId) {
        alert("Please select a race first.");
        return;
    }

    loadResultsForRace(selectedRaceId);
});


// Show all race results again
showAllResultsButton.addEventListener("click", function() {
    viewRaceIdDropdown.value = "";
    loadResults();
});


// Load existing data when the page first opens
loadRaces();
loadResults();