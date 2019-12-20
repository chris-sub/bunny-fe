<template>
  <div class="container">
    <h1>Users</h1>
    <i v-if="loading">Loading...</i>
    <UserList v-else :users="this.$store.state.users.users" @userChange="userChanged" @userDelete="userDeleted"></UserList>
  </div>
</template>

<script>
import UserList from '../UserList.vue'

export default {
  data() {
    return {
      loading:true,
      users:[
      ]
    }
  },
  mounted() {
    this.$store.dispatch('users/getUsers');
    this.loading=false;
  },
  components: {
    UserList
  },
  methods: {
    userChanged:function(val) {
      this.$store.dispatch('users/updateUser', val);
      // eslint-disable-next-line no-console
      console.log(val);
      this.users=val;
    },
    userDeleted:function() {
      this.loading=true;
    
      this.loading=false;
    }
  },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
