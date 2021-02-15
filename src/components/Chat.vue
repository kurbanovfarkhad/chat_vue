<template>
  <div>
    <Message @chooseMessage="edit" v-bind:key="message.id" v-for="message in messageList" :message="message"></Message>
    <input v-on:chooseMessage="edit" type="text" v-model="message.text" v-on:keyup.enter="send">
  </div>
</template>

<script>
  import Message from "@/components/Message";
  import {mapGetters, mapActions} from "vuex"
  export default {
    name: 'Chat',
    components: {
      Message,
    },
    data(){
      return {
        newMessageText:'',
        message:{},
      }
    },
    computed: {
      ...mapGetters(["get"]),
      messageList(){
        // return null
        return this.get("messages");
      }
    },
    methods:{
      ...mapActions(["sendMessage"]),
      send() {
        this.sendMessage(this.message);
        this.message = {};
      },
      edit( val ){
        this.message = val;
      }
    }
  }

</script>

<style scoped>
</style>
