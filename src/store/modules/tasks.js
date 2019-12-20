const state = {
  tasks: []
}

// getters
const getters = {
  tasks:function(state)  {
    return state.tasks;
  }
}

// actions
const actions = {
  getTasks (state, user) {
    api().get(`/tasks/${user}`).then(res=> {
      state.commit('storeTasks', res.data)
    });
  },
  createTask(state, task) {
    api().post(`/task`, {task}).then(() => {
      state.dispatch('getTasks', task.user)
    });
  },
  updateTask(state, task) {
    api().put(`/task/${task.id}`, {task}).then(() =>
      state.dispatch('getTasks', task.user)
  );
  }
}

// mutations
const mutations = {
    storeTasks(state, tasks) {
      state.tasks=tasks;
    },
    addTask(state, task) {
      state.tasks.push({
        id:task.id,
        description:task.description,
        state:task.state,
        user:task.user
      });
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
