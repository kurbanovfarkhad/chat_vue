<template>
  <div @click="editMessage" ><i>{{message.id}}</i> {{message.text}}</div>
</template>
<script>
  export default {
    name:"Message",
    props:{
      message:Object
    },
    methods:{
      editMessage(){
        this.$emit('chooseMessage', this.message)
      }
    },

  }
</script>
<style scoped>
  div{
    background: red;
  }
</style>
