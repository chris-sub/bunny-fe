<template>
  <div :class="modalClass">
    <div class="modal-body">
      <div class="modal-nav">
        <slot name="nav"></slot>
      </div>
      <div class="modal-content">
        <slot name="content"></slot>
      </div>
      <div class="close-btn" @click="isOpen=false">
        Close
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
    props: [
      'open'
    ],
    event:'modalChange',
    data() {
        return {
        }
    },
    watch:{
       open: function(){
           this.isOpen = this.open;
        }
    },
    computed: {
      isOpen: {
            get: function() {
                return this.open
            },
            set: function(value) {
                this.$emit('modalChange', value)
            }
        },
      modalClass:function() {
        return "modal"+(this.isOpen===true ? "" : " hide");
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal.hide {display:none}
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  display:flex;
  align-items:center;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.2); /* Black w/ opacity */
}
.modal-body {
  background:#FFF;
  border-radius:15px;
  padding:20px;
  text-align:left;
  box-shadow:0 2px 5px rgba(0,0,0,0.2);
  width:750px;
  margin:50px auto;
}
.modal-nav {display:flex; align-items:center; justify-content:space-between}
.modal .close-btn {border-radius:10px; transition:.5s; cursor:pointer; display:inline-block; float:right; background:#bf311a; color:#FFF; padding:10px; text-transform:uppercase; font-size:.6em; letter-spacing:2px;}
.modal .close-btn:hover {box-shadow:0 2px 5px rgba(0,0,0,0.3)}
</style>
