<template>
  <!-- 第一次写vue组件库，测试打包、构建逻辑 -->
  <div>
    <button v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "MyButton"
};
</script>

<style lang="less" scoped>
button {
  color: red;
}
</style>
