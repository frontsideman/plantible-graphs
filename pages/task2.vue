<template>
  <v-row class="pt-md-8 pt-sm-4 pt-xs-4">
    <v-col class="text-center" sm="12" xs="12" md="12" lg="6">
      <section>
        <header>
          <h2>Case study 1</h2>
        </header>
        <ScatterChart
          :chart-data="getScatterData"
          :chart-id="case_study1"
          :dataset-id-key="case_study2"
          :chart-options="options"
        />
      </section>
    </v-col>

    <v-col class="text-center" sm="12" xs="12" md="12" lg="6">
      <section>
        <header>
          <h2>Case study 2</h2>
        </header>
        <ScatterChart
          :chart-data="getScatterData"
          :chart-id="case_study2"
          :dataset-id-key="case_study2"
          :chart-options="options"
        />
      </section>
    </v-col>
  </v-row>
</template>

<script>
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import orderBy from 'lodash.orderby';
import ScatterChart from '@/components/ScatterChart.vue';

export default {
  name: 'TaskTwo',
  components: {
    ScatterChart,
  },
  data() {
    return {
      options: {
        backgroundColor: ['red', 'maroon', 'blue', 'green', 'brown', 'orange', 'aqua', 'lime', 'purple'],
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
      case_study1: 'case_study1',
      case_study2: 'case_study2',
      items: this.$store.getters['items/getItems'],
    }
  },
  computed: {
    getScatterData() {
      const dataset = this.items.filter((item) => {
        if (JSON.parse(item.payload).humidity) {
          return {
            item
          }
        }
        return false;
      });

      const orderedData = orderBy(dataset, ['date_time'], ['asc']).map(item => {
        const { temperature } = JSON.parse(item.payload);
        return {
          x: new Date(item.date_time),
          y: temperature,
        }
      });

      return {
        datasets: [{
          label: 'humidity',
          fill: false,
          backgroundColor: 'red',
          data: orderedData
        },
        {
          label: 'temperature',
          fill: false,
          backgroundColor: 'blue',
          data: []
        }
        ]
      }
    },
  },
  mounted(){
    this.$store.dispatch('items/fetchItems');
  },
}
</script>
