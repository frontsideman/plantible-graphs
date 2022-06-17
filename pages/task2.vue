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
import { COLORS_LIST } from '@/constants/index';

export default {
  name: 'TaskTwo',
  components: {
    ScatterChart,
  },
  data() {
    return {
      options: {
        backgroundColor: COLORS_LIST,
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 2,
        type: 'scatter',
        scales: {
          y: {
            title: {
              display: true,
              text: 'Temperature (C) / Humidity',
            },
            min: 0,
            max: 100,
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
    locationIdFromStore () {
      return this.$store.state.items.locationId;
    },
  },
  mounted(){
    this.$store.dispatch('items/fetchItems');
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
        const e = {
          label: item,
          fill: false,
          // TODO: create fn for get 2 different colors
          backgroundColor: COLORS_LIST[Math.floor(Math.random() * (COLORS_LIST.length - 1))],
          data: structuredObj[item]
        }
        dataset.push(e);
      }

      return {
        datasets: dataset
      }
    },
  },
}
</script>
