<template>
  <div id="hourly-forecast-card-container" class="hourly-forecast-card-container">
    <v-card
        v-if="!getIsLoading"
        class="rounded-lg hourly-forecast"
        elevation="4"
    >
      <v-card-title class="text-sm-subtitle-2">{{ $t('labels.hourlyForecast') }}</v-card-title>
      <v-card-text>
        <v-row class="flex-md-wrap flex-nowrap flex-column flex-md-row">
          <v-col v-for="(hourForecast, index) in getHourlyForecast" :key="index" class="d-md-flex col-sm-12 col-md-2 flex-sm-column flex-md-row justify-md-space-between">
            <div class="d-flex flex-md-column justify-space-between ml-5">
              <span>{{hourForecast.time}}</span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-img
                      :src="`https://www.openweathermap.org/img/wn/${hourForecast.icon}@2x.png`"
                      max-width="50"
                      max-height="50"
                      v-on="on"
                  />
                </template>
                <span>{{ capitalizeFirstLetter(hourForecast.description) }}</span> <!-- Replace this with your actual tooltip content -->
              </v-tooltip>
              <span class="mt-2">{{ hourForecast.temperature }}</span>
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

    <v-row class="d-flex flex-column flex-md-row" v-else>
      <v-col v-for="index in $vuetify.breakpoint.mdAndUp ? 6 : 1" :key="index">
        <v-skeleton-loader
            type="article"
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