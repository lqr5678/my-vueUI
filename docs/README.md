## sgUploadId上传身份证
<vuep template="#sgUploadId"></vuep>
<script v-pre type="text/x-template" id="sgUploadId">
<template>
    <sg-upload-id>{{ btnName }}</sg-upload-id>
</template>
<script>
 module.exports = {
    data() {
      return {
        btnName: "我的按钮"
      }
    }
  }
</script>




### Attributes

| 参数     | 说明           | 类型    | 可选值 | 默认值                             |
| :------- | :------------- | :------ | :----- | :--------------------------------- |
| empty    | 清空所有       | Boolean | —      | false                              |
| isRemove | 上传失败       | Boolean | —      | false                              |
| ext      | 限制文件格式   | String  |        | .jpg,.png,.jpeg                    |
| maxSize  | 限制图片最大kb | Number  |        | 1204                               |
| frontImg | 身份证正面图   | base64  |        | data:image/png;base64,iVBORw0KG... |
| backImg  | 身份证背面图   | base64  |        | data:image/png;base64,iVBORw0KG... |

### Events

| 事件名称  | 说明                 | 类型  |
| :-------- | :------------------- | :---- |
| send_Data | 将当前的图片发送出来 | Array |



## equipment下拉表格

<vuep template="#sgEquipment"></vuep>

<script v-pre type="text/x-template" id="sgEquipment">
<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" inline-message>
      <sg-equipment
        :tableData="equipList"
        :ischgTrans="ischgTrans"
        prop="chosen_capacity"
        v-model="ruleForm.chosen_capacity"
        @handleSelectionChange='handleSelectionChange'
      >
        <!-- 表格标题 -->
        <template slot="title">
          <p slot="title">当前暂停设备{{ total_station }}台， 总容量 {{ total_capacity }}kVA
              已选择启用设备 {{ chosen_station }}台， 启用设备总容量
              {{ chosen_capacity }}kVA</p>
        </template>

        <!-- 表格内容 -->
        <template slot="tableInfo">
          <el-table-column type="selection" label width="32"></el-table-column>
          <el-table-column prop="tranName" label>
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
          </el-table-column>
        </template>
      </sg-equipment>
    
      <h2 @click="handleChgTrans()">
        转换模式
      </h2>
    </el-form>
  </div>
</template>

<script>
 module.exports = {
    data() {
      return {
        rules: {
          chosen_capacity: [
            { required: true, message: '请输入容量', trigger: ['blur', 'change'] },
          ]
        },
        ischgTrans: '1',
        isRemove: false, // 是否删除
        equipList: [
          {
            "equipId": "10000157637",
            "plateCap": "101",
            "tranName": "死数据1死数据1死数据1",
            "sndsideVoltCode": "AC03802",
            "powersourceNo": "5600774166",
            "frstsideVoltCode": "AC00101",
            "actualStopUseDate": "2016-02-01",
            "runStatusCode": "02",
            "planResumeDate": "2016-07-31"
          },
          {
            "equipId": "10000157637",
            "plateCap": "202",
            "tranName": "死数据2",
            "sndsideVoltCode": "AC03802",
            "powersourceNo": "5600774166",
            "frstsideVoltCode": "AC00101",
            "actualStopUseDate": "2016-02-01",
            "runStatusCode": "02",
            "planResumeDate": "2016-07-31"
          }
        ],
        ruleForm: {
          chosen_capacity: '',
        },
        total_station: 0, // 所有设备数量
        total_capacity: '', // 所有设备总容量
        chosen_capacity: '', //  已启动设备容量
        chosen_station: 0, //  已启动设备台数
        equipListsAct: [], // 选中的设备数据集列表
      }
    },
    methods: {
      handleChgTrans(){
        this.ischgTrans = this.ischgTrans == '1' ? '0' : '1'
        // 重新输入申请恢复容量
        this.ruleForm.chosen_capacity = ''
        // 已启动设备数
        this.chosen_station = 0;
      },
      // 选中的设备
      handleSelectionChange(val) {
        console.log(val,'选中的设备')
        // 重新设置为空
        this.ruleForm.chosen_capacity = ''; // 已启用设备总容量
        this.chosen_station = val.length; // 已启动设备数

        // 已启用设备总容量
        val.forEach((item, i) => {
          // 加上已勾选的设备容量并转为数字类型
          this.ruleForm.chosen_capacity += parseFloat(item.plateCap || item.newEquipCap);
          // 转化为数字类型
          this.ruleForm.chosen_capacity = parseFloat(this.ruleForm.chosen_capacity)
        });
    
        this.equipListsAct = val
      },
    }
  }
</script>

### Attributes

| 参数              | 说明                        | 类型    | 可选值 | 默认值        |
| :---------------- | :-------------------------- | :------ | :----- | :------------ |
| tableData         | 表格数据                    | Array   | —      | []            |
| capacity_label    | lable名                     | String  | —      | 申请恢复容量: |
| ischgTrans        | 模式， 1选中设备，2手动输入 | String  |        | 1             |
| isChosen_disabled | 不可更改（只读）            | Boolean |        | false         |

### Events

| 事件名称              | 说明                 | 类型  |
| :-------------------- | :------------------- | :---- |
| handleSelectionChange | 将选中的设备发送出来 | Array |

