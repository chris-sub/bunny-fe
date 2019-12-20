<template>
  <div id="app">
    <UsersPage/>
  </div>
</template>

<script>
import UsersPage from './components/pages/UsersPage.vue'
import 'es6-promise/auto'
import store from './store'

export default {
  name: 'app',
  components: {
    UsersPage
  },
  store,
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
