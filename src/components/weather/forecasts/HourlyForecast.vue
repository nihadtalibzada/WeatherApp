<template>
  <div id="hourly-forecast-card-container" class="hourly-forecast-card-container">
    <v-card
        v-if="!getIsLoading"
        id="hourly-forecast-card"
        class="hourly-forecast-card rounded-lg"
        elevation="4"
    >
      <v-card-title id="hourly-forecast-card-title" class="hourly-forecast-card-title text-sm-subtitle-2">
        {{ $t('labels.hourlyForecast') }}
      </v-card-title>
      <v-card-text id="hourly-forecast-card-text" class="hourly-forecast-card-text">
        <v-row class="flex-md-wrap flex-nowrap flex-column flex-md-row">
          <v-col
              v-for="(hourForecast, index) in getHourlyForecast"
              :key="index"
              id="hourly-forecast-column"
              class="d-md-flex col-sm-12 col-md-2 flex-sm-column flex-md-row justify-md-space-between"
          >
            <div class="d-flex flex-md-column justify-space-between ml-5">
              <span id="daily-forecast-time" class="daily-forecast-time">
                {{hourForecast.time}}
              </span>
              <v-tooltip
                  id="hourly-forecast-icon-tooltip"
                  class="hourly-forecast-icon-tooltip" bottom
              >
                <template v-slot:activator="{ on }">
                  <v-img
                      :src="`https://www.openweathermap.org/img/wn/${hourForecast.icon}@2x.png`"
                      id="hourly-forecast-icon"
                      class="hourly-forecast-icon"
                      max-width="50"
                      max-height="50"
                      v-on="on"
                  />
                </template>
                <span id="hourly-forecast-description" class="hourly-forecast-description">
                  {{ capitalizeFirstLetter(hourForecast.description) }}
                </span>
              </v-tooltip>
              <span id="hourly-forecast-temperature" class="hourly-forecast-temperature mt-2">
                {{ hourForecast.temperature }}
              </span>
            </div>
            <v-divider
                v-if="index !== getHourlyForecast.length - 1"
                :vertical="!$vuetify.breakpoint.smAndDown"
            >
            </v-divider>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row id="hourly-forecast-skeleton-loader-container" class="d-flex flex-column flex-md-row" v-else>
      <v-col
          v-for="index in $vuetify.breakpoint.mdAndUp ? $constVariables.skeletonLoaderAmounts.HOURLY_FORECAST : 1"
          :key="index"
      >
        <v-skeleton-loader
            type="article"
            id="hourly-forecast-skeleton-loader"
            class="hourly-forecast-skeleton-loader"
            width="100%"
            boilerplate
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import HelperFunctions from "@/mixins/helperFunctions";

export default {
  name: "HourlyForecast",

  computed: {
    ...mapGetters({
      getHourlyForecast: "getHourlyForecast",
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