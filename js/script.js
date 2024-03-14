// API ключи
const apiKey = '176d1ae515e54fd4a0492612241003';
const apiKeyMaps = "a8c3d368-25c9-4b94-a57a-e93a32c8c939";

//  HTML элементы
const header = document.querySelector("header");
const today = document.querySelector(".today");
const form = document.querySelector("#search");
const input = document.querySelector("#search_city");

// Текущая дата, переменные
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fryday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let date = new Date();
let currentDay = date.getDay();
let currentDate = date.getDate();
let currentMonth = date.getMonth();
let currentHours = date.getHours();
let currentMinutes = date.getMinutes();
// функция определения дня недели на следующие три дня
function getElementAhead(positions) {
    const nextDay = (currentDay + positions) % days.length;
    currentDay = nextDay;
    return days[nextDay];
}

// переменные для сохранения информации с API
let city;
let currentWeather;
let forecastWeather;
let country;
let temp_c;
let temp_f;
let condition_text;
let condition_icon;
let feelslike_c;
let feelslike_f;
let humidity;
let wind; //в км/ч
let date_first_day;
let temp_c_first_day;
let temp_f_first_day;
let condition_first_day;
let temp_c_second_day;
let temp_f_second_day;
let condition_second_day;
let temp_c_third_day;
let temp_f_third_day;
let condition_third_day;

// функция полученися данных с API о текущей погоде

async function getDataCurrent(key, location) {
    const url_1 = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
    const response = await fetch(url_1);
    const currentWeather = await response.json();
    country = currentWeather.location.country;
    temp_c = currentWeather.current.temp_c;
    temp_f = Math.round(currentWeather.current.temp_f);
    condition_text = currentWeather.current.condition.text;
    condition_icon = currentWeather.current.condition.icon;
    feelslike_c = currentWeather.current.feelslike_c;
    feelslike_f = Math.round(currentWeather.current.feelslike_f);
    humidity = currentWeather.current.humidity;
    wind = Math.round(currentWeather.current.wind_kph * 1000 / 3600); //в км/ч
}

// функция полученися данных с API о погоде на 3 дня вперед

async function getDataForecast(key, location) {
    const url_1 = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=4`;
    const response = await fetch(url_1);
    const forecastWeather = await response.json();
    date_first_day = forecastWeather.forecast.forecastday[1].date;
    temp_c_first_day = Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_c);
    temp_f_first_day = Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_f);
    condition_first_day = forecastWeather.forecast.forecastday[1].day.condition.icon;
    temp_c_second_day = Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_c);
    temp_f_second_day = Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_f);
    condition_second_day = forecastWeather.forecast.forecastday[2].day.condition.icon;
    temp_c_third_day = Math.round(forecastWeather.forecast.forecastday[3].day.avgtemp_c);
    temp_f_third_day = Math.round(forecastWeather.forecast.forecastday[3].day.avgtemp_f);
    condition_third_day = forecastWeather.forecast.forecastday[3].day.condition.icon;

}

// функция отрисовки HTML
function render() {
    const html = ` <main id="main">
    <div>
        <div class="title">
            <p class="title__city">${city}<span>, ${country}</span></p>
            <p class="tittle__date">${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}</p>
        </div>
        <div class="today">
            <div class="today__temperature">
                <p id="today__temperature">${temp_c}°</p>
            </div>
            <div class="today__icon">
                <img src=${condition_icon}>
            </div>
            <div class="today__details">
                <p>${condition_text}</p>
                <p id="feelslike">Feels like: ${feelslike_c}°</p>
                <p>Wind: ${wind}m/s </p>
                <p>Humidity: ${humidity}%</p>
            </div>
        </div>
        <div class="days">
            <div>
                <div class="days__day-of-week">
                    <p>${getElementAhead(1)}</p>
                </div>
                <div class="days__temperature">
                    <p id="temp_first_day">${temp_c_first_day}°</p>
                </div>
                <div class="days__icon">
                    <img src=${condition_first_day}>
                </div>
            </div>
            <div>
                <div class="days__day-of-week">
                    <p>${getElementAhead(1)}</p>
                </div>
                <div class="days__temperature">
                    <p id="temp_second_day">${temp_c_second_day}°</p>
                </div>
                <div class="days__icon">
                    <img src=${condition_second_day}>
                </div>
            </div>
            <div>
                <div class="days__day-of-week">
                    <p>${getElementAhead(1)}</p>
                </div>
                <div class="days__temperature">
                    <p id="temp_third_day">${temp_c_third_day}°</p>
                </div>
                <div class="days__icon">
                    <img src=${condition_third_day}>
                </div>
            </div>
        </div>
    </div>
    <div class="map">
        <div id="map"></div>
        <div class="map__coordinates">
            <p>Широта: 53°54'</p>
            <p>Долгота: 27°34'</p>
        </div>
    </div>
    </main>`
    const prev_data = document.querySelector('#main');
    if (prev_data) prev_data.remove();
    header.insertAdjacentHTML('afterend', html)
    input.value = ''
}

// Реализация изменения единиц измерения
function changeUnitsOfTemperature() {
    // Получаем все радио-кнопки с выбором температурной единицы
    const temperatureUnitRadios = document.querySelectorAll('input[name="unit-of-temperature"]');

    // Добавляем обработчик события на каждую радио-кнопку
    temperatureUnitRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'C') {
                // Действие, если выбраны градусы Цельсия
                console.log('Выбраны градусы Цельсия');
                document.getElementById("today__temperature").textContent = temp_c + "°";
                document.getElementById("feelslike").textContent = feelslike_c + "°"
                document.getElementById("temp_first_day").textContent = temp_c_first_day + "°"
                document.getElementById("temp_second_day").textContent = temp_c_second_day + "°"
                document.getElementById("temp_third_day").textContent = temp_c_third_day + "°"


            } else if (this.value === 'F') {
                // Действие, если выбраны градусы Фаренгейта
                console.log('Выбраны градусы Фаренгейта');
                document.getElementById("today__temperature").textContent = temp_f + "°";
                document.getElementById("feelslike").textContent = feelslike_f + "°"
                document.getElementById("temp_first_day").textContent = temp_f_first_day + "°"
                document.getElementById("temp_second_day").textContent = temp_f_second_day + "°"
                document.getElementById("temp_third_day").textContent = temp_f_third_day + "°"


            }
        })
    })
}


// создание стартовой страницы

async function startRender() {
    const response = await fetch("https://ipinfo.io/json?token=9bc0959d79615f");
    const jsonResponse = await response.json();
    city = jsonResponse.city;
    console.log(city)
    await getDataCurrent(apiKey, city);
    await getDataForecast(apiKey, city);
    render()
    changeUnitsOfTemperature()
}

// async function searchRender() {
//     city = input.value.trim()
//     await getDataCurrent(apiKey, city);
//     await getDataForecast(apiKey, city);
//     render()
//     changeUnitsOfTemperature()
// }



form.onsubmit = async function searchRender (event) {
    event.preventDefault(); // отменяем отправку формы
    city = input.value.trim()
    await getDataCurrent(apiKey, city);
    await getDataForecast(apiKey, city);
    render()
    changeUnitsOfTemperature()
}

startRender()



