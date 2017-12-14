<template>
  <mu-toast v-if="state" class="message" :class="type" :message="text"/>
</template>

<script>
  export default {
    name: 'message',
    data () {
      return {
      }
    },
    computed: {
      state: function () {
        return this.$store.getters.message.state
      },
      text: function () {
        return this.$store.getters.message.text
      },
      type: function () {
        return this.$store.getters.message.type
      }
    }
  }
</script>

<style lang="scss" scoped>
  .message {
    transition: all 0.3s;
  }

  .failed {
    background-color: rgba(239, 33, 33, 0.87);
  }

  .success {
    background-color: rgba(76, 175, 80, 0.87)
  }
</style>