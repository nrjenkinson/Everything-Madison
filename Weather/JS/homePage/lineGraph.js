
let hourlyTemperatures =  JSON.parse(localStorage.getItem('hourlyTemperatures')) ||new Array(8).fill(0);

function getPast8HoursLabels() {
    const now = new Date();
    const labels = [];
    for (let i = 0; i < 8; i++) {
    const hour = (now.getHours() - i + 12) % 12 || 12; // Get hour in 12-hour format
    const ampm = now.getHours() - i >= 12 ? 'pm' : 'am'; // Get am/pm
    labels.unshift(`${hour}${ampm}`); // Add label to the beginning of the array
        
    }       
return labels;
}
function updateChart(newData) {
    const xValues = getPast8HoursLabels();
    // get y-axis values
    const maxTemp = Math.max(...newData);
    const minTemp = Math.min(...newData);
    // Update the hourlyTemperatures array
    while (hourlyTemperatures.length > 8) {
        hourlyTemperatures.shift(); // Remove the oldest entry
    }
    hourlyTemperatures.reverse(); //display the temps in reverse order to match labels
    //console.log(hourlyTemperatures);
    //if chart isn't active, create it
    if(!hourlyChart) {
        hourlyChart = new Chart("hourlyTemp", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(196,30,58,1)",
                    data: newData
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{ticks: {min: (Math.floor(minTemp) - 5), max: (Math.ceil(maxTemp)+5)}}]
                }
            }
        })
    }
    else {
        // populate the chart with pre-existing values 
        hourlyChart.data.labels = xValues;
        hourlyChart.data.datasets[0].data = hourlyTemperatures;
        hourlyChart.update();
    }
}
// store temp data to local storage
function saveHourlyTemperatures(){
    localStorage.setItem('hourlyTemperatures', JSON.stringify(hourlyTemperatures));
}
let hourlyChart;
// if there are pre-existing values saved, populate fields with those values
if(hourlyTemperatures.some(temp => temp !== 0)) {
    updateChart(hourlyTemperatures);
}
// otherwise generate the first value
else {
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
            const temp = Math.round(data.main.temp);
            hourlyTemperatures.push(temp);
            updateChart(hourlyTemperatures);
            saveHourlyTemperatures();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
// run function every hour, at the top of the hour, to get next data [temp] value
function runHourlyUpdate() {
    // Calculate the milliseconds remaining until the next hour
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(nextHour.getHours() + 1);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    nextHour.setMilliseconds(0);
    const remainingTime = nextHour - now;
    console.log(remainingTime);

    // Run the update after the remaining time
    setTimeout(() => {
        // Perform the update
        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch weather data');
                }
            })
            .then(data => {
                const temp = Math.round(data.main.temp);
                hourlyTemperatures.push(temp);
                updateChart(hourlyTemperatures);
                saveHourlyTemperatures();
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

        // Schedule the next update
        setInterval(runHourlyUpdate, 3600000); // Update every hour (3600000 milliseconds)
    }, remainingTime);
}
runHourlyUpdate();
