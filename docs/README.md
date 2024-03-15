## 介绍

基于 vue2 自己开发的组件库。实时编辑并预览。

## tabs

<vuep template="#myTabs"></vuep>

<script v-pre type="text/x-template" id="myTabs">
<template>
  <div>
    {{tab}}
    <my-tabs
      :tabs="tabs"
      v-model="tab"
      @change="change"
    >
    </my-tabs>
  </div>
</template>
<script>
module.exports = {
  data () {
    return {
      tab: 0,
      tabs: [
        { name: '图片' },
        { name: '视频' },
        { name: '文件'},
        // { name: '代码', disabled: true },
      ]
    }
  },
  methods:{
    change(index, item){
      console.log(index)
      console.log(item)
    }
  }
}
</script>

### Tag Attributes

| 参数     | 说明       | 类型    | 默认值 |
| -------- | ---------- | ------- | ------ |
| tabsName | 键值       | String  | name   |
| 内部对象.disabled | 是否可点击 | Boolean | false  |

### Tag Events

| 事件名称 | 说明             | 回调 Type |
| :------- | :--------------- | :-------- |
| change   | 点击时触发的事件 | Function  |

## tag

<vuep template="#myTag"></vuep>

<script v-pre type="text/x-template" id="myTag">
<template>
  <div>
    {{tag}}
    <my-tag v-model="tag" @add="add" @delete="deleteFn"></my-tag>
  </div>
</template>
<script>
module.exports = {
  data () {
    return {
      tag: [{"title": "标签1"}, {"title": "标签2"}]
    }
  },
  methods:{
    add(item){
      console.log(item)
    },
    deleteFn(item){
      console.log(item)
    }
  }
}
</script>

### Tag Attributes

| 参数       | 说明                             | 类型    | 默认值 |
| ---------- | -------------------------------- | ------- | ------ |
| disabled   | 是否可添加删除                   | Boolean | false  |
| type       | 颜色 success info warning danger | String  |        |
| size       | 大小 medium small mini           | String  | medium |
| tag-key    | 键值                             | String  | title  |
| max-length | 文字最大长度                     | Number  | 1000   |
| max        | 最多添加 tag 数量                | Number  | 1000   |
| addBtn     | 按钮文字                         | String  | 标签   |

### Tag Events

| 事件名称 | 说明                   | 回调 Type |
| :------- | :--------------------- | :-------- |
| add      | 点击 新增 时触发的事件 | Function  |
| delete   | 点击 删除 时触发的事件 | Function  |



## Step

<vuep template="#myStep"></vuep>

<script v-pre type="text/x-template" id="myStep">
<template>
  <div>
    <my-step :active="active" type="success" :steps-list="stepsList"></my-step>
  </div>
</template>
<script>
module.exports = {
  data () {
    return {
      active: 0,
      stepsList: [
        { title: '标题1', desc: '我是描述一' },
        { title: '标题2', desc: '我是描述二' },
        { title: '标题3', desc: '我是描述三' },
        { title: '标题4', desc: '我是描述四' },
      ]
    }
  },
  methods:{
    add(item){
      console.log(item)
    },
    deleteFn(item){
      console.log(item)
    }
  }
}
</script>

### Tag Attributes

| 参数       | 说明                             | 类型    | 默认值 |
| ---------- | -------------------------------- | ------- | ------ |
| active   | 当前位置                   | Number | 0  |
| type       | 完成步骤的颜色 primary：蓝色，success：绿色   primary: 蓝色  default：灰色 | String  |   default     |



## Progress

<vuep template="#myProgress"></vuep>

<script v-pre type="text/x-template" id="myProgress">
<template>
  <div>
    <my-progress :data="progressObj" :is-percent="false"></my-progress>
  </div>
</template>
<script>
module.exports = {
  data () {
    return {
      progressObj: {
        progressWidth: 100,
        height: '30',
        currentData: 50,
        total: 100,
      }
    }
  }
}
</script>

### Tag Attributes

| 参数       | 说明                             | 类型    | 默认值 |
| ---------- | -------------------------------- | ------- | ------ |
| data.progressWidth   | 进度宽度                   | Number | 400  |
| data.height   | 高度                   | Number | 20  |
| data.total       | 总数  | Number  |        |
| data.currentData       | 显示进度数  | Number  |        |
| text-inside       | 进度数是否在进度条中显示  | Boolean  |  false      |
| is-percent       | 是否显示百分比  | Boolean  |  true      |
| color       | 背景色  | String  |        |



## Loading

<vuep template="#myLoading"></vuep>

<script v-pre type="text/x-template" id="myLoading">
<template>
  <div>
    <my-loading :is-full-sreen="false"></my-loading>
  </div>
</template>
<script>
</script>

### Tag Attributes

| 参数       | 说明                             | 类型    | 默认值 |
| ---------- | -------------------------------- | ------- | ------ |
| auto-close   | 点击自动关闭                   | Boolean | true  |
| show-loading   | 是否显示加载效果                   | Boolean | true  |
| loading-type       | 加载类型  | String（wave、dots、circle）  |  wave      |
| loading-text       | 文字  | 加载中......  |        |
| is-full-sreen       | 是否全屏展示  | Boolean  |  false      |