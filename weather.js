// Selecting HTML elements
const toggleSwitch = document.querySelector('.toggle');
const image = document.querySelector('.condition');
const weatherIcon = document.getElementById('weather-icon');
const locationName = document.getElementById('location-name');
const weatherDescription = document.querySelector('.Weather-description');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.querySelector('.humidity-level');
const windSpeed = document.querySelector('.wind-speed');
const getCurrentLocationButton = document.querySelector('.btn-location');
const clearButton = document.getElementById('two');
const searchBar = document.querySelector('.searchInput');
const searchButton = document.querySelector('.search');
const iconContainer = document.querySelector('.icon-container');
const invalidLocation = document.querySelector('.invalid-location');


// scroll event listener for the top navigation bar
window.addEventListener('scroll', function() {
    const topNav = document.querySelector('.top-nav');
    if (window.scrollY > 0) {
        topNav.classList.add('scrolled');
    } else {
        topNav.classList.remove('scrolled');
    }
});

// Initialize dark mode
function initializeDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enable') {
        document.body.classList.add('dark-mode');
        toggleSwitch.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        toggleSwitch.checked = false;
    }
}

toggleSwitch.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enable');
        toggleSwitch.checked = true;
        console.log("darkMode");
    } else {
        localStorage.setItem('darkMode', 'disable');
        toggleSwitch.checked = false;
        console.log("lightMode");
    }
});

initializeDarkMode();

// Update current data based on geolocation for current location button
const updateCurrentData = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const lang = 'en';
            const units = "metric";
            const key = "fb5be4e16a1d200e8c3070e23c4df62c";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=${lang}&units=${units}`;

            fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(resp.statusText);
                }
                return resp.json();
            })
            .then(data => {
                console.log(data);
                updateWeatherUI(data);
                iconContainer.style.display = 'flex';
                invalidLocation.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
        });
    } 
};


getCurrentLocationButton.addEventListener("click", updateCurrentData);

// Clear search bar input
const clearText = () => {
    searchBar.value = '';
    clearButton.style.visibility = 'hidden';
};

clearButton.addEventListener('click', clearText);

// Check if search bar has input
searchBar.addEventListener('input', () => {
    if (searchBar.value.trim() !== '') {
        clearButton.style.visibility = 'visible';
    } else {
        clearButton.style.visibility = 'hidden';
    }
});

// Fetch weather data based on user input
const fetchWeatherData = () => {
    const city = searchBar.value.trim();
        
        if(city !== '') {
        const lang = 'en';
        const units = "metric";
        const key = "fb5be4e16a1d200e8c3070e23c4df62c";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=${lang}&units=${units}`;
        
    

        fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            console.log(data);
            updateWeatherUI(data);
            // Clear the search bar input
            searchBar.value = '';
            clearButton.style.visibility = 'hidden';
            iconContainer.style.display = 'flex';
            invalidLocation.style.display = 'none';
        })
        .catch(error => {
            console.log(error);
            image.src = "DEv image/Earth Gif.gif";
            locationName.innerHTML = 'City not found';
            humidityElement.innerHTML = 'N/A';
            windSpeed.innerHTML = 'N/A';
            iconContainer.style.display = 'none';
            invalidLocation.style.display = 'flex';
        });
    }
};
// Check if the search bar is empty and show a message
const loadNothing = () => {
    const city = searchBar.value.trim();
    if (city === '') {
        image.src = "DEv image/Earth Gif.gif";
        locationName.innerHTML = 'Please enter a  valid city';
        locationName.style.fontSize = '2rem';
        humidityElement.innerHTML = 'N/A';
        windSpeed.innerHTML = 'N/A';
        iconContainer.style.display = 'none';
        invalidLocation.style.display = 'flex';
    }
};
searchButton.addEventListener('click', loadNothing);

searchButton.addEventListener('click', fetchWeatherData);

// Update the UI with the fetched weather data
const updateWeatherUI = (data) => {
    const place = data.name;
    const description = data.weather[0].main;
    const temp = data.main.temp;
    const humidityValue = data.main.humidity;
    const wind = data.wind.speed;

    locationName.textContent = place;
    weatherDescription.textContent = description;
    temperatureElement.textContent = `${temp}°C`;
    humidityElement.textContent = ` ${humidityValue}%`;
    windSpeed.textContent = `${wind} km/h`;

    // Update the weather icon based on the description
    if (description === "Rain") {
        image.src = "DEv image/Pouring Rain Raoin Cloud GIF - Pouring Rain Raoin Cloud Raining - Discover & Share GIFs.gif";
        weatherIcon.className = 'material-symbols-outlined';
        weatherIcon.textContent = 'water_drop';
    } else if (description === "Thunderstorm") {
        image.src = "DEv image/storm-11970_512.gif";
        weatherIcon.className = 'material-symbols-outlined';
        weatherIcon.textContent = 'thunderstorm';
    } else if (description === "Clear") {
        image.src = "DEv image/sun-11431_128.gif";
        weatherIcon.className = 'material-symbols-outlined';
        weatherIcon.textContent = 'wb_sunny';
    } else if (description === "Snow") {
        image.src = "DEv image/snowing-4013_256.gif";
        weatherIcon.className = 'material-symbols-outlined';
        weatherIcon.textContent = 'weather_snowy';
    } 
    else if ( description === "Drizzle"){
        image.src = "DEv image/raining-14436_256.gif";
        weatherIcon.className = 'material-symbols-outlined';
        weatherIcon.textContent = 'water_drop';
    }
    else if(description === "Mist" || description === "Fog") {
         // Use a video element for displaying the fog video
    const videoElement = document.createElement('video');
    videoElement.src = "DEv image/4651633-hd_1920_1080_30fps.mp4";
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;
    image.replaceWith(videoElement);
    weatherIcon.className = 'material-symbols-outlined';
    weatherIcon.textContent = 'mist';
    }
    else {
        image.src = "DEv image/sky-4583_512.gif";
        weatherIcon.className = 'material-symbols-outlined';
        weatherIcon.textContent = 'cloud';
    }
};