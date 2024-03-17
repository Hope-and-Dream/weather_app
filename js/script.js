// API ключи
const apiKey = '176d1ae515e54fd4a0492612241003';
const apiKeyMaps = "a8c3d368-25c9-4b94-a57a-e93a32c8c939";
const apiKeyImg = "XvnEjzHMF292wkP5tfGbG2EYSvR4oltEGK6mJ-qG5bM";

//  HTML элементы
const wrapper = document.querySelector(".wrapper")
const header = document.querySelector("header");
const refreshBackground = document.querySelector(".option__refresh")
const today = document.querySelector(".today");
const form = document.querySelector("#search");
const input = document.querySelector("#search_city");
const UnitsOfTemperature = document.querySelector("#search_city");
const options = document.querySelectorAll('input[name="unit-of-temperature"]');

// Текущая дата, переменные
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fryday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let date;
console.log(date)
let currentDay;
let currentDate;
let currentMonth;
let currentHours;
let currentMinutes;
// let date;
// let currentYear;
// let currentMonth;
// let currentDate;
// let currentHours;
// let currentMinutes;
// let currentDay;
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
let latitude;
let latitudeRes;
let longitude;
let longitudeRes;
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
let dataUrlMap;
let dataUrlImg;

// дополнительные пермененные

let option_value;
let temp;
let feelslike;
let temp_first_day;
let temp_second_day;
let temp_third_day;


// функция полученися данных с API о текущей погоде

async function getDataCurrent(key, location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
    const response = await fetch(url);
    const currentWeather = await response.json();
    country = currentWeather.location.country;
    latitude = currentWeather.location.lat;
    longitude = currentWeather.location.lon;
    latitudeRes = String(latitude).split('.', 2);
    longitudeRes = String(longitude).split('.', 2);
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
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=4`;
    const response = await fetch(url);
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

// функция для получения карты с API (чтение данных)

function readAsync(data) {
    return new Promise(r => {
        var reader = new FileReader();
        reader.onloadend = function () {
            r(reader.result)
        }
        reader.readAsDataURL(data);
    });
}

// функция для получения карты с API (запрос)

async function getMap(key, latitude, longitude) {
    const url = `https://static-maps.yandex.ru/v1?ll=${longitude},${latitude}&size=450,450&z=13&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99&apikey=${key}`;
    const response = await fetch(url);
    const data = await response.blob();
    dataUrlMap = await readAsync(data);

}

// функция для получения фона

async function getImg(key) {
    const url = `https://api.unsplash.com//photos/random?query=nature&orientation=landscape&client_id=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    dataUrlImg = data.urls.regular;
    wrapper.style.backgroundImage = `url(${dataUrlImg})`
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
                <p id="today__temperature">${temp}°</p>
            </div>
            <div class="today__icon">
                <img src=${condition_icon}>
            </div>
            <div class="today__details">
                <p>${condition_text}</p>
                <p id="feelslike">Feels like: ${feelslike}°</p>
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
                    <p id="temp_first_day">${temp_first_day}°</p>
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
                    <p id="temp_second_day">${temp_second_day}°</p>
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
                    <p id="temp_third_day">${temp_third_day}°</p>
                </div>
                <div class="days__icon">
                    <img src=${condition_third_day}>
                </div>
            </div>
        </div>
    </div>
    <div class="map">
        <div>
        <img id="map" src="${dataUrlMap}">
        </div>
        <div class="map__coordinates">
            <p>Широта: ${latitudeRes[0]}°${latitudeRes[1]}'</p>
            <p>Долгота: ${longitudeRes[0]}° ${longitudeRes[1]}'</p>
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

    // Добавляем обработчик события на каждую радио-кнопку
    options.forEach(radio => {
        radio.addEventListener('change', function () {
            temperatureValue()
            render()
        })
    })
}

// реализация смена фона по нажатию кнопки

refreshBackground.addEventListener('click', async function () {
    await getImg(apiKeyImg);
    console.log(refreshBackground)
    wrapper.style.backgroundImage = `url(${dataUrlImg})`
})


// функция даты, времени и дня недели
const currentTime = () => {
    // currentYear = date.substring(0, 4);
    // currentMonth = date.substring(5, 7).replace("0", "");
    // currentDate = date.substring(8, 10);
    // currentHours = date.substring(11, 13);
    // currentMinutes = date.substring(14);
    // let date2 = new Date(currentYear, currentMonth, currentDate)
    // currentDay = date2.getDay()
    date = new Date();
    currentDay = date.getDay();
    currentDate = date.getDate();
    currentMonth = date.getMonth();
    currentHours = date.getHours();
    currentMinutes = date.getMinutes();
}


// определение текущих единиц измерения

const temperatureValue = () => {
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            option_value = options[i].value;
            break;
        }
    }
    if (option_value === "C") {
        temp = temp_c;
        feelslike = feelslike_c;
        temp_first_day = temp_c_first_day;
        temp_second_day = temp_c_second_day;
        temp_third_day = temp_c_third_day;
    } else if (option_value === "F") {
        temp = temp_f;
        feelslike = feelslike_f;
        temp_first_day = temp_f_first_day;
        temp_second_day = temp_f_second_day;
        temp_third_day = temp_f_third_day;
    }
}

// создание стартовой страницы

async function startRender() {
    const response = await fetch("https://ipinfo.io/json?token=9bc0959d79615f");
    const jsonResponse = await response.json();
    city = jsonResponse.city;
    console.log(city)
    await getDataCurrent(apiKey, city);
    await getDataForecast(apiKey, city);
    await getMap(apiKeyMaps, latitude, longitude);
    temperatureValue();
    await getImg(apiKeyImg);
    currentTime();
    render();
    changeUnitsOfTemperature()
    setInterval(async () => {
        const tittleDate = document.querySelector(".tittle__date")
        await getDataCurrent(apiKey, city);
        console.log(date)
        currentTime()
        tittleDate.textContent = `${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}`
    }, 1000)

}

// создание страницы по поисковому запросу
form.onsubmit = async function searchRender(event) {
    event.preventDefault(); // отменяем отправку формы
    city = input.value.trim()
    await getDataCurrent(apiKey, city);
    await getDataForecast(apiKey, city);
    await getMap(apiKeyMaps, latitude, longitude);
    console.log(temp_c)
    temperatureValue();
    await getImg(apiKeyImg);
    currentTime();
    render();
    changeUnitsOfTemperature();
    setTimeout(() => {
        currentTime()
        tittleDate.textContent = `${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}`
    }, 1000)

}

startRender()






