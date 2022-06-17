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
          <h2>Solids Trends</h2>
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
import { COLORS_LIST, PROTEINS_LABELS, SOLIDS_LABELS } from '@/constants/index';

export default {
  name: 'TaskOne',
  components: {
    LineChart,
  },
  data() {
    return {
      options: {
        backgroundColor: COLORS_LIST,
        borderColor: COLORS_LIST,
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 2,
        type: 'line',
      },
      proteins: 'proteins',
      solids: 'solids',
    };
  },
  computed: {
    graphsData() {
      return this.$store.state.trends.trendsItems;
    },
    getProteinData() {
      if (isEmpty(this.graphsData)) return {};

      const proteinData = this.graphsData.proteins.slice(0, 3);
      const dataset = proteinData.map((_, index) => {
        return {
          label: this.graphsData.yields[index]?.process_id || index,
          data: this.graphsData.proteins[index],
        }
      });

      const averageProteinDataset = {
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
      const dataset = solidData.map((_, index) => {
        return {
          label: this.graphsData.yields[index]?.process_id || index,
          data: this.graphsData.solids[index],
        }
      });

      const averageSolidDataset = {
        label: 'average',
        data: getAverageOfArrays(solidData),
      };

      dataset.push(averageSolidDataset);

      return {
        labels:SOLIDS_LABELS,
        datasets: dataset
      }
    }
  },
  mounted() {
    this.$store.dispatch('trends/fetchTrends');
  },
}
</script>
