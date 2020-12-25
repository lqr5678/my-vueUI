<template>
  <div>
    <el-form-item :label="selectLabel" :prop="prop" :label-width="labelWidth" :inline-message='showError'>
      <el-select
        v-model="region"
        :placeholder="placeholder"
        @change="selchange"
        :disabled='disabled'
        :filterable="filterable"
      >
        <el-option
          v-for="(item,index) in optionarr"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
          <slot name="select" :data="item" class="slotitem"></slot>
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
/**
 **** @param {placeholder} 	占位符 默认可选择 可传可不传
 **** @param {selectLabel} 	是否显示label 
 **** @param {optionarr} 		option的数组 label,value
 **** @param {showError} 		是否显示校验错误信息(是否必填)
 **** @param {filterable} 	是否可以搜索条框里的值默认不可搜索
 **** @param {disabled} 	  是否禁用
 **** @param {prop} 				定义校验的参数(传值校验,不传则不校验)
 **** @param {labelWidth} 	label宽度
 */
<script>

export default {
  name: "SgSelect",
  props: {
		labelWidth: {
			type: String,
			default: '183px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    selectLabel: {
      type: String,
      default: ""
    },
    optionarr: {
      type: Array,
      default: () => ([])
    },
    showError: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: false
		},
		prop: {
			type: String,
			default: ''
		}
  },
  components: {
    // "el-form": Form,
    // "el-select": Select
  },
  data() {
    return {
      region: "",
    };
	},
	created() {
    console.log(this.optionarr)
    console.log(typeof(this.optionarr))
    if(!this.optionarr)return
		// console.log(this.optionArr)
		this.optionarr.forEach(element => {
			if(element.isFlag) {this.region = element.value, this.$emit('selchange', element.value)}
		});
  },
  methods: {
    selchange(value) {
      // console.log(value);
      this.$emit('selchange', value)
    },
  }
};
</script>

<style scoped>
.slotitem {
	line-height: 1
}
</style>
