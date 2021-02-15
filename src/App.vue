<template>
  <div id="app">
    <Chat/>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import {mapActions} from "vuex"

export default {
  name: 'App',
  components: {
    Chat
  },
  created() {
    this.updateAllMessages();
    this.listenMessages();
  },
  methods: {
    ...mapActions(["updateAllMessages","listenMessages"])
  }
}
</script>

<style>

</style>
