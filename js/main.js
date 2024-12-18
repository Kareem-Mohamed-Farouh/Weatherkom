//  selector element of today

var todayName = document.querySelector(".today-name");
var todayDate = document.querySelector(".today-date");
var locationn = document.querySelector(".location");
var tempToday = document.querySelector(".temp-today");
var iconDay = document.querySelector(".icon-day");
var statuss = document.querySelector(".status");
var rotoba = document.querySelector(".rotoba");
var wind = document.querySelector(".wind");
var windDir = document.querySelector(".wind-dir");

//  selector element of tommorow
var tomorrowName = document.querySelector(".tomorrow-name");
var iconTomorow = document.querySelector(".icon-tomorow");
var tempTommorowMax = document.querySelector(".temp-tommorow-max");
var tempTommorowMin = document.querySelector(".temp-tommorow-min");
var statusTommorow = document.querySelector(".statusTommorow ");

//  selector element of after tommorow
var aftTomorrowName = document.querySelector(".after-tomorrow-name");
var iconAfterTomorow = document.querySelector(".icon-aft-tomorrow");
var tempAfterMax = document.querySelector(".temp-aft-max");
var tempAfterMin = document.querySelector(".temp-aft-min");
var statusaft = document.querySelector(".status-aft");

//-----------to get current location---------------
navigator.geolocation.getCurrentPosition((position) => {
  var mylat = position.coords.latitude;
  var mylong = position.coords.longitude;

  getweatherdata(`${mylat},${mylong}`);
});
//=========== fetch api and get data ============
async function getweatherdata(longandlat) {
  var req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1a21bb291a3b4fc6941123821241312&q=${longandlat}&days=3&aqi=no&alerts=no`
  );
  http = await req.json();
  // req.json()  // method json return json object
  console.log(http);
  displayWeathertoday(http);
  displayWeathertommorow(http);
  displayWeatherAfterTommorow(http);
}
// ============displayWeathertoday==========
function displayWeathertoday(http) {
  var todaydate = http.current.last_updated; //2024-12-18 14:30
  console.log(todaydate); //2024-12-18 14:30
  let mydate = new Date(todaydate);
  let todayname = mydate.toLocaleString("en-us", { weekday: "long" }); //sunday
  let todaydatee = mydate.toLocaleString("en-us", { month: "long" }); //may
  let todayday = mydate.getDate(); //17
  todayName.innerHTML = todayname;
  todayDate.innerHTML = todayday + " " + todaydatee;

  locationn.innerHTML = http.location.region;
  tempToday.innerHTML = http.current.temp_c + `<sup>o</sup>C`;

  let icon = `https:` + http.current.condition.icon;
  iconDay.setAttribute("src", icon);
  statuss.innerHTML = http.current.condition.text;
  rotoba.innerHTML = http.current.humidity + ` %`; // 56%
  wind.innerHTML = http.current.wind_kph + ` km/h`; //14km/h
  windDir.innerHTML = http.current.wind_dir; //NE
}
function displayWeathertommorow(http) {
  let data = http.forecast.forecastday[1].date;
  let tommorowname = new Date(data);
  tomorrowName.innerHTML = tommorowname.toLocaleString("en-us", {
    weekday: "long",
  });

  let icon2morow = http.forecast.forecastday[1].day.condition.icon;
  iconTomorow.setAttribute("src", `https:${icon2morow}`);

  // max tempretur of tomorrow
  let maxtemp = http.forecast.forecastday[1].day.maxtemp_c;
  tempTommorowMax.innerHTML = `${maxtemp} <sup>o</sup>C`;
  // MIN tempretur of tomorrow

  let mintemp = http.forecast.forecastday[1].day.mintemp_c;
  tempTommorowMin.innerHTML = `${mintemp} <sup>o</sup>C`;

  let text2morow = http.forecast.forecastday[1].day.condition.text;
  // console.log(text2morow); //Patchy rain nearby

  statusTommorow.innerHTML = text2morow;
}
function displayWeatherAfterTommorow(http) {
  let data = http.forecast.forecastday[2].date;
  let afterTommorowname = new Date(data);
  aftTomorrowName.innerHTML = afterTommorowname.toLocaleString("en-us", {
    weekday: "long",
  });

  var aftericon2morow = http.forecast.forecastday[2].day.condition.icon;
  iconAfterTomorow.setAttribute("src", `https:${aftericon2morow}`);

  // max tempretur of tomorrow
  var maxtemp = http.forecast.forecastday[2].day.maxtemp_c;
  tempAfterMax.innerHTML = `${maxtemp} <sup>o</sup>C`;
  // MIN tempretur of tomorrow

  var mintemp = http.forecast.forecastday[2].day.mintemp_c;
  tempAfterMin.innerHTML = `${mintemp} <sup>o</sup>C`;

  var text2morow = http.forecast.forecastday[2].day.condition.text;
  // console.log(text2morow); //Patchy rain nearby

  statusaft.innerHTML = text2morow;
}

///=====search ======
var findLocation = document.getElementById("findLocation");
findLocation.addEventListener("input", (e) => {
  let valueOfLocation = e.target.value;
  console.log(valueOfLocation);
  getweatherdata(valueOfLocation);
});
