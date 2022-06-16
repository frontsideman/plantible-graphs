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
          :dataset-id-key="proteins"
          :chart-options="options"
        />
      </section>
    </v-col>
  </v-row>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import getAverageOfArrays from '@/helpers/getAverageOfArrays.js';

export default {
  name: 'TaskOne',
  components: {
    LineChart,
  },
  data() {
    return {
      options: {
        backgroundColor: ['red', 'maroon', 'blue', 'green', 'brown', 'orange', 'aqua', 'lime', 'purple'],
        borderColor: ['red', 'maroon', 'blue', 'green', 'brown', 'orange', 'aqua', 'lime', 'purple'],
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 2,
      },
      proteins: 'proteins',
      solids: 'solids',
      graphsData: this.$store.getters['trends/getTrends'],
    }
  },
  computed: {
    getProteinData() {
      const proteinData = this.graphsData.proteins.slice(0, 3);
      const dataset = proteinData.map((_, index) => {
        return {
          label: this.graphsData?.yields[index]?.process_id || index,
          data: this.graphsData.proteins[index],
        }
      });

      const averageProteinDataset = {
        label: 'Average',
        data: getAverageOfArrays(proteinData),
      };

      dataset.push(averageProteinDataset);

      return {
        labels: [
          'Lysate Protein (g)',
          'LS sep. Protein (g)',
          'LS. Sep 2 Protein (g)',
          'LHC Removal Feed Protein (g)',
          'LHC Removal Filtrate Protein (g)',
          'MF1 Filtrate Protein (g)',
          'IC Protein (g)',
          'DF Protein (g)',
          'FC Protein (g)'
        ],
        datasets: dataset
      }
    },
    getSolidData() {
      const solidData = this.graphsData.solids.slice(0, 3);
      const dataset = solidData.map((_, index) => {
        return {
          label: this.graphsData?.yields[index]?.process_id || index,
          data: this.graphsData.solids[index],
        }
      });

      const averageSolidDataset = {
        label: 'average',
        data: getAverageOfArrays(solidData),
      };

      dataset.push(averageSolidDataset);

      return {
        labels: [
          'Lysate % Solids',
          'LS. sep % Solids',
          'LS. Sep 2 % Solids',
          'LHC Removal Feed % Solids',
          'LHC Removal Filtrate % Solids',
          'MF1 Filtrate Protein (g)',
          'IC % Solids',
          'DF % Solids',
          'FC % Solids'
        ],
        datasets: dataset
      }
    }
  },
  mounted(){
    this.$store.dispatch('trends/fetchTrends');
  },
}
</script>
