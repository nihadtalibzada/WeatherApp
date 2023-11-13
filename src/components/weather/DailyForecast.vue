<template>
  <v-col id="daily-forecast-card" class="daily-forecast-card col-sm-12 col-lg-5">
    <v-text-field class="hidden hidden-xs-only"/>
    <v-card
        v-if="!getIsLoading"
        class="rounded-lg daily-forecast-card mx-auto"
        id="daily-forecast-card"
        elevation="4"
        :max-width="$vuetify.breakpoint.mdAndUp ? '500' : '100%'"
    >
      <v-card-title class="text-sm-subtitle-2">{{ $t('labels.dailyForecast') }}</v-card-title>
      <v-card-text>
        <v-row class="d-flex flex-column">
          <v-col v-for="(dailyForecast, index) in getDailyForecast" :key="index" class="d-flex flex-column">
            <div class="daily-forecast-row d-flex flex-md-row justify-space-between align-center ml-5">
              <span class="daily-forecast-date text-left">{{ dailyForecast.date }}</span>
              <v-tooltip class="daily-forecast-icon-tooltip" bottom>
                <template v-slot:activator="{ on }">
                  <v-img
                      :src="`https://www.openweathermap.org/img/wn/${dailyForecast.icon}@2x.png`"
                      class="daily-forecast-icon"
                      max-width="78"
                      max-height="78"
                      v-on="on"
                  />
                </template>
                <span>{{ capitalizeFirstLetter(dailyForecast.description) }}</span>
              </v-tooltip>
              <span class="daily-forecast-temperature text-right">{{ dailyForecast.averageTemperature }}</span>
            </div>
            <v-divider v-if="index !== getDailyForecast.length - 1"></v-divider>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row class="d-flex flex-column" v-else>
      <v-col v-for="index in $vuetify.breakpoint.mdAndUp ? 4 : 1" :key="index">
        <v-skeleton-loader
            type="article"
            class="mx-auto my-0 py-0"
            :width="$vuetify.breakpoint.mdAndUp ? '80%' : '100%'"
            boilerplate
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import {mapGetters} from "vuex";
import HelperFunctions from "@/mixins/helperFunctions";

export default {
  name: "DailyForecast",

  computed: {
    ...mapGetters({
      getDailyForecast: "getDailyForecast",
      getIsLoading: "getIsLoading",
    }),
  },

  mixins: [
    HelperFunctions
  ]
}
</script>

<style scoped>
.daily-forecast-temperature, .daily-forecast-date, .daily-forecast-icon {
  flex: 1;
}
</style>