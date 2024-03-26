"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// API ключи
const apiKey = '176d1ae515e54fd4a0492612241003';
const apiKeyMaps = "a8c3d368-25c9-4b94-a57a-e93a32c8c939";
const apiKeyImg = "XvnEjzHMF292wkP5tfGbG2EYSvR4oltEGK6mJ-qG5bM";
//  HTML элементы
const wrapper = document.querySelector(".wrapper");
const header = document.querySelector("header");
const refreshBackground = document.querySelector(".option__refresh");
const today = document.querySelector(".today");
const form = document.querySelector("#search");
const input = document.querySelector("#search_city");
const UnitsOfTemperature = document.querySelector("#search_city");
const options = document.querySelectorAll('input[name="unit-of-temperature"]');
// Текущая дата, переменные
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fryday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let date;
let currentDay;
let currentDate, currentMonth, currentHours, currentMinutes;
function getElementAhead(positions) {
    const nextDay = (currentDay + positions) % days.length;
    currentDay = nextDay;
    return days[nextDay];
}
let city, country, cityName;
let time;
let latitude, latitudeRes, longitude, longitudeRes, temp_c, temp_f, feelslike_c, feelslike_f, humidity, wind;
let condition_text, condition_icon;
let temp_c_first_day, temp_f_first_day, temp_c_second_day, temp_f_second_day, temp_c_third_day, temp_f_third_day;
let condition_first_day, condition_second_day, condition_third_day;
let dataUrlMap;
let dataUrlImg;
// дополнительные пермененные
let option_value;
let temp, feelslike, temp_first_day, temp_second_day, temp_third_day;
let UpdateTime;
let cityCurrent, cityDate;
// функция полученися данных с API о текущей погоде
function getDataCurrent(key, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
        const response = yield fetch(url);
        const currentWeather = yield response.json();
        country = currentWeather.location.country;
        cityName = currentWeather.location.name;
        cityDate = currentWeather.location.localtime;
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
    });
}
// функция полученися данных с API о погоде на 3 дня вперед
function getDataForecast(key, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3`;
        const response = yield fetch(url);
        const forecastWeather = yield response.json();
        temp_c_first_day = Math.round(forecastWeather.forecast.forecastday[0].day.avgtemp_c);
        temp_f_first_day = Math.round(forecastWeather.forecast.forecastday[0].day.avgtemp_f);
        condition_first_day = forecastWeather.forecast.forecastday[0].day.condition.icon;
        temp_c_second_day = Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_c);
        temp_f_second_day = Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_f);
        condition_second_day = forecastWeather.forecast.forecastday[1].day.condition.icon;
        temp_c_third_day = Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_c);
        temp_f_third_day = Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_f);
        condition_third_day = forecastWeather.forecast.forecastday[2].day.condition.icon;
    });
}
// функция для получения карты с API (чтение данных)
function readAsync(data) {
    return new Promise(r => {
        var reader = new FileReader();
        reader.onloadend = function () {
            r(reader.result);
        };
        reader.readAsDataURL(data);
    });
}
// функция для получения карты с API (запрос)
function getMap(key, latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://static-maps.yandex.ru/v1?ll=${longitude},${latitude}&size=450,450&z=13&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99&apikey=${key}`;
        const response = yield fetch(url);
        const data = yield response.blob();
        dataUrlMap = yield readAsync(data);
    });
}
// функция для получения фона
function getImg(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.unsplash.com//photos/random?query=nature&orientation=landscape&client_id=${key}`;
        const response = yield fetch(url);
        const data = yield response.json();
        dataUrlImg = data.urls.regular;
        wrapper.style.backgroundImage = `url(${dataUrlImg})`;
    });
}
// функция отрисовки HTML
function render() {
    console.log("день в начале функции рендер " + currentDay);
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
                    <p>${getElementAhead(0)}</p>
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
    </main>`;
    console.log("день в конце функции рендер " + currentDay);
    const prev_data = document.querySelector('#main');
    if (prev_data)
        prev_data.remove();
    header.insertAdjacentHTML('afterend', html);
    // input.value = ''
    console.log("день в самом конце функции рендер " + currentDay);
}
// Реализация изменения единиц измерения
function changeUnitsOfTemperature() {
    // Добавляем обработчик события на каждую радио-кнопку
    options.forEach(radio => {
        radio.addEventListener('change', function () {
            temperatureValue();
            render();
            console.log("отрисовка после изменения температуры произошла");
        });
    });
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
    }
    else if (option_value === "F") {
        temp = temp_f;
        feelslike = feelslike_f;
        temp_first_day = temp_f_first_day;
        temp_second_day = temp_f_second_day;
        temp_third_day = temp_f_third_day;
    }
    console.log("расчитаны все температуры");
};
// реализация смена фона по нажатию кнопки
refreshBackground.addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // await getImg(apiKeyImg);
        wrapper.style.backgroundImage = `url(${dataUrlImg})`;
    });
});
// функция даты, времени и дня недели в локации пользователя
const currentTime = () => {
    date = new Date();
    currentDay = date.getDay();
    currentDate = date.getDate();
    currentMonth = date.getMonth();
    currentHours = date.getHours();
    currentMinutes = date.getMinutes();
    if (String(currentMinutes).length === 1) {
        currentMinutes = Number("0" + currentMinutes);
    }
    if (String(currentHours).length === 1) {
        currentHours = Number("0" + currentHours);
    }
    console.log("текущее время пользователя определено");
};
//функция даты, времени и дня недели в локации по поиску
const currentCityTime = () => {
    const currentYear = String(cityDate).slice(0, 4);
    currentMonth = Number(cityDate.slice(5, 7)) - 1;
    if (String(currentMonth).startsWith('0')) {
        currentMonth = Number(String(currentMonth).slice(1));
    }
    currentDate = Number(String(cityDate).slice(8, 10));
    date = new Date();
    currentMinutes = date.getMinutes();
    date = new Date(Number(currentYear), currentMonth, currentDate);
    currentDay = date.getDay();
    currentHours = Number(String(cityDate).slice(11, 13));
    if (String(currentMinutes).length === 1) {
        currentMinutes = Number("0" + currentMinutes);
    }
    if (String(currentHours).endsWith(':')) {
        currentHours = Number("0" + String(currentHours).slice(0, 1));
    }
    console.log("текущее время в городе поиска определено");
};
// создание стартовой страницы
function startRender() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://ipinfo.io/json?token=9bc0959d79615f");
        const jsonResponse = yield response.json();
        city = jsonResponse.city;
        yield getDataCurrent(apiKey, city);
        yield getDataForecast(apiKey, city);
        yield getMap(apiKeyMaps, latitude, longitude);
        temperatureValue();
        yield getImg(apiKeyImg);
        currentTime();
        render();
        cityCurrent = city;
        changeUnitsOfTemperature();
        UpdateTime = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            // console.log("Таймер для последнего местоположения")
            const tittleDate = document.querySelector(".tittle__date");
            yield getDataCurrent(apiKey, city);
            currentTime();
            tittleDate.textContent = `${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}`;
        }), 1000);
    });
}
// создание страницы по поисковому запросу
form.onsubmit = function searchRender(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault(); // отменяем отправку формы
        city = input.value.trim();
        try {
            yield getDataCurrent(apiKey, city);
            yield getDataForecast(apiKey, city);
            yield getMap(apiKeyMaps, latitude, longitude);
            yield getImg(apiKeyImg);
        }
        catch (error) {
            alert("Проверьте правильность ввода");
            console.log(error);
            input.value = '';
            city = cityCurrent;
            clearTimeout(UpdateTime);
            UpdateTime = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                // console.log("Таймер для последнего местоположения при ошибочном вводе")
                const tittleDate = document.querySelector(".tittle__date");
                yield getDataCurrent(apiKey, city);
                currentTime();
                tittleDate.textContent = `${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}`;
            }), 1000);
        }
        cityCurrent = city;
        temperatureValue();
        currentCityTime();
        render();
        changeUnitsOfTemperature();
        clearTimeout(UpdateTime);
        UpdateTime = setInterval(() => {
            // console.log("Таймер для местоположения по поиску")
            currentCityTime();
            const tittleDate = document.querySelector(".tittle__date");
            tittleDate.textContent = `${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}`;
        }, 1000);
    });
};
startRender();
