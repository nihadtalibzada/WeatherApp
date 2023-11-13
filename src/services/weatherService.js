import Vue from "vue";
import {i18n} from "@/main"
export default {
    fetchWeather(city, forecastType) {
        const apiEndpoint = this.constructApiURL(city, forecastType)
        return new Promise((resolve, reject) => {
            fetch(apiEndpoint)
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error(i18n.t('errorMessages.404'));
                        } else if (response.status === 401) {
                            throw new Error(i18n.t('errorMessages.401'));
                        } else if (response.status === 500) {
                            throw new Error(i18n.t('errorMessages.500'));
                        } else {
                            throw new Error(i18n.t('errorMessages.default'));
                        }
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