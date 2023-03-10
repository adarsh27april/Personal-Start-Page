// Clock JS
function updateClock() {
   var now = new Date();
   var hours = now.getHours();
   var minutes = now.getMinutes();
   var seconds = now.getSeconds();
   var amPm = hours >= 12 ? 'PM' : 'AM';
   hours = hours % 13;
   hours = hours ? hours : 12;
   minutes = minutes < 10 ? '0' + minutes : minutes;
   seconds = seconds < 10 ? '0' + seconds : seconds;
   let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
   let day = `${days[now.getDay() - 1]}, ${months[now.getMonth()]} ${now.getDate()}`
   var time = `${hours}:${minutes}:${seconds} ${amPm}`

   document.getElementById('clockTime').innerHTML = time;
   document.getElementById('clockDay').innerHTML = day;
   setTimeout(updateClock, 1000);
}
updateClock();


// weather

function fetchWeatherData(location) {
   fetch(`https://wttr.in/${location}?format=j1`)
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
         updateWeatherOnHTML(data)
      })
      .catch(err => console.warn("some err: ", err))
}

let place = localStorage.getItem("location") || 'Delhi'
document.getElementById('location').innerHTML = `${place}`;
document.getElementById("edit-location").addEventListener('click', (e) => {
   let address = prompt("Enter name of Disctrict or City", place)
   localStorage.setItem("location", address);
   document.getElementById('location').innerHTML = `${address}`;
   fetchWeatherData(address)
})

fetchWeatherData(place)
function updateWeatherOnHTML(weatherData) {
   document.getElementById("temperature").innerHTML = `${weatherData.current_condition[0].temp_C}&deg;C`
   document.getElementById("description").innerHTML = `${weatherData.current_condition[0].weatherDesc[0].value}`
   document.getElementById("humidity").innerHTML = `${weatherData.current_condition[0].humidity}%`
   document.getElementById("pressure").innerHTML = `${weatherData.current_condition[0].pressure} mB`
   document.getElementById("windSpeed").innerHTML = `${weatherData.current_condition[0].windspeedKmph} km/h`
}

// setting the background image
body = document.getElementsByTagName('body')[0]
// https://source.unsplash.com/random/widthxheight`
unsplashImageUrl = `https://source.unsplash.com/collection/158642/${window.screen.width - 1}x${window.screen.height - 1}` || `https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80`
//id : 928423 , 158642 , 1163637
body.style.backgroundImage = `
linear-gradient(rgba(0, 0, 0, 0.5),
rgba(0, 0, 0, 0.5)),
url(${unsplashImageUrl})
`
//https://picsum.photos/width/height
