const apiKey = '176d1ae515e54fd4a0492612241003';
const apiKeyMaps = "7d34c100-dd2f-42b1-8c0a-d17b16ffd716";
const header = document.querySelector("header");
const today = document.querySelector(".today");
const form = document.querySelector("#search");
const input = document.querySelector("#search_city");
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fryday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



let date = new Date();
let currentDay = date.getDay();
let currentDate = date.getDate();
let currentMonth = date.getMonth();
let currentHours = date.getHours();
let currentMinutes = date.getMinutes();

function getElementAhead(positions) {
    const nextDay = (currentDay + positions) % days.length;
    currentDay = nextDay;
    return days[nextDay];
}

fetch("https://ipinfo.io/json?token=9bc0959d79615f").then(
    (response) => response.json()
).then(
    (jsonResponse) => {
        let city = jsonResponse.city;
        const url_1 = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const url_2 = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4`;
        // const url_3 = ` https://api-maps.yandex.ru/v3/?apikey=${apiKeyMaps}&lang=ru_RU`;
        Promise.all([
            fetch(url_1),
            fetch(url_2),
            // fetch(url_3, {
            //     mode: 'no-cors'
            //   } ),
        ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(data => {
                let currentWeather = data[0];
                let forecastWeather = data[1];
                let country = currentWeather.location.country;
                let temp = currentWeather.current.temp_c;
                let condition_text = currentWeather.current.condition.text;
                let condition_icon = currentWeather.current.condition.icon;
                let feelslike = currentWeather.current.feelslike_c;
                let humidity = currentWeather.current.humidity;
                let wind = Math.round(currentWeather.current.wind_kph * 1000 / 3600); //в км/ч
                let date_first_day = forecastWeather.forecast.forecastday[1].date;
                let temp_first_day = Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_c);
                let condition_first_day = forecastWeather.forecast.forecastday[1].day.condition.icon;
                let temp_second_day = Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_c);
                let condition_second_day = forecastWeather.forecast.forecastday[2].day.condition.icon;
                let temp_third_day = Math.round(forecastWeather.forecast.forecastday[3].day.avgtemp_c);
                let condition_third_day = forecastWeather.forecast.forecastday[3].day.condition.icon;

                // initMap();

                // async function initMap() {
                //     // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
                //     await ymaps3.ready;

                //     const { YMap, YMapDefaultSchemeLayer } = ymaps3;

                //     // Иницилиазируем карту
                //     const map = new YMap(
                //         // Передаём ссылку на HTMLElement контейнера
                //         document.getElementById('map'),

                //         // Передаём параметры инициализации карты
                //         {
                //             location: {
                //                 // Координаты центра карты
                //                 center: [37.588144, 55.733842],

                //                 // Уровень масштабирования
                //                 zoom: 10
                //             }
                //         }
                //     );

                //     // Добавляем слой для отображения схематической карты
                //     map.addChild(new YMapDefaultSchemeLayer());
                // }
                // Здесь можно продолжить обработку данных или выводить их на экран
                const html = ` <main id="main">
<div>
    <div class="title">
        <p class="title__city">${city}<span>, ${country}</span></p>
        <p class="tittle__date">${days[currentDay].substring(0, 3)} ${currentDate} ${months[currentMonth]} ${currentHours}:${currentMinutes}</p>
    </div>
    <div class="today">
        <div class="today__temperature">
            <p>${temp}°</p>
        </div>
        <div class="today__icon">
            <img src=${condition_icon}>
        </div>
        <div class="today__details">
            <p>${condition_text}</p>
            <p>Feels like: ${feelslike}°</p>
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
                <p>${temp_first_day}°</p>
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
                <p>${temp_second_day}°</p>
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
                <p>${temp_third_day}°</p>
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
                header.insertAdjacentHTML('afterend', html)
                input.value = ''
            })
        // .catch(error => console.error('Ошибка при получении данных:', error));
    })

form.onsubmit = function (event) {
    event.preventDefault(); // отменяем отправку формы
    // let city
    city = input.value.trim()
    console.log(city)
    const url_1 = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const url_2 = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4`;
    Promise.all([
        fetch(url_1),
        fetch(url_2)
    ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            let currentWeather = data[0];
            let forecastWeather = data[1];

            let country = currentWeather.location.country;
            let temp = currentWeather.current.temp_c;
            let condition_text = currentWeather.current.condition.text;
            let condition_icon = currentWeather.current.condition.icon;
            let feelslike = currentWeather.current.feelslike_c;
            let humidity = currentWeather.current.humidity;
            let wind = Math.round(currentWeather.current.wind_kph * 1000 / 3600); //в км/ч
            let temp_first_day = Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_c);
            let condition_first_day = forecastWeather.forecast.forecastday[1].day.condition.icon;
            let temp_second_day = Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_c);
            let condition_second_day = forecastWeather.forecast.forecastday[2].day.condition.icon;
            let temp_third_day = Math.round(forecastWeather.forecast.forecastday[3].day.avgtemp_c);
            let condition_third_day = forecastWeather.forecast.forecastday[3].day.condition.icon;

            // Здесь можно продолжить обработку данных или выводить их на экран
            const html = ` <main id="main">
    <div>
        <div class="title">
            <p class="title__city">${city}<span>, ${country}</span></p>
            <p class="tittle__date">Tue 05 march 13:31</p>
        </div>
        <div class="today">
            <div class="today__temperature">
                <p>${temp}°</p>
            </div>
            <div class="today__icon">
                <img src=${condition_icon}>
            </div>
            <div class="today__details">
                <p>${condition_text}</p>
                <p>Feels like: ${feelslike}°</p>
                <p>Wind: ${wind}m/s </p>
                <p>Humidity: ${humidity}%</p>
            </div>
        </div>
        <div class="days">
            <div>
                <div class="days__day-of-week">
                    <p>Wednesday</p>
                </div>
                <div class="days__temperature">
                    <p>${temp_first_day}°</p>
                </div>
                <div class="days__icon">
                    <img src=${condition_first_day}>
                </div>
            </div>
            <div>
                <div class="days__day-of-week">
                    <p>Thursday</p>
                </div>
                <div class="days__temperature">
                    <p>${temp_second_day}°</p>
                </div>
                <div class="days__icon">
                    <img src=${condition_second_day}>
                </div>
            </div>
            <div>
                <div class="days__day-of-week">
                    <p>Friday</p>
                </div>
                <div class="days__temperature">
                    <p>${temp_third_day}°</p>
                </div>
                <div class="days__icon">
                    <img src=${condition_third_day}>
                </div>
            </div>
        </div>
    </div>
    <div class="map"><div id="map">
        </div>
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
        })
    // .catch(error => console.error('Ошибка при получении данных:', error));
}




