const apiKey = "5332dae8e0f9c8aee50998358577b2b3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityinput");
const searchBtn = document.getElementById("searchbtn");

const body = document.querySelector("body");
const card = document.querySelector(".card");

const weatherIcon = document.getElementById("weathericon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
        alert("City not found");
        return;
    }

    const data = await response.json();

    // Update the page
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

    const temperature = Math.round(data.main.temp);
    document.querySelector(".temp").innerHTML = temperature + "°C";

    //colors 
    if (temperature <= 10) {// Cold
        card.style.background = "rgba(135, 206, 250, 0.2)"; 
        card.style.border = "1px solid rgba(135, 206, 250, 0.4)";
    } else if (temperature <= 25) {// Mild
        card.style.background = "rgba(255, 223, 186, 0.2)"; 
        card.style.border = "1px solid rgba(255, 223, 186, 0.4)";
    } else {// Hot
        card.style.background = "rgba(255, 128, 128, 0.2)"; 
        card.style.border = "1px solid rgba(255, 128, 128, 0.4)";
    }

    // Keep blur and smooth effect
    card.style.backdropFilter = "blur(12px)";
    card.style.transition = "background 0.4s ease, border 0.4s ease";

    
    // Optional: update weather icon based on data.weather[0].main
    const condition = data.weather[0].main;
    console.log("Weather condition:", condition); // optional debug line

    // Remove all old classes first
    weatherIcon.classList.remove(...weatherIcon.classList);

    // Add new classes based on condition
    switch (condition) {
        case "Clear":
            weatherIcon.classList.add("fas", "fa-sun", "fa-5x");
            break;
        case "Clouds":
            weatherIcon.classList.add("fas", "fa-cloud", "fa-5x");
            break;
        case "Rain":
            weatherIcon.classList.add("fas", "fa-cloud-showers-heavy", "fa-5x");
            break;
        case "Drizzle":
            weatherIcon.classList.add("fas", "fa-cloud-rain", "fa-5x");
            break;
        case "Thunderstorm":
            weatherIcon.classList.add("fas", "fa-bolt", "fa-5x");
            break;
        case "Snow":
            weatherIcon.classList.add("fas", "fa-snowflake", "fa-5x");
            break;
        case "Mist":
        case "Haze":
        case "Fog":
            weatherIcon.classList.add("fas", "fa-smog", "fa-5x");
            break;
        default:
            weatherIcon.classList.add("fas", "fa-cloud-sun", "fa-5x"); // fallback
    }


    // --- LOCAL TIME & DATE ---
    // Correct time conversion from UTC
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utc + data.timezone * 1000);


    // Format time
    const formattedTime = localTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    // Format date
    const formattedDate = localTime.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // Optional: map offset to timezone abbreviation
    const timezoneMap = {
                
                19800: "IST",//india
                0: "UTC",//Uk
                3600: "BST",//british summer time
                "-14400": "EDT",//us canada
                "-18000": "EST",//
                7200: "CEST",//cemtral europe standard time
                28800: "CST"//china standard time
    
                }
   
    const timezoneName = timezoneMap[data.timezone] || "";

    // Inject into your HTML
    document.querySelector(".local-time").innerHTML = ` ${formattedTime} (${timezoneName})`;

    document.querySelector(".local-date").innerHTML = ` ${formattedDate}`;

}


function handleInvalidInput() {
    searchBox.classList.add("shake");

    // Remove the class after animation finishes
    setTimeout(() => {
        searchBox.classList.remove("shake");
    }, 300);
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() === "") {
        handleInvalidInput();
    } else {
        checkWeather(searchBox.value.trim());
    }
});

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (searchBox.value.trim() === "") {
            handleInvalidInput();
        } else {
            checkWeather(searchBox.value.trim());
        }
    }
});

window.onload = () => {
    searchBox.focus();
};







