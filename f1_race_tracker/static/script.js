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


// Fetch all races from the Flask API and display them
function loadRaces() {
    fetch(racesApiUrl)
        .then(response => response.json())
        .then(races => {
            // Clear existing race list before rebuilding it
            raceList.innerHTML = "";

            // Clear and rebuild dropdown used when adding race results
            raceIdDropdown.innerHTML = '<option value="">Select Race</option>';

            races.forEach(race => {
                const listItem = document.createElement("li");

                // Display race details
                const raceText = document.createElement("span");
                raceText.textContent = `${race.name} - ${race.location} - ${race.date}`;

                // Edit button fills the race form with existing data
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";

                editButton.onclick = function() {
                    document.getElementById("name").value = race.name;
                    document.getElementById("location").value = race.location;
                    document.getElementById("date").value = race.date;

                    // Store race ID so the form knows it should update, not create
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

                        // Reload both lists because deleting a race may also affect results
                        loadRaces();
                        loadResults();
                    })
                    .catch(error => {
                        console.error("Error deleting race:", error);
                    });
                };

                // Add race text and buttons to the page
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
            });
        })
        .catch(error => {
            console.error("Error loading races:", error);
        });
}

function loadResults() {
    Promise.all([
        fetch(resultsApiUrl).then(response => response.json()),
        fetch(racesApiUrl).then(response => response.json())
    ])
    .then(([results, races]) => {

        resultList.innerHTML = "";

        // Must be inside here
        races.forEach(race => {

            const raceResults = results.filter(result => result.race_id === race.id);

            if (raceResults.length > 0) {

                const raceHeader = document.createElement("h3");
                raceHeader.textContent = race.name;
                resultList.appendChild(raceHeader);

                const raceResultList = document.createElement("ul");

                raceResults.forEach(result => {
                    const listItem = document.createElement("li");

                    const resultText = document.createElement("span");
                    resultText.textContent =
                        `${result.driver_name} - Position ${result.position} - ${result.points} points`;

                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";

                    deleteButton.onclick = function() {
                        fetch(`${resultsApiUrl}/${result.id}`, {
                            method: "DELETE"
                        })
                        .then(response => response.json())
                        .then(() => loadResults());
                    };

                    listItem.appendChild(resultText);
                    listItem.appendChild(document.createTextNode(" "));
                    listItem.appendChild(deleteButton);

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

// Handle form submission for adding or editing a race
raceForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const raceData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value
    };

    // Check if the form is editing an existing race
    const editId = raceForm.getAttribute("data-edit-id");

    // Use PUT if editing, otherwise use POST to create a new race
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

        // Reset form and remove edit mode
        raceForm.reset();
        raceForm.removeAttribute("data-edit-id");

        // Reload data shown on page
        loadRaces();
        loadResults();
    })
    .catch(error => {
        console.error("Error saving race:", error);
    });
});


// Handle form submission for adding a race result
resultForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const resultData = {
        race_id: Number(document.getElementById("raceId").value),
        driver_name: document.getElementById("driverName").value,
        position: Number(document.getElementById("position").value),
        points: Number(document.getElementById("points").value)
    };

    // Extra validation in JavaScript before sending data to Flask
    if (resultData.position < 1) {
        alert("Position must be 1 or higher.");
        return;
    }

    if (resultData.points < 0) {
        alert("Points cannot be negative.");
        return;
    }

    // Check existing results before adding a new one
    fetch(resultsApiUrl)
        .then(response => response.json())
        .then(existingResults => {
            const duplicatePosition = existingResults.some(result =>
                result.race_id === resultData.race_id &&
                result.position === resultData.position
            );

            if (duplicatePosition) {
                alert("This position has already been entered for this race.");
                return;
            }

            fetch(resultsApiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resultData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                resultForm.reset();
                loadResults();
            })
            .catch(error => {
                console.error("Error adding result:", error);
            });
        })
        .catch(error => {
            console.error("Error checking existing results:", error);
        });
});


// Load existing data when the page first opens
loadRaces();
loadResults();