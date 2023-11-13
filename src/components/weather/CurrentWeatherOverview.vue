<template>
  <v-row
      id="weather-overview-container"
      class="weather-overview-container"
      v-if="!getIsLoading"
  >
    <v-col class="basic-weather-info d-flex flex-column align-baseline">
      <span class="font-weight-bold text-md-h4 text--primary">{{ getCurrentWeather.city }}</span>
      <span class="text-subtitle-1 text--primary">{{ capitalizeFirstLetter(getCurrentWeather.description) }}</span>
      <span class="font-weight-bold text-md-h2 text--primary mt-4">{{ getCurrentWeather.temperature }}</span>
    </v-col>
    <v-col class="real-time-weather-forecast-image d-flex justify-end alignend">
      <v-img
          :src="`https://openweathermap.org/img/wn/${getCurrentWeather.icon}@4x.png`"
          max-width="200"
          max-height="200"
      />
    </v-col>
  </v-row>
  <v-row class="d-flex flex-row" v-else>
    <v-col>
      <v-skeleton-loader
          type="article"
          width="100%"
          height="200"
          boilerplate
      ></v-skeleton-loader>
    </v-col>
    <v-col class="d-flex justify-end">
      <v-skeleton-loader
          type="image"
          width="50%"
          class="rounded-circle"
          height="200"
          boilerplate
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex";
import HelperFunctions from "@/mixins/helperFunctions";

export default {
  name: "CurrentWeatherOverview",

  computed: {
    ...mapGetters({
      getCurrentWeather: "getCurrentWeather",
      getIsLoading: "getIsLoading",
    }),
  },

  mixins: [
    HelperFunctions
  ]
}
</script>

<style scoped>

</style>