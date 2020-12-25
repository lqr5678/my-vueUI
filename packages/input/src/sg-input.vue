<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @LastEditors: Seven
-->
<template>
  <div class="sg-form">
    <el-form-item
      :inline-message="isinlineMsg"
      :prop="isRequired ? prop : ''"
      class="sg-input"
      :label="sgccLableName"
      :label-position="sgccTextAlign"
      :hide-required-asterisk="ishideAsterisk"
      :error="sgError"
      :label-width="labelWidth"
      :rules="[
        {
          validator: (rule, value, callback) => {
            checkHour(rule, value, callback);
          }, //后面的这几个是传的自定义参数
          trigger: 'blur',
        },
      ]"
    >
      <!-- 文本域-->
      <el-input
        v-if="sgType === 'textarea'"
        :type="sgType"
        :maxlength="sgMaxlength"
        :placeholder="sgplaceHolder"
        :show-word-limit="true"
        v-model.trim="sginput"
        @input="$emit('input', $event)"
      ></el-input>
      <!-- 普通输入框 -->
      <el-input
        v-else
        :type="sgType"
        :maxlength="sgMaxlength"
        :placeholder="sgplaceHolder"
        v-model.trim="sginput"
        @input="$emit('input', $event)"
      ></el-input>
      <span v-if="sginputBehind">{{ sginputBehind }}</span>
      <i v-show="isWarnMsg" class="sg-errtxt">{{ isWarnMsgtext }}</i>
    </el-form-item>
  </div>
</template>

<script>
import {
  mobile,
  verifCode,
  number,
  contactName,
  vatName,
  unifyCreditCode,
  depositBank,
  bankAccount,
  registerAddr,
  custNoType,
  consName,
  telNo,
  bgnDate,
  sgcustom,
} from "./js/sg-validata";

export default {
  name:"SgInput",
  props: {
    /**
     * @param {prop}   表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
     * @param {value}  保证父组件中，v-bind:value可以正常设置值
     * @param {labelWidth} 设置label的宽
     * @param {sginputBehind}  输入框后面的追加的文字 -如果传就显示如果不传就不显示 (kvw)
     * @param {isRequired} 是否必填
     * @param {ishideAsterisk} 是否显示必填字段的标签旁边的红色星号
     * @param {sgccLableName} 如果不传则不显示label,默认不显示labei
     * @param {sgType} 输入框类型 原生属性
     * @param {sgplaceHolder} 占位符
     * @param {sgMaxlength} 文本域可输入字符的最大长度
     * @param {isinlineMsg} 错误校验 是否以行内形式展示
     * @param {isWarnMsg} 提示说明
     * @param {isWarnMsgtext} 提示说明文字
     * @param {sgccTextAlign} 默认对齐方式  right 右 left 左 默认居右
     * @param {isshowMeg} 是否显示校验错误信息
     * @param {sgError} 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息
     * @param {sgccInputType} //校验类型
     * @param {custom} //自定义校验-传过来一个正则字段uetest和提示hintErr字段
     * @param {custNoType} //身份证军人证户口本类型
     */
    custNoType: [String, Number],
    custom: Object,
    sgccInputType: String,
    prop: String,
    value: [String, Number],
    labelWidth: {
      type: String,
      default: "auto",
    },
    sginputBehind: [String, Number],
    isRequired: {
      type: Boolean,
      default: true,
    },
    ishideAsterisk: {
      type: Boolean,
      default: true,
    },
    sgccLableName: {
      type: String,
      default: "你的名字:",
    },
    sgType: {
      type: String,
      default: "text",
    },
    sgplaceHolder: {
      type: String,
      default: "请输入内容",
    },
    sgMaxlength: {
      type: [Number,String],
      default: 50,
    },
    isinlineMsg: {
      type: Boolean,
      default: true,
    },
    isWarnMsg: {
      type: Boolean,
      default: false,
    },
    isWarnMsgtext: {
      type: String,
      default: "输入错误了",
    },
    sgccTextAlign: {
      type: String,
      default: "right",
    },
    isshowMeg: {
      type: Boolean,
      default: true,
    },
    sgError: {
      type: String,
    },
  },
  data() {
    return {
      // 获取props中value的值，并与el-input绑定，过程中不修改props中value的值，保证了单向数据流原则
      sginput: "",
    };
  },
  methods: {
    checkHour(rule, value, callback) {
      if (this.sgccInputType == "mobile") {
        mobile(rule, value, callback); //手机号
      } else if (this.sgccInputType == "verifCode") {
        verifCode(rule, value, callback); //验证码
      } else if (this.sgccInputType == "vatName") {
        vatName(rule, value, callback); //增值税名
      } else if (this.sgccInputType == "unifyCreditCode") {
        unifyCreditCode(rule, value, callback); //统一信用代码
      } else if (this.sgccInputType == "depositBank") {
        depositBank(rule, value, callback); //开户银行
      } else if (this.sgccInputType == "bankAccount") {
        bankAccount(rule, value, callback); //银行账号
      } else if (this.sgccInputType == "registerAddr") {
        registerAddr(rule, value, callback); //注册地址
      } else if (this.sgccInputType == "cardId") {
        cardId(rule, value, callback, this.custNoType); //身份证
      } else if (this.sgccInputType == "consName") {
        consName(rule, value, callback); //企业名称
      } else if (this.sgccInputType == "telNo") {
        telNo(rule, value, callback); //手机号 固话
      } else if (this.sgccInputType == "bgnDate") {
        bgnDate(rule, value, callback); //起征日期
      } else if (this.sgccInputType == "contactName") {
        contactName(rule, value, callback); //姓名
      } else if (this.sgccInputType == "sgcustom") {
        sgcustom(rule, value, callback, this.custom); //自定义校验
      }else{
        callback();
      }
    },
  },
  watch: {
    value: {
      handler: function (val) {
        if (this.sgccInputType == 'number') {
          this.sginput = val.replace(/[^\d]/g, "");
        }else{
          this.sginput = val;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang='scss' scoped>
.sg-form /deep/ {
  .el-input,
  .el-textarea {
    width: 240px;
  }
  .el-textarea .el-input__count {
    background: transparent;
    bottom: 0;
  }
  .sg-errtxt {
    font-style: normal;
    position: absolute;
    top: auto;
    left: auto;
    display: inline-block;
    margin-left: 10px;
    color: #b5bbca;
    font-size: 12px;
    line-height: 1;
    padding-top: 14px;
  }
}
</style>