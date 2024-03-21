var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// API ключи
var apiKey = '176d1ae515e54fd4a0492612241003';
var apiKeyMaps = "a8c3d368-25c9-4b94-a57a-e93a32c8c939";
var apiKeyImg = "XvnEjzHMF292wkP5tfGbG2EYSvR4oltEGK6mJ-qG5bM";
//  HTML элементы
var wrapper = document.querySelector(".wrapper");
var header = document.querySelector("header");
var refreshBackground = document.querySelector(".option__refresh");
var today = document.querySelector(".today");
var form = document.querySelector("#search");
var input = document.querySelector("#search_city");
var UnitsOfTemperature = document.querySelector("#search_city");
var options = document.querySelectorAll('input[name="unit-of-temperature"]');
// Текущая дата, переменные
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Fryday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var date;
var currentDay;
var currentDate, currentMonth, currentHours, currentMinutes;
function getElementAhead(positions) {
    var nextDay = (currentDay + positions) % days.length;
    currentDay = nextDay;
    return days[nextDay];
}
var city, country, cityName;
var time;
var latitude, latitudeRes, longitude, longitudeRes, temp_c, temp_f, feelslike_c, feelslike_f, humidity, wind;
var condition_text, condition_icon;
var temp_c_first_day, temp_f_first_day, temp_c_second_day, temp_f_second_day, temp_c_third_day, temp_f_third_day;
var condition_first_day, condition_second_day, condition_third_day;
var dataUrlMap;
var dataUrlImg;
// дополнительные пермененные
var option_value;
var temp, feelslike, temp_first_day, temp_second_day, temp_third_day;
var UpdateTime;
var cityCurrent, cityDate;
// функция полученися данных с API о текущей погоде
function getDataCurrent(key, location) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, currentWeather;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://api.weatherapi.com/v1/current.json?key=".concat(key, "&q=").concat(location);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    currentWeather = _a.sent();
                    console.log(currentWeather);
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
                    return [2 /*return*/];
            }
        });
    });
}
// функция полученися данных с API о погоде на 3 дня вперед
function getDataForecast(key, location) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, forecastWeather;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.weatherapi.com/v1/forecast.json?key=".concat(key, "&q=").concat(location, "&days=4");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    forecastWeather = _a.sent();
                    temp_c_first_day = Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_c);
                    temp_f_first_day = Math.round(forecastWeather.forecast.forecastday[1].day.avgtemp_f);
                    condition_first_day = forecastWeather.forecast.forecastday[1].day.condition.icon;
                    temp_c_second_day = Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_c);
                    temp_f_second_day = Math.round(forecastWeather.forecast.forecastday[2].day.avgtemp_f);
                    condition_second_day = forecastWeather.forecast.forecastday[2].day.condition.icon;
                    temp_c_third_day = Math.round(forecastWeather.forecast.forecastday[3].day.avgtemp_c);
                    temp_f_third_day = Math.round(forecastWeather.forecast.forecastday[3].day.avgtemp_f);
                    condition_third_day = forecastWeather.forecast.forecastday[3].day.condition.icon;
                    return [2 /*return*/];
            }
        });
    });
}
// функция для получения карты с API (чтение данных)
function readAsync(data) {
    return new Promise(function (r) {
        var reader = new FileReader();
        reader.onloadend = function () {
            r(reader.result);
        };
        reader.readAsDataURL(data);
    });
}
// функция для получения карты с API (запрос)
function getMap(key, latitude, longitude) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://static-maps.yandex.ru/v1?ll=".concat(longitude, ",").concat(latitude, "&size=450,450&z=13&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99&apikey=").concat(key);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.blob()];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, readAsync(data)];
                case 3:
                    dataUrlMap = _a.sent();
                    console.log(dataUrlMap);
                    return [2 /*return*/];
            }
        });
    });
}
// функция для получения фона
function getImg(key) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.unsplash.com//photos/random?query=nature&orientation=landscape&client_id=".concat(key);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    // console.log(data)
                    dataUrlImg = data.urls.regular;
                    wrapper.style.backgroundImage = "url(".concat(dataUrlImg, ")");
                    return [2 /*return*/];
            }
        });
    });
}
// функция отрисовки HTML
function render() {
    var html = " <main id=\"main\">\n    <div>\n        <div class=\"title\">\n            <p class=\"title__city\">".concat(city, "<span>, ").concat(country, "</span></p>\n\n            <p class=\"tittle__date\">").concat(days[currentDay].substring(0, 3), " ").concat(currentDate, " ").concat(months[currentMonth], " ").concat(currentHours, ":").concat(currentMinutes, "</p>\n        </div>\n        <div class=\"today\">\n            <div class=\"today__temperature\">\n                <p id=\"today__temperature\">").concat(temp, "\u00B0</p>\n            </div>\n            <div class=\"today__icon\">\n                <img src=").concat(condition_icon, ">\n            </div>\n            <div class=\"today__details\">\n                <p>").concat(condition_text, "</p>\n                <p id=\"feelslike\">Feels like: ").concat(feelslike, "\u00B0</p>\n                <p>Wind: ").concat(wind, "m/s </p>\n                <p>Humidity: ").concat(humidity, "%</p>\n            </div>\n        </div>\n        <div class=\"days\">\n            <div>\n                <div class=\"days__day-of-week\">\n                    <p>").concat(getElementAhead(1), "</p>\n                </div>\n                <div class=\"days__temperature\">\n                    <p id=\"temp_first_day\">").concat(temp_first_day, "\u00B0</p>\n                </div>\n                <div class=\"days__icon\">\n                    <img src=").concat(condition_first_day, ">\n                </div>\n            </div>\n            <div>\n                <div class=\"days__day-of-week\">\n                    <p>").concat(getElementAhead(1), "</p>\n                </div>\n                <div class=\"days__temperature\">\n                    <p id=\"temp_second_day\">").concat(temp_second_day, "\u00B0</p>\n                </div>\n                <div class=\"days__icon\">\n                    <img src=").concat(condition_second_day, ">\n                </div>\n            </div>\n            <div>\n                <div class=\"days__day-of-week\">\n                    <p>").concat(getElementAhead(1), "</p>\n                </div>\n                <div class=\"days__temperature\">\n                    <p id=\"temp_third_day\">").concat(temp_third_day, "\u00B0</p>\n                </div>\n                <div class=\"days__icon\">\n                    <img src=").concat(condition_third_day, ">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"map\">\n        <div>\n        <img id=\"map\" src=\"").concat(dataUrlMap, "\">\n        </div>\n        <div class=\"map__coordinates\">\n            <p>\u0428\u0438\u0440\u043E\u0442\u0430: ").concat(latitudeRes[0], "\u00B0").concat(latitudeRes[1], "'</p>\n            <p>\u0414\u043E\u043B\u0433\u043E\u0442\u0430: ").concat(longitudeRes[0], "\u00B0 ").concat(longitudeRes[1], "'</p>\n        </div>\n    </div>\n    </main>");
    var prev_data = document.querySelector('#main');
    if (prev_data)
        prev_data.remove();
    header.insertAdjacentHTML('afterend', html);
    input.value = '';
}
// Реализация изменения единиц измерения
function changeUnitsOfTemperature() {
    // Добавляем обработчик события на каждую радио-кнопку
    options.forEach(function (radio) {
        radio.addEventListener('change', function () {
            temperatureValue();
            render();
        });
    });
}
// реализация смена фона по нажатию кнопки
refreshBackground.addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // await getImg(apiKeyImg);
            // console.log(refreshBackground)
            wrapper.style.backgroundImage = "url(".concat(dataUrlImg, ")");
            return [2 /*return*/];
        });
    });
});
// функция даты, времени и дня недели в локации пользователя
var currentTime = function () {
    date = new Date();
    // console.log(date)
    currentDay = date.getDay();
    currentDate = date.getDate();
    currentMonth = date.getMonth();
    console.log(currentMonth);
    currentHours = date.getHours();
    currentMinutes = date.getMinutes();
    if (String(currentMinutes).length === 1) {
        currentMinutes = Number("0" + currentMinutes);
    }
    if (String(currentHours).length === 1) {
        currentHours = Number("0" + currentHours);
    }
};
//функция даты, времени и дня недели в локации по поиску
var currentCityTime = function () {
    // console.log("дата локации поиска")
    console.log(cityDate + "дата полученная из API");
    var currentYear = String(cityDate).slice(0, 4);
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
};
// определение текущих единиц измерения
var temperatureValue = function () {
    for (var i = 0; i < options.length; i++) {
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
};
// создание стартовой страницы
function startRender() {
    return __awaiter(this, void 0, void 0, function () {
        var response, jsonResponse;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://ipinfo.io/json?token=9bc0959d79615f")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    jsonResponse = _a.sent();
                    city = jsonResponse.city;
                    // console.log(city)
                    return [4 /*yield*/, getDataCurrent(apiKey, city)];
                case 3:
                    // console.log(city)
                    _a.sent();
                    return [4 /*yield*/, getDataForecast(apiKey, city)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, getMap(apiKeyMaps, latitude, longitude)];
                case 5:
                    _a.sent();
                    temperatureValue();
                    // await getImg(apiKeyImg);
                    currentTime();
                    render();
                    cityCurrent = city;
                    changeUnitsOfTemperature();
                    UpdateTime = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var tittleDate;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    tittleDate = document.querySelector(".tittle__date");
                                    return [4 /*yield*/, getDataCurrent(apiKey, city)];
                                case 1:
                                    _a.sent();
                                    // console.log(date)
                                    currentTime();
                                    tittleDate.textContent = "".concat(days[currentDay].substring(0, 3), " ").concat(currentDate, " ").concat(months[currentMonth], " ").concat(currentHours, ":").concat(currentMinutes);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    return [2 /*return*/];
            }
        });
    });
}
// создание страницы по поисковому запросу
form.onsubmit = function searchRender(event) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault(); // отменяем отправку формы
                    city = input.value.trim();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, getDataCurrent(apiKey, city)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, getDataForecast(apiKey, city)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, getMap(apiKeyMaps, latitude, longitude)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    alert("Проверьте правильность ввода");
                    console.log(error_1);
                    input.value = '';
                    city = cityCurrent;
                    clearTimeout(UpdateTime);
                    UpdateTime = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var tittleDate;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    tittleDate = document.querySelector(".tittle__date");
                                    return [4 /*yield*/, getDataCurrent(apiKey, city)];
                                case 1:
                                    _a.sent();
                                    currentTime();
                                    tittleDate.textContent = "".concat(days[currentDay].substring(0, 3), " ").concat(currentDate, " ").concat(months[currentMonth], " ").concat(currentHours, ":").concat(currentMinutes);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    return [3 /*break*/, 6];
                case 6:
                    cityCurrent = city;
                    temperatureValue();
                    currentCityTime();
                    render();
                    changeUnitsOfTemperature();
                    clearTimeout(UpdateTime);
                    UpdateTime = setInterval(function () {
                        // console.log("Таймер для местоположения по поиску")
                        currentCityTime();
                        var tittleDate = document.querySelector(".tittle__date");
                        tittleDate.textContent = "".concat(days[currentDay].substring(0, 3), " ").concat(currentDate, " ").concat(months[currentMonth], " ").concat(currentHours, ":").concat(currentMinutes);
                    }, 1000);
                    return [2 /*return*/];
            }
        });
    });
};
startRender();
