<template>
  <el-table-column
    :prop="itemCol.prop"
    :show-overflow-tooltip="itemCol.tooltip"
    :align="handleAlign(itemCol)"
    :label="itemCol.label"
    :fixed="itemCol.fixed ? itemCol.fixed : false"
    :width="itemCol.width"
  >
    <!-- 多级表头 -->
    <template v-if="itemCol.type === 'innerColumn' && itemCol.children.length">
      <table-column v-for="(innerItem, index) in itemCol.children" :key="index" :itemCol="innerItem" />
    </template>

    <!-- 不是多级表头 -->
    <template v-if="itemCol.type !== 'innerColumn'" slot-scope="scope">
      <!-- 序号列 -->
      <div v-if="itemCol.type == 'index'">
        {{ itemCol.getIndex ? itemCol.getIndex(scope.$index) : scope.$index + 1 }}
      </div>
      <!-- 可点击文字 -->
      <div v-else-if="itemCol.type == 'link'">
        <el-button
          v-if="scope.row[itemCol.prop]"
          type="text"
          size="mini"
          :disabled="scope.row['disabled']"
          @click="operClick(scope, itemCol.click)"
        >
          {{ scope.row[itemCol.prop] }}
        </el-button>
        <span v-else>--</span>
      </div>
      <!-- 需要遍历查找 -->
      <div v-else-if="itemCol.type == 'find'">
        <el-tooltip v-if="Boolean(itemCol.customTip)" effect="dark" :content="itemCol.customTip" placement="top">
          <span>{{ toLabel(itemCol.option, scope.row[itemCol.prop], itemCol.optionValue, itemCol.optionLabel) }}</span>
        </el-tooltip>
        <span v-else>{{ toLabel(itemCol.option, scope.row[itemCol.prop], itemCol.optionValue, itemCol.optionLabel) }}</span>
      </div>
      <!-- 操作列 -->
      <div v-else-if="itemCol.type == 'operation'">
        <span v-for="(oper, index) in itemCol.children" :key="oper.key" :class="{ 'ml-5': index > 0 }">
          <el-button
            v-if="!oper.popover && !oper.isHide"
            :type="oper.type ? oper.type : 'primary'"
            size="mini"
            @click="operClick(scope, oper.click)"
            >{{ oper.name }}
          </el-button>
          <el-popconfirm v-if="oper.popover && !oper.isHide" :title="oper.content" @confirm="operClick(scope, oper.click)">
            <el-button :type="oper.type ? oper.type : 'primary'" size="mini" slot="reference">{{ oper.name }} </el-button>
          </el-popconfirm>
        </span>
      </div>
      <span v-else>
        <!-- 除0外，其他空值(null、undefined)转为'--'-->
        <!-- 这里babelrc版本低暂时不能解析 -->
        <!-- {{ scope.row[itemCol.prop] === '' ? '--' : scope.row[itemCol.prop] ?? '--' }} -->
        {{ scope.row[itemCol.prop] === '' ? '--' : scope.row[itemCol.prop] }}
      </span>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'TableColumn',
  props: {
    itemCol: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 需要遍历查找的-获取label
    toLabel(option = [], val, value = 'value', label = 'label') {
      // 这里babelrc版本低暂时不能解析
      // let labelName = option.find((item) => item[value] == val)?.[label];
      // return labelName === "" ? "--" : labelName ?? "--";

      // 除0外，其他空值(null、undefined)转为'--'
      let o = option.find(item => item[value] == val)
      if (o && (o[label] || o[label] == 0)) {
        return o[label]
      } else {
        return '--'
      }
    },
    handleAlign(item) {
      return item.align || 'center'
    },
    // 点击操作按钮
    operClick(scope, callback) {
      callback(scope.row)
    }
  }
}
</script>

<style scoped>
.ml-5 {
  margin-left: 5px;
}
</style>
