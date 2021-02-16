<template>
  <div class="base">
    <div class="wrap">
      <Message @chooseMessage="edit" v-bind:key="message.id" v-for="message in messageList"
               :message="message"></Message>
    </div>
    <input class="input" v-on:chooseMessage="edit" type="text" v-model="message.text" v-on:keyup.enter="send">
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
  data() {
    return {
      newMessageText: '',
      message: {},
    }
  },
  computed: {
    ...mapGetters(["get"]),
    messageList() {
      // return null
      return this.get("messages");
    }
  },
  methods: {
    ...mapActions(["sendMessage"]),
    send() {
      this.sendMessage(this.message);
      this.message = {};
    },
    edit(val) {
      this.message = val;
    }
  }
}

</script>

<style scoped>
.wrap {
  height: 50vh;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  margin: auto;
}
.input {
  width: 100%;
  margin-top: 1%;
}
.base{
  width: 30vw;
  margin: auto;
}
</style>
