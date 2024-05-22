
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=43.073051&lon=-89.401230&units=imperial&appid=APITOKEN`;
            function updateWeather() {    
                fetch(apiUrl)
                    .then(response => {
                        if(response.ok){
                            return response.json();
                        }
                        else{
                            throw new Error('FUCK YOU');
                        }
                    })
                    .then(data => {
                        const outside = data.weather[0].main;
                        const image  = data.weather[0].icon;
                        const temp = Math.round(data.main.temp);

                        document.getElementById("temp").innerHTML = temp;
                        document.getElementById("outside").innerHTML = outside;
                        document.getElementById("icon").src = `http://openweathermap.org/img/w/${image}.png`;
                    })
                    .catch(error => {
                        console.error('Error fetching weather data:', error);
                    });
                }  
            function getCurrent() {
                updateWeather();
                setInterval(updateWeather,300000);
            }
            getCurrent();

                    
