<template>
  <v-row class="pt-md-8 pt-sm-4 pt-xs-4">
    <v-col class="text-center" sm="12" xs="12" md="12" lg="6">
      <section>
        <header>
          <h2>Protein Trends</h2>
        </header>
        <LineChart
          :chart-data="getProteinData"
          :chart-id="proteins"
          :dataset-id-key="proteins"
          :chart-options="options"
        />
      </section>
    </v-col>

    <v-col class="text-center" sm="12" xs="12" md="12" lg="6">
      <section>
        <header>
          <h2>Solid Trends</h2>
        </header>
        <LineChart
          :chart-data="getSolidData"
          :chart-id="solids"
          :dataset-id-key="solids"
          :chart-options="options"
        />
      </section>
    </v-col>
  </v-row>
</template>

<script>
import isEmpty from 'lodash.isempty';
import LineChart from '@/components/LineChart.vue';
import getAverageOfArrays from '@/helpers/getAverageOfArrays.js';
import { COLORS_LIST, PROTEINS_LABELS, SOLIDS_LABELS, REQUEST_TIME } from '@/constants/index';

export default {
  name: 'TrendsPage',
  components: {
    LineChart,
  },
  data() {
    return {
      options: {
        // backgroundColor: COLORS_LIST,
        // borderColor: COLORS_LIST,
        // pointBackgroundColor: 'black',
        // pointBorderColor: null,
        devicePixelRatio: 2,
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 1,
        type: 'line',
      },
      proteins: 'proteins',
      solids: 'solids',
      averageColor: 'lime',
    };
  },
  computed: {
    lastRequestTime() {
      return this.$store.getters['trends/getTrendsTime'];
    },
    graphsData() {
      return this.$store.getters['trends/getTrends'];
    },
    getProteinData() {
      if (isEmpty(this.graphsData)) return {};

      const proteinData = this.graphsData.proteins.slice(0, 3);
      const dataset = proteinData.map((_, index) => {
        const preferredColor = COLORS_LIST[index];
        return {
          backgroundColor: preferredColor,
          borderColor: preferredColor,
          pointBackgroundColor: preferredColor,
          pointBorderColor: preferredColor,

          label: this.graphsData.yields[index]?.process_id || index,
          data: this.graphsData.proteins[index],
        }
      });

      const averageProteinDataset = {
        backgroundColor: this.averageColor,
        borderColor: this.averageColor,
        pointBackgroundColor: this.averageColor,
        pointBorderColor: this.averageColor,
        borderWidth: 2,

        label: 'Average',
        data: getAverageOfArrays(proteinData),
      };

      dataset.push(averageProteinDataset);

      return {
        labels: PROTEINS_LABELS,
        datasets: dataset
      }
    },
    getSolidData() {
      if (isEmpty(this.graphsData)) return {};

      const solidData = this.graphsData.solids.slice(0, 3);
      const dataset = solidData.map((item, index) => {
        const preferredColor = COLORS_LIST[index];
        return {
          backgroundColor: preferredColor,
          borderColor: preferredColor,
          pointBackgroundColor: preferredColor,
          pointBorderColor: preferredColor,
          label: this.graphsData.yields[index]?.process_id || index,
          data: this.graphsData.solids[index],
        }
      });

      const averageSolidDataset = {
        backgroundColor: this.averageColor,
        borderColor: this.averageColor,
        pointBackgroundColor: this.averageColor,
        pointBorderColor: this.averageColor,
        borderWidth: 2,

        label: 'average',
        data: getAverageOfArrays(solidData),
      };

      dataset.push(averageSolidDataset);

      return {
        labels: SOLIDS_LABELS,
        datasets: dataset
      }
    },
  },
  mounted() {
    if (this.getRequestTime()) {
      this.$store.dispatch('trends/fetchTrends');
    };
  },
  methods: {
    getRequestTime() {
      const currentTime = (new Date()).getTime();
      const isRequestTime = currentTime - this.lastRequestTime > REQUEST_TIME;
      return isEmpty(this.graphsData) || isRequestTime;
    }
  },
}
</script>
