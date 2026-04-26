// API URL for the races endpoint
const racesApiUrl = "/races";

// Get references to the form and race list elements
const raceForm = document.getElementById("raceForm");
const raceList = document.getElementById("raceList");

// Fetch all races from the Flask API and display them
function loadRaces() {
    fetch(racesApiUrl)
        .then(response => response.json())
        .then(races => {
            // Clear the current list before adding updated data
            raceList.innerHTML = "";

            // Add each race to the list
            races.forEach(race => {
                const listItem = document.createElement("li");

                // Create text showing race details
                const raceText = document.createElement("span");
                raceText.textContent = `${race.name} - ${race.location} - ${race.date}`;

                // Create edit button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";

                // Fill the form with this race's data when editing
                editButton.onclick = function() {
                    document.getElementById("name").value = race.name;
                    document.getElementById("location").value = race.location;
                    document.getElementById("date").value = race.date;

                    // Store the race ID so the form knows it is editing
                    raceForm.setAttribute("data-edit-id", race.id);
                };

                // Create delete button
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";

                // Delete this race using the API
                deleteButton.onclick = function() {
                    fetch(`${racesApiUrl}/${race.id}`, {
                        method: "DELETE"
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                        // Reload list after deletion
                        loadRaces();
                    })
                    .catch(error => {
                        console.error("Error deleting race:", error);
                    });
                };

                // Add text and buttons to the list item
                listItem.appendChild(raceText);
                listItem.appendChild(document.createTextNode(" "));
                listItem.appendChild(editButton);
                listItem.appendChild(document.createTextNode(" "));
                listItem.appendChild(deleteButton);

                // Add the list item to the page
                raceList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading races:", error);
        });
}

// Handle form submission for adding or editing a race
raceForm.addEventListener("submit", function(event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Get values from the input fields
    const raceData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value
    };

    // Check whether the form is in edit mode
    const editId = raceForm.getAttribute("data-edit-id");

    // If editing, use PUT /races/id. Otherwise, use POST /races.
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

        // Clear the form and remove edit mode
        raceForm.reset();
        raceForm.removeAttribute("data-edit-id");

        // Reload the list so the latest data appears
        loadRaces();
    })
    .catch(error => {
        console.error("Error saving race:", error);
    });
});

// Load races as soon as the page opens
loadRaces();