const apikey = "783d6733400aa1fea0eea0af2249a564";

function fetchGeolocationData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        const geodata = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`
        )
          .then((res) => {
            return res.json();
          })
          .catch((err) => err);
        console.log(geodata);
        setUI(geodata);
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
        displayError(
          "Error fetching geolocation. Please enable location access."
        );
      }
    );
  } else {
    displayError("Geolocation is not supported by your browser.");
  }

  console.log(navigator.geolocation.getCurrentPosition);
}

function setUI(data) {
  document.getElementById("lat").innerText = `Lat : ${data.coord.lat}`;
  document.getElementById("long").innerText = `Long : ${data.coord.lon}`;
  document
    .getElementById("mapp")
    .setAttribute(
      "src",
      `https://maps.google.com/maps/?q=${data.coord.lat},${data.coord.lon}&output=embed`
    );
  document.getElementById("loc").innerText = `Location : ${data.name}`;
  document.getElementById(
    "windspeed"
  ).innerText = `Wind Speed : ${data.wind.speed}`;
  document.getElementById(
    "humidity"
  ).innerText = `Humidity : ${data.main.humidity}`;
  document.getElementById("tz").innerText = `Time Zone : ${data.timezone}`;
  document.getElementById(
    "press"
  ).innerText = `Pressure:  ${data.main.pressure}`;
  document.getElementById("wd").innerText = `Wind Direction: ${data.wind.deg}`;
  document.getElementById("uv").innerText = `UV Index : ${data.coord.lon}`;
  document.getElementById(
    "temp"
  ).innerText = `Feels like: ${data.main.feels_like}`;
}
fetchGeolocationData();
