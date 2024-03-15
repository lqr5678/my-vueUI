<!--
active: 当前步骤下标
type: 完成步骤的颜色 默认蓝色，success：绿色   primary: 蓝色
stepsList： 步骤条内容
用法示例：
<my-steps :active="active" type="success" :steps-list="stepsList" class="item"/>
active: 1
stepsList: [
  {
    title: '步骤一',
    desc: '文字描述'
  }
]
-->
<template>
  <div class="my-steps-wrap" :class="type">
    <div
      class="my-steps-item"
      :class="[active >= index ? 'active' : '', active === index ? 'last' : '']"
      v-for="(item, index) in stepsList"
      :key="index"
    >
      <span class="steps-line"></span>
      <div class="steps-icon">{{ index + 1 }}</div>
      <div class="steps-title" v-html="item.title"></div>
      <div class="steps-desc" v-html="item.desc"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myStep',
  props: {
    active: {
      type: Number,
      default: 0
    },
    stepsList: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'primary', 'success', 'info', 'warning', 'danger'].includes(val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@base: #ababab;
@set: {
  default: #333;
  primary: #337ab7;
  success: #5cb85c;
  info: #46b8da;
  warning: #f0ad4e;
  danger: #d9534f;
};

.my-steps-wrap {
  display: flex;
}
.my-steps-item {
  flex: 1;
  position: relative;
  text-align: center;
  color: @base;
  word-break: break-all;
}
.my-steps-item.last .steps-line {
  background: @base;
}
.my-steps-item:last-child .steps-line {
  display: none;
}
.steps-line {
  margin: 0 15px;
  position: absolute;
  left: 50%;
  right: -50%;
  top: 11px;
  height: 2px;
  background-color: @base;
}
.steps-icon {
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 24px;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  box-sizing: border-box;
  color: @base;
  transition: 0.15s ease-out;
  border-radius: 50%;
  box-shadow: inset 0 0 0px 2px @base;
}
.steps-title {
  font-size: 16px;
  line-height: 38px;
}
.steps-desc {
  padding-left: 20%;
  padding-right: 20%;
  margin-top: -5px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
}
each(@set, {
    .my-steps-wrap.@{key} .steps-icon{
      color: @value;
      box-shadow: inset 0 0 0px 2px @value;
    }
    .my-steps-wrap.@{key} .active .steps-icon{
      background: @value;
      color: #fff;
      box-shadow: none;
    }
    .my-steps-wrap.@{key} .active .steps-line{
      background: @value;
    }
    .my-steps-wrap.@{key}{
      .steps-title, .steps-desc {
        color: @value;
      }
    }
  });
</style>
