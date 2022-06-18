import { STUDY_CASE_URL } from '@/constants';
import transformItems from '@/helpers/transformItems';

export const state = () => ({
  locationId: [],
  time: 0,
})

export const getters = {
  getItems(state) {
    return state.locationId;
  },
  getItemsTime(state) {
    return state.time;
  },
}

export const mutations = {
  setItems(state, { data, time}) {
    state.locationId = transformItems(data);
    state.time = time;
  },
}

export const actions = {
  async fetchItems(context) {
    const res = await this.$axios.$get(STUDY_CASE_URL);
    const payload = {
      data: res.items,
      time: (new Date()).getTime(),
    }
    context.commit('setItems', payload);
    return res;
  },
}
