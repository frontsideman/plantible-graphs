<template>
  <v-row>
    <v-col cols="12">
      <h1>Welcome</h1>
    </v-col>

    <v-col md="4" sm="6" xs="12">
      <Card
        title="Task 1"
        subtitle="The data retrieved from the API should be plotted on a line chart, more specifically the “proteins” and “solids” objects within the JSON response."
        link="trends"
        linktext="Go to Task 1"
        alt="proteins graph"
        src="https://images.freeimages.com/images/large-previews/b2a/graph-2-1477627.jpg"
      />
    </v-col>

    <v-col md="4" sm="6" xs="12">
      <Card
        title="Task 2"
        subtitle="The data retrieved from the API should be plotted on a line or scatter chart, more specifically the “payload” objects found in the JSON response. The data should be categorized by location and then device id. The dataset should be ordered by time in ascending order. Note that the ‘payload’ object is a serialized JSON object and each key within the object should be charted."
        link="devices"
        linktext="Go to Task 2"
        src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      />
    </v-col>
  </v-row>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'IndexPage',
  components: {
    Card,
  }
}
</script>
