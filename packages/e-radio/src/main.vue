<template>
  <el-form-item :label-width="labelWidth" :label-position="labelPosition" :required="required" :prop="prop" :rules="rules">
			<div slot="label" v-if="label" class="label">
				{{label}}
				<el-tooltip class="item" effect="dark" :content="mark" placement="bottom">
					<i class="el-icon-question mark" v-if="mark"></i>
				</el-tooltip>
				：
			</div>
      <el-radio v-model="localValue" :label="item.key" v-for="(item, i) in options" :key="i"
			@change="$emit('change', localValue);" :disabled="item.disabled">{{item.value}}</el-radio>
  </el-form-item>
</template>

<script>	
/* 
@desc: 单选框组件
@param: label      [string]   选项名称
@param: labelWidth [string]   选项名称宽度（带单位）
@param: options    [object]   选项值
@param: mark       [string]   是否显示提示说明
@param: required   [boolean]  是否必填
@param: disabled   [boolean]  是否禁用
@param: prop       [string]   表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
@param: rules      [object]   单条表单验证规则
@event: change     绑定值变化时触发的事件
*/
export default {
	name: 'e-radio',
	props: {
		value: String,
		label: [String, Number, Boolean],
		labelWidth: {
			type: String,
			default: 'auto'
		},
		labelPosition: String,
		options: {
			type: Array,
			required: true
		},
		mark: String,
		required: {
			type: Boolean,
			default: false
		},
		disabled: Boolean,
		prop: String,
		rules: Array
	},
  model: {
    prop: 'value',
    event: 'change'
  },
	watch: {
		value(newVal){
			this.localValue = newVal
		}
	}, 
  data() {
    return {
			localValue: this.value
    };
	} 
};
</script>

<style>
.label {
	display: inline-block;
}
.mark {
	margin: 0 2px;
	cursor: pointer;
}
</style>