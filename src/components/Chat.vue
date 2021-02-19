<template>
  <div class="base">
    <div class="wrap" id="scroll" ref="test" v-if="messageList">
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
    messageList: {
      get() {
        return this.get("messages");
      },
      // return null
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
  },
  updated() {
    setTimeout(() => {
    }, 200)
    this.$refs['test'].scrollTo(0, this.$refs['test'].scrollHeight)
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
