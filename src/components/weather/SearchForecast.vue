<template>
  <v-text-field
      id="search-weather-forecast-text-field"
      class="search-weather-forecast-text-field"
      :label="$t('labels.search')"
      v-model="cityInput"
      outlined
      :rules="requiredRule"
      :placeholder="$t('labels.searchPlaceholder')"
      append-icon="mdi-magnify"
      :disabled="getIsLoading"
      :loading="getIsLoading"
      @keydown.enter="searchWeatherForecast"
      @click:append="searchWeatherForecast"
  ></v-text-field>
  <!--            <v-combobox
                      :items="cities"
                      v-model="cityInput"
                      @update:search-input="fetchCities"
                      @change="searchWeatherForecast"
                      color="white"
                      outlined
                      class="rounded-lg text-left"
                      hide-no-data
                      hide-selected
                      label="Search"
                      placeholder="Search a city"
                  ></v-combobox>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SearchForecast",

  data() {
    return {
      cityInput: null,
      requiredRule: [],
      //cities: [],
      //citySearch: null,
    }
  },

  computed: {
    ...mapGetters({
      getIsLoading: "getIsLoading"
    }),
  },

  methods: {
    ...mapActions({
      fetchCurrentWeather: "fetchCurrentWeather",
      fetchWeatherForecast: "fetchWeatherForecast"
    }),

    searchWeatherForecast() {
      if (!this.cityInput) {
        this.requiredRule = [
          value => !!value || 'Please search for a city name.'
        ];
        return;
      }
      this.requiredRule = [];
      this.$store.commit('setLoading', true);
      this.fetchCurrentWeather(this.cityInput)
          .then()
          .catch((error) => {
            this.requiredRule = [error.message]
          });

      this.fetchWeatherForecast(this.cityInput)
          .then()
          .catch((error) => this.requiredRule = [error.message]);
    },

    /*fetchCities(input) {
      console.log('EVEN: ', input)
      const username = "ntalibzada";
      const apiUrl = `http://api.geonames.org/searchJSON?name_equals=${input ?? input}&maxRows=10&username=${username}`;

      if (input !== '' || input !== null) {
        fetch(apiUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(data => {
              this.cities = data?.geonames?.map(city => `${city.name}, ${city.countryName}`);
              console.log('cities: ', this.cities);
            })
            .catch(error => {
              console.error("Error fetching cities:", error);
            });
      }
    },*/
  }
}
</script>

<style scoped>

</style>