import { STUDY_CASE_URL } from '@/constants';

export const state = () => ({
  items: [],
})

export const getters = {
  getItems(state) {
    return state.items;
  }
}

export const mutations = {
  setItems(state, data) {
    state.items = data;
  }
}

export const actions = {
  async fetchItems(context) {
    const res = await this.$axios.$get(STUDY_CASE_URL);
    context.commit('setItems', res.items);
    return res;
  }
}
