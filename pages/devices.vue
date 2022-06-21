<template>
  <v-row class="pt-md-8 pt-sm-4 pt-xs-4">
    <v-col class="text-center" lx="6">
      <section v-for="(item, index) in locationIdFromStore" :key="index" class="mb-8">
        <header>
          <h2>{{index}}</h2>
        </header>
        <ScatterChart
          :chart-data="getScatterData(item)"
          :chart-id="index"
          :dataset-id-key="index"
          :chart-options="options"
        />
      </section>
    </v-col>
  </v-row>
</template>

<script>
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import ScatterChart from '@/components/ScatterChart.vue';
import { REQUEST_TIME, MATCH_COLOR_PARAMETER } from '@/constants/index';

export default {
  name: 'DevicesPage',
  components: {
    ScatterChart,
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 1,
        type: 'scatter',
        scales: {
          y: {
            title: {
              display: true,
              text: 'Temperature (C) / Humidity',
            },
            // min: 0,
            // max: 100,
          },
          x: {
            type: 'time',
            adapters: {
              date: {
                locale: enUS,
              },
            },
          },
        },
      },
    }
  },
  computed: {
    locationIdFromStore() {
      return this.$store.getters['items/getItems'];
    },
  },
  mounted() {
    if (this.getRequestTime()) {
      this.$store.dispatch('items/fetchItems');
    };
  },
  methods: {
    getScatterData(data) {
      const structuredObj = {};
      for (const item of data) {
        const payload = JSON.parse(item.payload);
        for (const payloadItem in payload) {
          if (structuredObj[payloadItem] === undefined) {
            structuredObj[payloadItem] = [];
          }

          const temp = {}
          temp.x = new Date(item.date_time);
          temp.y = payload[payloadItem];
          structuredObj[payloadItem].push(temp);
        }
      }

      const dataset = [];
      for (const item in structuredObj) {
        const preferredColor = MATCH_COLOR_PARAMETER[item.toLocaleLowerCase()];
        const temp = {
          label: item,
          fill: false,
          backgroundColor: preferredColor,
          borderColor: preferredColor,
          pointBackgroundColor: preferredColor,
          pointBorderColor: 'transparent',
          data: structuredObj[item],
        }
        dataset.push(temp);
      }

      return {
        datasets: dataset,
      }
    },
    getRequestTime() {
      const currentTime = (new Date()).getTime();
      const isRequestTime = currentTime - this.lastRequestTime > REQUEST_TIME;
      return this.locationIdFromStore.length === 0 || isRequestTime;
    },
  },
}
</script>
