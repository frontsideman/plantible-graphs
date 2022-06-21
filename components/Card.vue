<template>
  <v-card
    class="mb-4"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <NuxtLink
      v-if="src"
      :to="link"
    >
      <v-img
        height="250"
        :aspect-ratio="16/9"
        :src="src"
        :alt="alt"
      ></v-img>
    </NuxtLink>

    <v-card-title v-if="title">{{title}}</v-card-title>

    <v-card-text v-if="subtitle">
      <p>{{subtitle}}</p>
    </v-card-text>

    <v-card-actions v-if="link">
      <NuxtLink
        :to="link"
        class="
          v-btn
          v-btn--text
          theme--dark
          v-size--default
          deep-purple--text
          text--lighten-2
        ">
        <span class="v-btn__content">
          {{linktext}}
        </span>
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LineChart',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    linktext: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    }
  },
}
</script>
