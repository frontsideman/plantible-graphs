import { STUDY_CASE_URL } from '@/constants';
import transformItems from '@/helpers/transformItems';

export const state = () => ({
  locationId: [],
})

export const getters = {
  getItems(state) {
    return state.locationId;
  }
}

export const mutations = {
  setItems(state, data) {
    state.locationId = transformItems(data);
  },
}

export const actions = {
  async fetchItems(context) {
    const res = await this.$axios.$get(STUDY_CASE_URL);
    context.commit('setItems', res.items);
    return res;
  }
}
