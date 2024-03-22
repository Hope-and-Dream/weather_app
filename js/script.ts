// API ключи
const apiKey = '176d1ae515e54fd4a0492612241003';
const apiKeyMaps = "a8c3d368-25c9-4b94-a57a-e93a32c8c939";
const apiKeyImg = "XvnEjzHMF292wkP5tfGbG2EYSvR4oltEGK6mJ-qG5bM";

//  HTML элементы
const wrapper = document.querySelector(".wrapper") as HTMLElement;
const header = document.querySelector("header") as HTMLElement;
const refreshBackground = document.querySelector(".option__refresh") as HTMLElement;
const today = document.querySelector(".today") as HTMLElement;
const form = document.querySelector("#search") as HTMLElement;
const input = document.querySelector("#search_city") as HTMLInputElement;
const UnitsOfTemperature = document.querySelector("#search_city") as HTMLElement;
const options: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="unit-of-temperature"]');

// Текущая дата, переменные
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fryday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let date: Date;
let currentDay: number;
let currentDate: number, currentMonth: number, currentHours: number, currentMinutes: number;

function getElementAhead(positions: number) {
    const nextDay = (currentDay + positions) % days.length;
    currentDay = nextDay;
    return days[nextDay];
}

// переменные для сохранения информации с API

interface currentWeather {
    location: Location;
    current: Current;
}

interface Location {
    name: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
}


interface Current {
    temp_c: number;
    temp_f: number;
    condition: Condition;
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
}

interface Condition {
    text: string;
    icon: string;
}

let city: string, country: string, cityName: string;
let time: string;
let latitude: number, latitudeRes:string[], longitude: number, longitudeRes: string[], temp_c:number, temp_f: number, feelslike_c: number, feelslike_f: number, humidity:number, wind:number;
let condition_text: string, condition_icon: string;

interface forecastWeather{
    location: Location;
    forecast: Forecast;

}

interface Forecast {
    forecastday: ForecastDay[];
  }

interface ForecastDay {
    date: string;
    day: DayData;
  }

interface DayData {
    avgtemp_c: number;
    avgtemp_f: number;
    condition: Condition;
  }

  

let temp_c_first_day: number, temp_f_first_day: number, temp_c_second_day: number, temp_f_second_day: number, temp_c_third_day: number, temp_f_third_day: number;
let condition_first_day: string, condition_second_day: string, condition_third_day: string;
let dataUrlMap: any;
let dataUrlImg: string;

// дополнительные пермененные

let option_value: string;
let temp: number, feelslike: number, temp_first_day: number, temp_second_day: number, temp_third_day: number;
let UpdateTime: number;
let cityCurrent: string, cityDate: string;


// функция полученися данных с API о текущей погоде

async function getDataCurrent(key:string, location:string) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
    const response = await fetch(url);
    const currentWeather = await response.json();
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
}

// функция полученися данных с API о погоде на 3 дня вперед

async function getDataForecast(key:string, location:string) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=4`;
    const response = await fetch(url);
    const forecastWeather = await response.json();
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

function readAsync(data:Blob) {
    return new Promise(r => {
        var reader = new FileReader();
        reader.onloadend = function () {
            r(reader.result)
        }
        reader.readAsDataURL(data);
    });
}

// функция для получения карты с API (запрос)

async function getMap(key:string, latitude: number, longitude:number) {
    const url = `https://static-maps.yandex.ru/v1?ll=${longitude},${latitude}&size=450,450&z=13&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99&apikey=${key}`;
    const response = await fetch(url);
    const data = await response.blob();
    dataUrlMap = await readAsync(data);
    

}

// функция для получения фона

async function getImg(key:string) {
    const url = `https://api.unsplash.com//photos/random?query=nature&orientation=landscape&client_id=${key}`;
    const response = await fetch(url);
    const data = await response.json();
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
            // clearTimeout(UpdateTime);
            temperatureValue()
            render()
        })
    })
}

// реализация смена фона по нажатию кнопки
refreshBackground.addEventListener('click', async function () {
    // await getImg(apiKeyImg);
    wrapper.style.backgroundImage = `url(${dataUrlImg})`
})


// функция даты, времени и дня недели в локации пользователя
const currentTime = () => {
    date = new Date()
    currentDay = date.getDay();
    currentDate = date.getDate();
    currentMonth = date.getMonth();
    currentHours = date.getHours();
    currentMinutes = date.getMinutes();
    if (String(currentMinutes).length === 1) {
        currentMinutes = Number("0" + currentMinutes)
    }
    if (String(currentHours).length === 1) {
        currentHours =Number( "0" + currentHours)
    }
}

//функция даты, времени и дня недели в локации по поиску

const currentCityTime = () => {
    const currentYear = String(cityDate).slice(0, 4);
    currentMonth = Number(cityDate.slice(5, 7))-1;
    if (String(currentMonth).startsWith('0')) {
        currentMonth = Number(String(currentMonth).slice(1));
    }
    currentDate = Number(String(cityDate).slice(8, 10));
    date = new Date()
    currentMinutes = date.getMinutes();
    date = new Date(Number(currentYear), currentMonth, currentDate)
    currentDay = date.getDay();
    currentHours = Number(String(cityDate).slice(11, 13));
    if (String(currentMinutes).length === 1) {
        currentMinutes = Number("0" + currentMinutes)
    }
    if (String(currentHours).endsWith(':')) {
        currentHours = Number("0" + String(currentHours).slice(0,1))
    }

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
    await getDataCurrent(apiKey, city);
    await getDataForecast(apiKey, city);
    await getMap(apiKeyMaps, latitude, longitude);
    temperatureValue();
    // await getImg(apiKeyImg);
    currentTime();
    render();
    cityCurrent = city;
    changeUnitsOfTemperature()
    UpdateTime = setInterval(async () => {
        // console.log("Таймер для последнего местоположения")
        const tittleDate = document.querySelector(".tittle__date") as HTMLElement;
        await getDataCurrent(apiKey, city);
        currentTime()
        tittleDate.textContent = `${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}`
    }, 1000)
}

// создание страницы по поисковому запросу
form.onsubmit = async function searchRender(event) {
    event.preventDefault(); // отменяем отправку формы
    city = input.value.trim()
    try {
        await getDataCurrent(apiKey, city);
        await getDataForecast(apiKey, city);
        await getMap(apiKeyMaps, latitude, longitude);
        // await getImg(apiKeyImg);
    } catch (error) {
        alert("Проверьте правильность ввода");
        console.log(error)
        input.value = '';
        city = cityCurrent;
        clearTimeout(UpdateTime);
        UpdateTime = setInterval(async () => {
            // console.log("Таймер для последнего местоположения при ошибочном вводе")
            const tittleDate = document.querySelector(".tittle__date") as HTMLElement;
            await getDataCurrent(apiKey, city);
            currentTime()
            tittleDate.textContent = `${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}`
        }, 1000)
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
        const tittleDate = document.querySelector(".tittle__date") as HTMLElement;
        tittleDate.textContent = `${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}`
    }, 1000)
}
startRender()
