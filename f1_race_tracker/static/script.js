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

                // Create a delete button for each race
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";

                // When clicked, send a DELETE request to the API
                deleteButton.onclick = function() {
                    fetch(`${racesApiUrl}/${race.id}`, {
                        method: "DELETE"
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                        // Reload the list so the deleted race disappears
                        loadRaces();
                    })
                    .catch(error => {
                        console.error("Error deleting race:", error);
                    });
                };

                // Add the text and button to the list item
                listItem.appendChild(raceText);

                // Add a space between text and button
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

// Load races as soon as the page opens
loadRaces();