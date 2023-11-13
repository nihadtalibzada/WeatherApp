<template>
  <v-row>
    <v-col class="col-lg-1 hidden-xs-only"></v-col>
    <v-col class="col-sm-12 col-lg-6 flex-fill">
      <SearchForecast/>
      <CurrentWeatherOverview/>
      <HourlyForecast/>
      <v-card
          v-if="!getIsLoading"
          class="rounded-lg air-conditions mt-6"
          elevation="4"
      >
        <v-card-title class="text-sm-subtitle-2">AIR CONDITIONS</v-card-title>
        <v-card-text>
          <v-row class="pa-4">
            <v-col class="d-flex justify-start flex-column">
              <AirCondition
                  icon-name="mdi-thermometer"
                  :air-condition="{label: $t('airConditions.realFeel'), data: getCurrentWeather.feelsLike}"
              />
              <AirCondition
                  icon-name="mdi-water-percent"
                  :air-condition="{label: $t('airConditions.humidity'), data: getCurrentWeather.humidity}"
              />
            </v-col>
            <v-col class="d-flex justify-start flex-column">
              <AirCondition
                  icon-name="mdi-weather-windy"
                  :air-condition="{label: $t('airConditions.wind'), data: getCurrentWeather.wind}"
              />
              <AirCondition
                  icon-name="mdi-gauge"
                  :air-condition="{label: $t('airConditions.pressure'), data: getCurrentWeather.pressure}"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-skeleton-loader
          v-else
          type="article, list-item"
          class="mt-8"
          boilerplate
          width="100%"
      ></v-skeleton-loader>
    </v-col>

    <DailyForecast/>

  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AirCondition from "@/components/weather/AirCondition.vue";
import DailyForecast from "@/components/weather/DailyForecast.vue";
import HourlyForecast from "@/components/weather/HourlyForecast.vue";
import CurrentWeatherOverview from "@/components/weather/CurrentWeatherOverview.vue";
import SearchForecast from "@/components/weather/SearchForecast.vue";

export default {
  name: "WeatherInfo",

  components: {
    SearchForecast,
    CurrentWeatherOverview,
    HourlyForecast,
    DailyForecast,
    AirCondition
  },

  created() {
    this.$store.commit('setLoading', true);
    this.fetchCurrentWeather();
    this.fetchWeatherForecast();
  },

  computed: {
    ...mapGetters({
      getCurrentWeather: "getCurrentWeather",
      getHourlyForecast: "getHourlyForecast",
      getIsLoading: "getIsLoading",
      getIsErrorThrown: "getIsErrorThrown",
    }),
  },

  methods: {
    ...mapActions({
      fetchCurrentWeather: "fetchCurrentWeather",
      fetchWeatherForecast: "fetchWeatherForecast"
    })
  }
}
</script>

<style scoped lang="scss">

</style>