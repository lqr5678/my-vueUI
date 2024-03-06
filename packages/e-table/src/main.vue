<!--
 * @模块: 表格组件
-->
<template>
  <div>
    <el-table :data="tableData" v-loading="loading">
      <TableColumn v-for="(item, index) in columnData" :key="index" :itemCol="item"></TableColumn>
    </el-table>
  </div>
</template>
<script>
import TableColumn from './TableColumn.vue'
export default {
  components: {
    TableColumn
  },
  name: 'eTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    },
    columnData: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
}
</script>

<style scoped></style>
