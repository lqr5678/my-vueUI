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
          <!-- <p>
            <span>
              当前暂停设备
              {{ total_station }}台， 总容量 {{ total_capacity }}kVA
              已选择启用设备 {{ chosen_station }}台， 启用设备总容量
              {{ chosen_capacity }}kVA
            </span>
          </p> -->
          <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            class="form_table mark"
          >
					<slot name='table-info'></slot>
            <!-- <el-table-column
              type="selection"
              label
              width="32"
            ></el-table-column> -->
            <!-- <el-table-column prop="tranName" label>
              <template slot-scope="scope">
                <p>
                  <span class="tranClass textOverflow">{{
                    scope.row.tranName
                  }}</span>
                  <span class="tranClass2 textOverflow"
                    >设备编号:{{ scope.row.equipId }}</span
                  >
                  <span
                    >设备容量:{{
                      scope.row.plateCap || scope.row.newEquipCap
                    }}&nbsp;kVA</span
                  >
                </p>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </transition>
    </el-form-item>
  </div>
</template>

<script>
export default {
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
			},
		},

    'ischgTrans': {
      handler(newVal, oldVal) {
        console.log(newVal, 'newVal')
        // // 重新输入申请恢复容量
        // this.chosen_capacity = ''
        // // 已启动设备数
        // this.chosen_station = 0;
      }
    },
    'chosen_capacity': {
      handler(newVal, oldVal) {
        // console.log(newVal, 'newVal')
        this.$emit('input', newVal);
      }
    },
  },

  data() {
    return {
      // equipLists: [], // 受电设备数据集列表
      // total_station: 0, // 所有设备数量
      // total_capacity: '', // 所有设备总容量
      isDisplayTable: false, // 是否显示容量表格
      chosen_capacity: '', //  已启动设备容量
      // chosen_station: 0, //  已启动设备台数
    }
  },

  methods: {
    // 选中的设备
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    //   // 重新设置为空
    //   this.chosen_capacity = ''; // 已启用设备总容量
    //   this.chosen_station = val.length; // 已启动设备数

    //   // 已启用设备总容量
    //   val.forEach((item, i) => {
    //     // 加上已勾选的设备容量并转为数字类型
    //     this.chosen_capacity += parseFloat(item.plateCap || item.newEquipCap);
    //     // 转化为数字类型
    //     this.chosen_capacity = parseFloat(this.chosen_capacity)
    //   });

    //   this.equipLists = val
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