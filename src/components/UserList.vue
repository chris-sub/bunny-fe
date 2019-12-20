<template>
  <div class="user-list">
    <p v-if="!users">
      Nobody here
    </p>
    <table v-else>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <h1>{{user.name}}</h1>
            <h2>ID: {{user.id}}</h2>
          </td>
          <td>
            <button @click="view(user)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal :open="openModal" @modalChange="modalChanged">
      <template v-slot:nav>
        <div>
          <input type='text' v-model="edit.name" v-if="editing" />
          <h1 v-else>Name: {{current.name}}</h1>
          <h4>ID: {{current.id}}</h4>
        </div>
        <div>
          <button v-if="!editing" @click="editing=true">Edit</button>
          <button v-else @click="updateUser(current)">Update</button>
          <button @click="deleteUser(current)">Delete</button>
        </div>
      </template>
      <template v-slot:content>
        <h3>To Do</h3>
        <div>
          <button @click="taskFormOpen=true">Create Task</button>
        </div>
        <div id='task-form' v-if='taskFormOpen'>
        <div>
          <label>Description</label><br />
          <textarea v-model="form.description"></textarea>
        </div>
        <div>
          <label>Mark as Done</label>
          <input type="checkbox" v-model="form.state" true-value="1"
  false-value="0">
        </div>
        <button @click="saveTask">Submit</button>
      </div>
        <table>

          <tbody>
            <tr v-for="task in $store.state.tasks.tasks" :key="task.id">
<td>
  {{task.id}}
</td>
<td>
  {{task.description}}
</td>
<td>
  {{task.state?'Done':'To Do'}}
</td>
<td>
  <button @click='editTask(task)'>Edit Task</button>
</td>
            </tr>
          </tbody>
        </table>
        <hr>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'UserList',
  data() {
    return {
      openModal:false,
      current:{},
      editing:false,
      editingTask:false,
      edit:{},
      tasks:[],
      taskFormOpen:false,
      form:{
        description:null,
        state:null
      },
      taskStates:[
        "To Do",
        "Done"
      ]
    }
  },
  props: [
    'users'
  ],
  components: {
    Modal
  },
  methods: {
    modalChanged:function(val) {

      this.openModal=val;
      this.editing=false;
    },
    view:function(user) {
      this.current=user;
      this.edit.name=user.name;
      this.$store.dispatch('tasks/getTasks', user.id);
      this.tasks=this.$store.state.tasks.tasks;
      this.openModal=true;

    },
    updateUser:function(currentUser) {
      let user=this.usersMutable[this.users.indexOf(currentUser)];
      user.name=this.edit.name;
      this.$emit('userChange', user);
      this.editing=false;
    },
    editTask:function(task) {
      this.taskFormOpen=true;
      this.form.description=task.description;
      this.form.state=task.state;
      this.form.id=task.id;
      this.editingTask=true;
    },
    saveTask:function() {
      this.form.user=this.current.id;
      if(this.editingTask)
        this.$store.dispatch('tasks/updateTask', this.form);
      else
        this.$store.dispatch('tasks/createTask', this.form);
      this.form={};
      this.editingTask=false;
      this.taskFormOpen=false;
    },
    deleteUser:function(user) {
      this.$store.dispatch('users/deleteUser', user.id).then(() => {
        this.openModal=false;
        this.$emit('userDelete');
      });
    }
  },
  computed: {
    usersMutable: {
        get: function() {
            return this.users
        }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {border:1px solid #dadada; margin:0 auto;}
table tr:nth-child(even) {background:#fafafa;}
table h1{font-size:1.2em; letter-spacing:1px; color:#707070}
table h2 {font-size:.8em; color:#bababa}
table tr td {padding:0 20px;}
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
