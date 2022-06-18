import { TRENDS_URL } from '@/constants';

export const state = () => ({
  trendsItems: {},
  time: 0,
})

export const getters = {
  getTrends(state) {
    return state.trendsItems;
  },
  getTrendsTime(state) {
    return state.time;
  },
}

export const mutations = {
  setTrends(state, { data, time }) {
    state.trendsItems = data;
    state.time = time;
  },
}

export const actions = {
  async fetchTrends(context) {
    const res = await this.$axios.$get(TRENDS_URL);
    const payload = {
      data: res,
      time: (new Date()).getTime(),
    }
    context.commit('setTrends', payload);
    return res;
  },
}
