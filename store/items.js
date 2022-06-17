import { STUDY_CASE_URL } from '@/constants';

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
    // TODO: move this data manipulation to helper function
    // setItems should only set data to state
    const locationId = data.reduce((acc, cur) => {
      if (!acc[`${cur.location}|${cur.device_id}`]) {
        acc[`${cur.location}|${cur.device_id}`] = [];
      }
      acc[`${cur.location}|${cur.device_id}`].push(cur);
      return acc;
    }, {});

    state.locationId = locationId;
  },
}

export const actions = {
  async fetchItems(context) {
    const res = await this.$axios.$get(STUDY_CASE_URL);
    context.commit('setItems', res.items);
    return res;
  }
}
