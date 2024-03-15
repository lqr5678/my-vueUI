<template lang="html">
  <ul :class="'nav-'+type" class="nav">
    <li
      v-for="(tab,index) in tabs"
      v-show="!tab.hide"
      :key="index"
      :class="{active:index===value, disabled: tab.disabled}"
    >
      <a href="###" @click.prevent="active(index,tab)">{{tab[tabsName]||tab}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'myTabs',
  props: {
    tabsName: {
      type: String,
      default () {
        return 'name'
      }
    },
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      default: 0
    },
    type: {
      type: String,
      default: 'tabs'
    }
  },
  methods: {
    active (index, tab) {
      if (tab.disabled) return
      this.$emit('input', index)
      this.$emit('change', index, tab)
    }
  }
}
</script>
<style>
li a{
  color: #42b983;
}
li.active a{
  color: red;
}
</style>