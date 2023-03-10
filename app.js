// OpenWeatherMap API.
const api = '07bb3710e662460fb2256638c910402f';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
    let long;
    let lat;

    //Accessing Geolocation of User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // Storing Longitude and Latitude
            long = position.coords.longitude
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            fetch(base).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                const { temp } = data.main;
                const place = data.name;
                const {description, icon} = data.weather[0];
                const { sunrise, sunset } = data.sys;
                
                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                const fahrenheit = (temp * 9) / 5 + 32;

                // Converting Epoch(Unix) time to GMT
                const sunriseGMT = new Date (sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);
                
                iconImg.src = iconUrl;
                loc.textContent = `${place}`;
                desc.textContent = `${description}`;
                tempC.textContent = `${temp.toFixed(2)} °C`;
                tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
            
            });
        });
    }
});
