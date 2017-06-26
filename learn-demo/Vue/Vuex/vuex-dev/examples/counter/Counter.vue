<template>
  <div id="app">
    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters([
    'evenOrOdd'
  ]),
  /*methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])*/
  methods:{
    increment(){
      this.$store.dispatch('increment')
    },
    decrement(){
      this.$store.dispatch('decrement')
    },
    incrementIfOdd(){
      this.$store.dispatch('incrementIfOdd')
    },
    incrementAsync(){
      this.$store.dispatch('incrementAsync',5000)
    }
  }
}
</script>
