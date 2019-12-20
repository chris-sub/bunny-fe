const state = {
  users: []
}

// getters
const getters = {
  users:function(state)  {
    // eslint-disable-next-line no-console
    console.log(state);
    return state.users;
  }
}

// actions
const actions = {
  getUsers (state) {
    api().get("/users").then(res=> {
      state.commit('storeUsers', res.data)
    });
  },
  updateUser(state, user) {
    api().put(`/user/${user.id}`, {user});
  },
  deleteUser(state, id) {
    api().delete(`/user/${id}`);
    state.commit('removeUser', id);
  },
}

// mutations
const mutations = {
    storeUsers(state, users) {
      state.users=users;
    },
    removeUser(state, id) {
      const index=state.users.findIndex(user => {
        return user.id === id
      });
      if(index!==undefined)
        state.users.splice(index, 1);
    }
}

import api from '../../services/api.js'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
