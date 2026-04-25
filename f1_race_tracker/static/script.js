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

                listItem.textContent = `${race.name} - ${race.location} - ${race.date}`;

                raceList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading races:", error);
        });
}

// Handle form submission for adding a new race
raceForm.addEventListener("submit", function(event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Get values from the input fields
    const raceData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value
    };

    // Send the new race data to the Flask API
    fetch(racesApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(raceData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Clear the form after adding the race
        raceForm.reset();

        // Reload the list so the new race appears
        loadRaces();
    })
    .catch(error => {
        console.error("Error adding race:", error);
    });
});

// Load races as soon as the page opens
loadRaces();