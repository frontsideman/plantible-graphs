import { TRENDS_URL } from '@/constants';

export const state = () => ({
  trendsItems: {},
})

export const getters = {
  getTrends(state) {
    return state.trends;
  }
}

export const mutations = {
  setTrends(state, data) {
    state.trendsItems = data;
  }
}

export const actions = {
  async fetchTrends(context) {
    const res = await this.$axios.$get(TRENDS_URL);
    context.commit('setTrends', res);
    return res;
  }
}
