import Vue from "vue";

export default {
    fetchWeather(city, forecastType) {
        const apiEndpoint = this.constructApiURL(city, forecastType)
        return new Promise((resolve, reject) => {
            fetch(apiEndpoint)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error occurred while fetching the data.");
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    },

    constructApiURL(city, forecastType) {
        return `https://api.openweathermap.org/data/2.5/${forecastType}?q=${city}&exclude=minutely&units=metric&appid=${Vue.prototype.$constVariables.openWeatherApiKey}`;
    }
}