<template>
  <div>
    <el-form-item :label="capacity_label" class="clearfix parBox" :prop="prop">
      <div class="divBox">
        <!-- 减容恢复的 -->
        <el-input
          maxlength="10"
          v-if="ischgTrans == '1'"
          placeholder="请输入"
          v-model.number="chosen_capacity"
          :disabled="isChosen_disabled"
        ></el-input>
        <!-- 暂停恢复的 -->
        <el-input
          v-if="ischgTrans == '0'"
          placeholder="请选择"
          readonly
          @click.native="isDisplayTable = !isDisplayTable"
          v-model="chosen_capacity"
        ></el-input>
        <i
          v-show="!isDisplayTable && ischgTrans == '0'"
          class="inputDown"
          @click="isDisplayTable = !isDisplayTable"
        ></i>
        <i
          v-show="isDisplayTable && ischgTrans == '0'"
          class="inputUp"
          @click="isDisplayTable = !isDisplayTable"
        ></i>
        <span>&nbsp;&nbsp;kVA</span>
      </div>
      <!-- <span v-show="isDisplayErr" style="color: #f56c6c;" class="isDisplayErr"><i class="el-icon-error"></i>申请恢复容量应小于或等于可恢复容量</span> -->
      <transition name="fade">
        <div
          class="tableTitle"
          v-show="isDisplayTable"
          v-if="ischgTrans == '0'"
        >
				  <slot name='title'></slot>
          <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            class="form_table mark"
          >
					  <slot name='tableInfo'></slot>
          </el-table>
        </div>
      </transition>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "sgEquipment",

  props: {
    value: {
      default: ''
    },

    prop: String,

    // 设备表格
    tableData: {
      type: Array,
      default: () => ([])
    },
    // 减容恢复容量默认与可恢复容量相同，用户不可更改(目前上海减容恢复是这样)
    isChosen_disabled: {
      type: Boolean,
      default: false
    },
    // lable名
    capacity_label: {
      type: String,
      default: '申请恢复容量:'
    },
    // 模式， 1选中设备，2手动输入
    ischgTrans: {
      type: String,
      default: "1"
    }
  },

  // model: {
  //   prop: 'chosen_capacity',
  //   event: 'returnBack'
  // },

  watch: {
		value:{
			handler(newVal, oldVal) {
        this.chosen_capacity = newVal
				// console.log(newVal, 'newValvalue')
			}
		},

    'ischgTrans': {
      handler(newVal, oldVal) {
        console.log(newVal, 'newVal')
      }
    },
    'chosen_capacity': {
      handler(newVal, oldVal) {
        console.log(newVal, '子组件newVal')
        this.$emit('input', newVal);
      }
    },
  },

  data() {
    return {
      isDisplayTable: false, // 是否显示容量表格
      chosen_capacity: '', //  已启动设备容量
    }
  },

  methods: {
    // 选中的设备
    handleSelectionChange(val) {
      this.$emit('handle-selection-change', val)
    },
  }
}
</script>

<style scoped>
.tableTitle {
  width: 787px;
  clear: both;
  margin: 8px 0 0 115px;
  padding: 10px 10px 16px;
  background: #fff;
  font-size: 12px;
}
/* 容量恢复表格 */
.parBox >>> .el-form-item__error {
  position: absolute;
  top: 10px;
  left: 348px;
}

/* 设备表格 */
.parBox >>> .el-table__header-wrapper {
  display: none;
}

.parBox >>> .el-table__body {
  width: auto !important;
}

.parBox {
  display: inline;
}

.divBox >>> .el-input {
  width: auto;
}

.divBox >>> .inputUp {
  position: relative;
  left: -11px;
  top: -5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid black;
}
.divBox >>> .inputDown {
  position: relative;
  left: -11px;
  top: 6px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid black;
}
</style>