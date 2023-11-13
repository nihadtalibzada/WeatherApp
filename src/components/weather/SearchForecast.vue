<template>
  <v-text-field
      label="Search"
      v-model="cityInput"
      outlined
      color="blue"
      :rules="requiredRule"
      placeholder="Search a city"
      append-icon="mdi-magnify"
      :loading="getIsLoading"
      @keydown.enter="searchWeatherData"
      @click:append="searchWeatherData"
  ></v-text-field>
  <!--            <v-combobox
                      :items="cities"
                      v-model="cityInput"
                      @update:search-input="fetchCities"
                      @change="searchWeatherData"
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
      getIsLoading: "getIsLoading",
      getIsErrorThrown: "getIsErrorThrown",
    }),
  },

  methods: {
    ...mapActions({
      fetchCurrentWeather: "fetchCurrentWeather",
      fetchWeatherForecast: "fetchWeatherForecast"
    }),

    searchWeatherData() {
      if (!this.cityInput) {
        this.requiredRule = [
          value => !!value || 'Please search for a city name.'
        ];
        return;
      }
      this.$store.commit('setLoading', true);
      this.fetchCurrentWeather(this.cityInput).then().catch(() => this.requiredRule = [this.$t('errorMessage')]);
      this.fetchWeatherForecast(this.cityInput).then().catch(() => this.requiredRule = [this.$t('errorMessage')]);
      console.log('this.getIsErrorThrown: ', this.getIsErrorThrown)
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