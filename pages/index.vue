<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <h1>Welcome</h1>
    </v-col>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto my-12"
          max-width="374"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            />
          </template>

          <NuxtLink to="/task1">
            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            />
          </NuxtLink>

          <v-card-title>Task 1</v-card-title>

          <v-card-text>
            <p>The data retrieved from the API should be plotted on a line chart, more specifically the “proteins” and “solids” objects within the JSON response.</p>
          </v-card-text>

          <v-card-actions>
            <NuxtLink to="/task1" class="v-btn v-btn--text theme--dark v-size--default deep-purple--text text--lighten-2">
              <span class="v-btn__content">
                Task 1
              </span>
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          class="mx-auto my-12"
          max-width="374"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <NuxtLink to="/task2">
            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>
          </NuxtLink>

          <v-card-title>Task 2</v-card-title>

          <v-card-text>
            <p>The data retrieved from the API should be plotted on a line or scatter chart, more specifically the “payload” objects found in the JSON response. The data should be categorized by location and then device id. The dataset should be ordered by time in ascending order. Note that the ‘payload’ object is a serialized JSON object and each key within the object should be charted.</p>
          </v-card-text>

          <v-card-actions>
            <NuxtLink to="/task2" class="v-btn v-btn--text theme--dark v-size--default deep-purple--text text--lighten-2">
              <span class="v-btn__content">
                Task 2
              </span>
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-row>


</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
