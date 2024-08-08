const apikey = "b105b4efe24851b5d087015b85b9172e";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}&units=metric`);
    var data = await response.json();

    console.log(data);
  

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
    document.querySelector(".humidity").innerHTML = data.main.humidity;
    document.querySelector(".wind").innerHTML = data.wind.speed;
}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
})