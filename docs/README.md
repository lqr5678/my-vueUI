## 介绍

二次开发elementUI封装成为了自己的组件库。实时编辑并预览。

将常用校验规则和属性加进了组件里面，并增加了上传身份证和下拉表格组件。


## e-input输入框

<vuep template="#eInput"></vuep>

<script v-pre type="text/x-template" id="eInput">
<template>
  <div>
    <el-form ref="refForm" :model="inputForm">
      <!-- 不检验 -->
      <e-input v-model="inputForm.eInput" check-type="contactName"></e-input>
      <!-- 内置校验类型 姓名 -->
      <e-input v-model="inputForm.eInput1" prop="eInput1" check-type="contactName"></e-input>
      <!-- 自定义校验只校验不为空 -->
      <e-input v-model="inputForm.eInput2" prop="eInput2" check-type="contactName" custom="姓名"></e-input>
      <!-- 自定义校验 -->
      <e-input v-model="inputForm.eInput3" prop="eInput3" check-type="custom" :custom="verifyCode" lable-name="验证码:"></e-input>
    </el-form>
    <button @click="submit">校验</button>
    <button @click="resetForm">重置</button>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      inputForm: {
        eInput: "",
        eInput1: "",
        eInput2: "",
        eInput3: "",
      },
      verifyCode: {
        uetest: /^\d{6}$/,
        hintErr: "验证码",
      },
    };
  },
  methods: {
    resetForm() {
      this.$refs["refForm"].resetFields();
    },
    submit() {
      this.$refs["refForm"].validate((valid, object) => {
        console.log(object, valid);
        if (!valid) {
          this.$message.error("校验错误");
          this.$nextTick(() => {
            var isError = document.getElementsByClassName("is-error");
            console.log(isError);
            isError[0].querySelector("input").focus();
          });
          return;
        } else {
          this.$message({
            message: "校验成功",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

### 属性值

| 参数           | 说明                                                         | 类型          | 默认值            |
| -------------- | ------------------------------------------------------------ | ------------- | ----------------- |
| label-width   | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto` 。 | string        | —                 |
| maxlength | 文本域可输入字符的最大长度 | Number/String | 50 |
| input-behind | 输入框后面的追加的文字 -如果传就显示如果不传就不显示 (kvw)   | string        | —                 |
| is-required   | 是否必填                                                     | boolean       | false             |
| ishide-asterisk | 是否显示必填字段的标签旁边的红色星号                         | boolean       | false             |
| lable-name | label，如果不传就不显示                                      | string        | —                 |
| type         | 输入框类型 原生属性                                          | string        | input             |
| e-place-holder | 占位符                                                       | String        | —                 |
| isinline    | 错误校验 是否以行内形式展示                                  | boolean       | true              |
| is-warn-msg | 是否显示提示说明                                             | boolean       | false             |
| is-warn-msgtext | 提示说明文字                                                 | String        | —                 |
| text-align | 对齐方式  right 右 left 左                                   | String        | right             |
| is-show-meg   | 是否显示校验错误信息                                         | boolean       | true              |
| error-txt      | 表单验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息 | String        | —                 |
| check-type | 校验类型（封装的正则）                                       | String        | —                 |
| custom         | 自定义校验(如果只校验不为空只传提示文字), (如果校验正则传对象-正则字段**uetest**和提示**hintErr**字段)) | String/object | —/(uetes/hintErr) |
| cust-no-type | 身份证军人证户口本类型                                       | String/Number | —                 |

### Option Attributes

| 参数  | 说明                                                         | 类型                 | 默认值 |
| ----- | ------------------------------------------------------------ | -------------------- | ------ |
| value | 选项的值                                                     | string/number/object | —      |
| prop  | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string               | —      |

## e-radio单选框
<vuep template="#radio"></vuep>

<script v-pre type="text/x-template" id="radio">
<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">
      <e-radio
        label="选项"
        :label-width="labelWidth"
        label-position="left"
        v-model="form.radio1"
        :options="radioArr1"
      ></e-radio>
      <e-radio
        label="是否"
        :label-width="labelWidth"
        label-position="left"
        :options="radioArr2"
        v-model="form.radio2"
        mark="我是提示文字1"
        @change="change"
      ></e-radio>
      <e-radio
        label="用电性质"
        :label-width="labelWidth"
        :options="radioArr3"
        v-model="form.radio3"
        prop="radio3"
        mark="我是提示文字2"
      ></e-radio>
      <el-button @click="submit" type="primary">提交</el-button>
    </el-form>
  </div>
</template>

<script>
 module.exports = {
  data() {
    return {
      labelWidth: '160px',
      radioArr1: [
        {
          key: '1',
          value: '选项一',
        },
        {
          key: '2',
          value: '选项二',
        }
      ],
      radioArr2: [
        {
          key: '1',
          value: '是',
        },
        {
          key: '0',
          value: '否',
        }
      ],
      radioArr3: [
        {
          key: '1',
          value: '个人',
        },
        {
          key: '2',
          value: '企业',
        }
      ],
      form: {
        radio1: '2',
        radio2: '1',
        radio3: '',
      },
      rules: {
        radio3: [{required: true, message: '请选择用电性质', trigger: ['blur', 'change']}],
      }
    }
  },
  methods: {
    //提交
    submit(){
      console.log(this.form);
      this.$refs.form.validate((valid, object) => {
        console.log(valid);
        console.log(object);
      });
    },
    change(){
      console.log('change');
    }
  }
}
</script>

### Attributes

| 参数            | 说明                                                         | 类型                      | 可选值                                                       | 默认值 |
| :-------------- | :----------------------------------------------------------- | :------------------------ | ------------------------------------------------------------ | :----- |
| label           | 标签文本                                                     | string                    | —                                                            | —      |
| label-width     | 表单域标签的的宽度，例如 '50px'。支持 `auto`。               | string                    | —                                                            | —      |
| value / v-model | 绑定值                                                       | string / number / boolean | —                                                            | —      |
| mark            | 是否显示提示说明                                             | string                    | —                                                            | —      |
| required        | 是否必填，如不设置，则会根据校验规则自动生成                 | boolean                   | —                                                            | false  |
| disabled        | 是否禁用                                                     | boolean                   | —                                                            | false  |
| prop            | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string                    | 传入 Form 组件的 `model` 中的字段                            | —      |
| rules           | 表单验证规则                                                 | object                    | —                                                            | —      |

### Events

| 事件名称 | 说明                   | 回调参数              |
| :------- | :--------------------- | :-------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Option Attributes

| 参数    | 说明                                      | 类型                 | 默认值 |
| ------- | ----------------------------------------- | -------------------- | ------ |
| value   | 选项的值                                  | string/number/object | —      |
| label   | 选项的标签，若不设置则默认与 `value` 相同 | string/number        | —      |
| key     | 编码值                                    | string/number        | —      |
| is-flag | 是否默认显示                              | Boolean              | false  |

## e-date日期

<vuep template="#date"></vuep>

<script v-pre type="text/x-template" id="date">
<template>
	<div>
    <el-form ref="form" :model="form" :rules="rules">
      <e-date
        label="时间"
        start-date="2020-05"
        end-date="2020-10"
        format="yyyy/MM"
        type="month"
        v-model="form.date1"
      ></e-date>
      <e-date
        label="时间"
        :label-width="labelWidth"
        start-date="2020/05"
        size="mini"
        format="yyyy/MM"
        type="month"
        v-model="form.date2"
        @focus="focus"
        @blur="blur"
        @change="change"
      >
      </e-date>
      <e-date
        label="开始时间"
        :label-width="labelWidth"
        start-date="2020-11-01"
        end-date="2020-12-28"
        size="small"
        v-model="form.date3"
        placeholder="请选择开始时间"
        required
      ></e-date>
      <e-date
        label="结束时间"
        :label-width="labelWidth"
        start-date="2020-11-01"
        end-date="2020-12-28"
        size="small"
        mark="我是提示文字"
        v-model="form.date4"
        placeholder="请选择结束时间"
        prop="date4"
      ></e-date>
      <el-button @click="submit" type="primary" style="margin-left: 40px;">提交</el-button>
    <el-form>
  </div>
</template>

<script>
 module.exports = {
  data() {
    return {
      labelWidth: '130px',
      form: {
        date1: '2020/06',
        date2: '',
        date3: '',
        date4: '',
      },
      rules: {
          date4: [{required: true, message: '请选择结束时间', trigger: 'change'}],
      }
    }
  },
  methods: {
    //提交
    submit(){
      console.log(this.form);
      this.$refs.form.validate((valid, object) => {
        console.log(valid);
        console.log(object);
      });
    },
    change(){
      console.log('change');
    },
    blur(){
      console.log('blur');
    },
    focus(){
      console.log('focus');
    }
  }
};
</script>


### Attributes

| 参数            | 说明                                                         | 类型                                      | 可选值                                                       | 默认值     |
| :-------------- | :----------------------------------------------------------- | :---------------------------------------- | :----------------------------------------------------------- | :--------- |
| label           | 标签文本                                                     | string                                    | —                                                            | —          |
| label-width     | 表单域标签的的宽度，例如 '50px'。支持 `auto`。               | string                                    | —                                                            | —          |
| value / v-model | 绑定值                                                       | date(DatePicker) / array(DateRangePicker) | —                                                            | —          |
| type            | 显示类型                                                     | string                                    | year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange | date       |
| start-date      | 开始时间                                                     | sting                                     | —                                                            | —          |
| end-date        | 结束时间                                                     | string                                    | —                                                            | —          |
| format          | 显示在输入框中的格式                                         | string                                    | 见[日期格式](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi) | yyyy-MM-dd |
| placeholder     | 非范围选择时的占位内容                                       | string                                    | —                                                            | —          |
| required        | 是否必填，如不设置，则会根据校验规则自动生成                 | boolean                                   | —                                                            | false      |
| disabled        | 是否禁用                                                     | boolean                                   | —                                                            | false      |
| mark            | 是否显示提示说明                                             | string                                    | —                                                            | —          |
| size            | Radio 的尺寸，仅在 border 为真时有效                         | string                                    | medium / small / mini                                        | —          |
| prop            | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string                                    | 传入 Form 组件的 `model` 中的字段                            | —          |
| rules           | 表单验证规则                                                 | object                                    | —                                                            | —          |
| name            | 原生属性                                                     | string                                    | —                                                            | —          |

### Events

| 事件名称 | 说明                    | 回调参数                                               |
| :------- | :---------------------- | :----------------------------------------------------- |
| change   | 用户确认选定的值时触发  | 组件绑定值。格式与绑定值一致，可受 `value-format` 控制 |
| blur     | 当 input 失去焦点时触发 | 组件实例                                               |
| focus    | 当 input 获得焦点时触发 | 组件实例                                               |


## e-select下拉框
<vuep template="#eSelect"></vuep>

<script v-pre type="text/x-template" id="eSelect">
<template>
  <div>
    <el-form :model="elform" ref="elform" :rules="rules">
      <e-select
        :optionArr="optionArr"
        :filterable="true"
        v-model="elform.region"
        select-label="one"
        prop="region"
        @selchange="elform.region = $event"
      ></e-select>
      <e-select :optionArr="optionArr" v-model="elform.region" prop="region3" @selchange="elform.region3 = $event"></e-select>
      <e-select :optionArr="optionArr" v-model="elform.region2" select-label="three" prop="region2" @selchange="elform.region2 = $event">
        <div slot="select" slot-scope="item">
          {{ item }}
          <i style="margin-right:20px;">{{ item.data.label }}</i>
        </div>
      </e-select>
    </el-form>
    <button @click="selectCheck">校验</button>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      rules: {
        region2: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        region3: [{ required: true, message: '请选择活动区域', trigger: 'change' }]
      },
      elform: {
        region: '',
        region2: '',
        region3: ''
      },
      optionArr: [
        {
          value: '选项1',
          label: '黄金糕',
          isFlag: false
        },
        {
          value: '选项2',
          isFlag: false,
          label: '双皮奶'
        },
        {
          value: '选项3',
          isFlag: false,
          label: '蚵仔煎'
        }
      ]
    }
  },
  methods: {
    selectCheck() {
      this.$refs['elform'].validate((valid, object) => {
        if (!valid) {
          console.log('未通过校验')
          // this.$nextTick(() => {
          //   var isError= document.getElementsByClassName("is-error");
          //   console.log(isError);
          //   isError[0].querySelector('input').focus();
          // })
          return
        } else {
          console.log(this.elform)
        }
      })
    }
  }
}
</script>

### Attributes属性值

| 参数         | 说明                                                         | 类型    | 默认值 |
| ------------ | ------------------------------------------------------------ | ------- | ------ |
| disabled     | 是否禁用                                                     | boolean | false  |
| placeholder  | 占位符                                                       | string  | 请选择 |
| filterable   | 是否可搜索                                                   | boolean | false  |
| select-label | 是否显示label                                                | string  | —      |
| option-arr   | Option 列表                                                  | array   | —      |
| show-error   | 是否显示校验错误信息(是否必填)                               | boolean | true   |
| prop         | 定义校验的参数                                               | String  | —      |
| label-width  | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto` 。 | string  | —      |

### Events事件

| 事件名称  | 说明                               | 回调参数     |
| --------- | ---------------------------------- | ------------ |
| selchange | 接受选中的值(选中值发生变化时触发) | 目前的选中值 |


## e-upload上传

<vuep template="#eUpload"></vuep>

<script v-pre type="text/x-template" id="eUpload">
<template>
  <div>
    <el-form>
      <e-upload></e-upload>
    </el-form>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {}
  }
}
</script>

###### 

### Attribute

| 参数         | 说明                           | 类型    | 默认值       |
| ------------ | ------------------------------ | ------- | ------------ |
| up-label     | 标签文本的内容                 | string  | —            |
| txtshow      | 是否显示说明文字(最多上传几张) | boolean | true         |
| mb           | 是否显示授权委托书             | boolean | false        |
| mbzt         | 授权委托书(其他)文字           | string  | —            |
| parking-url  | 授权委托书或其他的图片链接地址 | String  | —            |
| updata-txt   | 上传按钮的文字                 | String  | —            |
| quantity     | 上传图片的数量                 | number  | —            |
| empty        | 是否需要清空                   | boolean | true         |
| max-size     | 图片默认大小                   | Number  | 1024         |
| plus         | 上传图片图标                   | String  | el-icon-plus |
| contact-mode | 证件类型                       | string  | 06/13        |
| prop         | 定义校验的参数                 | string  | —            |
| label-width  | label宽度                      | string  | —            |

### Methods

| 方法名    | 说明         | 参数 |
| --------- | ------------ | ---- |
| send_Data | 传出图片数据 | —    |

## eUploadId上传身份证
<vuep template="#eUploadId"></vuep>
<script v-pre type="text/x-template" id="eUploadId">
<template>
  <div>
    <e-upload-id :empty="empty" :is-remove="isRemove"></e-upload-id>
    <button @click="isRemoveFn">上传失败</button>
    <button @click="isEmptyFn">清空</button>
  </div>
</template>
<script>
module.exports = {
  data() {
    return {
      empty: false, // 是否清空
      isRemove: false // 上传失败（删除）
    }
  },
  methods: {
    isEmptyFn() {
      this.empty = true
      this.$nextTick(() => {
        this.empty = false
      })
    },
    isRemoveFn() {
      this.isRemove = true
      this.$nextTick(() => {
        this.isRemove = false
      })
    }
  }
}
</script>




### Attributes

| 参数      | 说明           | 类型    | 可选值 | 默认值                             |
| :-------- | :------------- | :------ | :----- | :--------------------------------- |
| empty     | 清空所有       | Boolean | —      | false                              |
| is-remove | 上传失败       | Boolean | —      | false                              |
| ext       | 限制文件格式   | String  |        | .jpg,.png,.jpeg                    |
| max-size  | 限制图片最大kb | Number  |        | 1204                               |
| front-img | 身份证正面图   | base64  |        | data:image/png;base64,iVBORw0KG... |
| back-img  | 身份证背面图   | base64  |        | data:image/png;base64,iVBORw0KG... |

### Events

| 事件名称  | 说明                 | 类型  |
| :-------- | :------------------- | :---- |
| send_Data | 将当前的图片发送出来 | Array |



## eEquipment下拉表格

<vuep template="#eEquipment"></vuep>

<script v-pre type="text/x-template" id="eEquipment">
<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" inline-message>
      <e-equipment
        :table-data="dataList"
        :pattern="pattern"
        prop="chosen_capacity"
        v-model="ruleForm.chosen_capacity"
        @handle-selection-change="handleSelectionChange"
      >
        <!-- 表格标题 -->
        <template slot="title">
          <p slot="title">
            当前暂停设备{{ dataList.length }}台， 总容量 {{ total_capacity }}kVA。 已选择启用设备 {{ chosen_station }}台， 启用设备总容量
            {{ ruleForm.chosen_capacity }}kVA
          </p>
        </template>

        <!-- 表格内容 -->
        <template slot="tableInfo">
          <el-table-column type="selection" label width="32"></el-table-column>
          <el-table-column prop="name" label>
            <template slot-scope="scope">
              <p>
                <span class="tranClass textOverflow">{{ scope.row.name }}</span>
                <span class="tranClass2 textOverflow">设备编号:{{ scope.row.Id }}</span>
                <span>设备容量:{{ scope.row.number }}&nbsp;kVA</span>
              </p>
            </template>
          </el-table-column>
        </template>
      </e-equipment>

      <button @click.prevent="handleChgTrans()">
        转换模式
      </button>
    </el-form>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      rules: {
        chosen_capacity: [{ required: true, message: '请输入容量', trigger: ['blur', 'change'] }]
      },
      pattern: '1',
      isRemove: false, // 是否删除
      dataList: [
        {
          Id: '10000157637',
          number: '101',
          name: '死数据1'
        },
        {
          Id: '10000157637',
          number: '202',
          name: '死数据2'
        }
      ],
      ruleForm: {
        chosen_capacity: ''
      },
      chosen_station: 0, //  已启动设备台数
      dataListAct: [] // 选中的设备数据集列表
    }
  },
  computed: {
    // 所有设备总容量
    total_capacity() {
      var num = 0
      this.dataList.forEach(item => {
        num += Number(item.number)
      })
      return num
    }
  },
  watch: {
    'ruleForm.chosen_capacity': {
      handler(newVal, oldVal) {
        console.log(newVal, '父组件newVal')
      }
    }
  },
  methods: {
    handleChgTrans() {
      console.log('转换')
      this.pattern = this.pattern == '1' ? '0' : '1'
      // 重新输入申请恢复容量
      this.ruleForm.chosen_capacity = ''
      // 已启动设备数
      this.chosen_station = 0
    },
    // 选中的设备
    handleSelectionChange(val) {
      console.log(val, '选中的设备')
      // 重新设置为空
      this.ruleForm.chosen_capacity = '' // 已启用设备总容量
      this.chosen_station = val.length // 已启动设备数

      // 已启用设备总容量
      val.forEach((item, i) => {
        // 加上已勾选的设备容量并转为数字类型
        this.ruleForm.chosen_capacity += parseFloat(item.number)
        // 转化为数字类型
        this.ruleForm.chosen_capacity = parseFloat(this.ruleForm.chosen_capacity)
      })

      this.dataListAct = val
    }
  }
}
</script>
<!-- <style scoped>
/* 文字单行溢出 */
.textOverflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: top;
}
/* 设备名称 */
.tranClass {
  width: 200px;
  margin-right: 10px;
}
.tranClass2 {
  width: 230px;
  margin-right: 10px;
}
</style> -->

### Attributes

| 参数            | 说明                        | 类型    | 可选值 | 默认值        |
| :-------------- | :-------------------------- | :------ | :----- | :------------ |
| table-data      | 表格数据                    | Array   | —      | []            |
| capacity-label  | lable名                     | String  | —      | 申请恢复容量: |
| pattern         | 模式， 1选中设备，2手动输入 | String  |        | 1             |
| chosen-disabled | 不可更改（只读）            | Boolean |        | false         |

### Events

| 事件名称              | 说明                 | 类型  |
| :-------------------- | :------------------- | :---- |
| handleSelectionChange | 将选中的设备发送出来 | Array |


## e-table表格

<vuep template="#eTable"></vuep>

<script v-pre type="text/x-template" id="eTable">
<template>
  <e-table :table-data="tableData" :column-data="columnData"> </e-table>
</template>
<script>
module.exports = {
  data() {
    return {
      tableData: [
        {
          id: 1,
          factoryName:
            "企业名称一(哎呀哎呀哎呀名字太长展示不下啦)",
          industry: "行业一",
          problemLevel: "1",
          childA: "孩子A",
          childB: "孩子B",
        },
        {
          id: 2,
          factoryName: "企业名称二",
          industry: "",
          problemLevel: "",
          childA: "",
          childB: "",
        },
      ],
      columnData: [
        {
          label: "序号",
          type: "index",
          width: "55px",
        },
        {
          label: "企业名称",
          prop: "factoryName",
          tooltip: true,
        },
        {
          label: "行业",
          type: "link",
          prop: "industry",
          click: (rowData) => this.handleClick(rowData),
        },
        {
          label: "报警级别",
          prop: "problemLevel",
          type: "find",
          customTip: "这是企业的报警级别说明",
          option: [
            { label: "高", value: "1" },
            { label: "中", value: "2" },
          ],
        },
        {
          label: "父亲表头",
          type: "innerColumn",
          children: [
            {
              prop: "childA",
              label: "子级表头A",
            },
            {
              prop: "childB",
              label: "子级表头B",
            },
          ],
        },
        {
          type: "operation",
          label: "操作",
          children: [
            {
              name: "查看",
              key: "see",
              isHide: true,
              click: (rowData) => this.handleEdit(rowData, "see"),
            },
            {
              name: "编辑",
              key: "edit",
              click: (rowData) => this.handleEdit(rowData, "edit"),
            },
            {
              name: "删除",
              key: "delete",
              type: "danger",
              // popover: true,
              // content: "确认要删除吗？",
              click: (rowData) => this.handleDelete(rowData, "delete"),
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleEdit(row, type) {
      console.log(type, row);
    },
    handleDelete(row, type) {
      console.log(type, row);
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

### Option Attributes

| 参数           | 说明                                                         | 类型          | 默认值            |
| -------------- | ------------------------------------------------------------ | ------------- | ----------------- |
| loading   | 是否开启加载动画 。 | boolean        | false                 |
| table-data | 显示的数据 | array | -- |
| column-data | 操作列   | array        | —                 |
| 以下为column-data内部的参数
| type | 列类型                         | string       | -             |
| isHide | 是否隐藏该操作按钮                                      | boolean        | false                 |
| popover | 操作按钮是否进行提示（比如点击删除按钮弹出是否确认），该功能组件已实现且在其他地方测试通过，该文档疑似版本有问题，参数待生效 | boolean | false |
| content | popover为true时，操作按钮是否进行提示的文字 | boolean | false |
| 更多请看示例和表格组件源码 | https://github.com/lqr5678/EUI/tree/lqr/packages/e-table/src
