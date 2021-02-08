<template>
  <el-form-item :label-width="labelWidth" :required="required" :prop="prop" :rules="rules">
      <div slot="label" v-if="label" class="label">
				{{label}}
				<el-tooltip class="item" effect="dark" :content="mark" placement="bottom">
					<i class="el-icon-question mark" v-if="mark"></i>
				</el-tooltip>
				：
			</div>
      <el-date-picker v-model="localValue" :type="type" :placeholder="placeholder" :size="size" 
      :format="format"
      :value-format="format"
      :disabled="false"
      :picker-options="pickerOptions" 
      @change="$emit('change', $event);" 
      @blur="$emit('blur', $event);" 
      @focus="$emit('focus', $event);">
      </el-date-picker>
  </el-form-item>
</template>

<script>
/* 
@desc: 时间组件
@param: label        [string]   选项名称
@param: labelWidth   [string]   选项名称宽度（带单位）
@param: type         [string]   显示类型(eg: year/month/date/dates/week/datetime/datetimerange/daterange/monthrange)
@param: startDate    [string]   开始时间
@param: endDate      [string]   结束时间
@param: format       [string]   显示在输入框中的格式（eg:	yyyy-MM-dd）
@param: placeholder  [string]   非范围选择时的占位内容
@param: required     [boolean]  是否必填
@param: disabled     [boolean]  是否禁用
@param: mark         [boolean]  是否显示提示说明
@param: size         [string]   尺寸（large, small, mini）
@param: prop         [string]   表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
@param: rules        [object]   单条表单验证规则
@event: change       用户确认选定的值时触发
@event: blur         当 input 失去焦点时触发
@event: focus        当 input 获得焦点时触发
*/
export default {
  name: 'e-date',
  props: {
    value: String,
    label: String,
    labelWidth: {
      type: String,
      default: "auto",
    },
    type: {
      type: String,
      default: 'date'
    },
    startDate: String,
    endDate: String,
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    placeholder: {
      type: String,
      default: '选择日期'
    },
    required: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
		mark: String,
    size: String,
    prop: String,
    rules: Array
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  /* mounted(){
    console.log(this.localValue)
  }, */
	watch: {
		value(newVal){
			this.localValue = newVal
		}
	}, 
  data(){
    return {
			localValue: this.value
    }
  },
  computed: {
    pickerOptions() {
      var _this = this;
      return {
        disabledDate(time) {
          if(_this.startDate === '' && _this.endDate === '') return true;
          var startD = new Date(_this.startDate); // 获取到的起始日期
          var endD = new Date(_this.endDate); // 获取到的起始日期
          var start, end;
          start = startD.getTime();  
          end = endD.getTime(); 
          return time.getTime() < start || time.getTime() > end; // 这里就是设置日期不能被点击
        }
      };
    },
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