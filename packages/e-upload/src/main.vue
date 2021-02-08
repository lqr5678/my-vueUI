<template>
  <div class="image_Upload">
    <el-form-item :label="upLabel" :label-width="labelWidth" :prop='prop'>
      <span class="t" v-if="txtshow && !mb">最多上传{{quantity}}张照片{{limitInfo}}</span>
      <em class v-if="mb==true" @click="templateImgDialog=true">{{mbzt}}</em>
      <div class="dig">
        <el-upload
          action="#"
          list-type="picture-card"
          :limit="this.quantity"
          :ext="ext"
          :before-upload="beforeElUpload"
          :on-change="getFile"
          :http-request="() => upload('differentiate')"
          :class="{hides:hideUpload}"
          :before-remove="remove"
          class="uploading dig_upload"
          ref="differentiate"
          target="differentiate"
          element-loading-text="正在上传..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.6)"
          :on-success="handleUpload"
        >
          <i :class="plus"></i>
          <div class="el-upload__text sup">{{updataTxt}}</div>
        </el-upload>
      </div>
      <el-dialog :visible.sync="templateImgDialog" class="diaold">
        <img :src="parkingUrl" alt />
      </el-dialog>
    </el-form-item>
  </div>
</template>
/**
 **** @param {upLabel} 	是否显示label 
 **** @param {txtshow} 	是否显示说明文字--(最多上传几张)
 **** @param {mb} 		是否显示授权委托书(其他)
 **** @param {mbzt} 	授权委托书(其他)文字
 **** @param {parkingUrl} 	授权委托书或其他的图片链接地址
 **** @param {updataTxt} 	上传按钮的文字
 **** @param {quantity} 	上传图片的数量 默认6张
 **** @param {empty} 	    是否需要清空
 **** @param {maxSize} 	    图片默认大小
 **** @param {labelWidth} 	label宽度
 **** @param {plus} 	    上传图片图标
 **** @param {contactMode} 	证件类型 06/13
 **** @param {prop} 		定义校验的参数(传值校验,不传则不校验)
 */
<script>
export default {
  name: "eUpload",
  data() {
    return {
      templateImgDialog: false, //参考模板图片
      file: {},
      fileList: [],
      hideUpload: false, //控制图片上传指定数量后按钮隐藏
      mount: [],
      rankings: "", //所删除图index
      maximg: ""
    };
  },
  props: {
    upLabel: {
      type: String,
      default: ""
    },
    prop: {
        type: String,
        default: ''
    },
    // 网省
    provinceId: {
      default: ""
    },
    // 参考模板图片--默认是充电桩参考模板
    parkingUrl: {
      type: String,
      default: ""
      //   default:require('@/assets/img/syt.jpg')
    },
    // 限制提示语
    limitInfo: {
      type: String,
      default: ""
    },
    // 上传按钮的文字
    updataTxt: {
      type: String,
      default: "点击上传"
    },
    // 是否需要传几张文字提示
    txtshow: {
      type: Boolean,
      default: true
    },
    contactMode: {
      default: "06"
    },
    quantity: {
      type: Number,
      default: 6
    },
    empty: {
      type: Boolean,
      default: true
    },
    mb: {
      type: Boolean,
      default: false
    },
    mbzt: {
      type: String,
      default: "授权委托书参考模板"
    },
    ext: {
      type: String,
      default: ".jpg,.png,.jpeg"
    },
    maxSize: {
      type: Number,
      default: 1204
    },
    beforeUpload: {
      type: Function,
      default: function() {
        return true;
      }
    },
    // 非空
    value: {
      // 没有做初始化
      type: String || Array,
      default: ""
    },
    plus: {
      type: String,
      default: "el-icon-plus"
    },
    labelWidth: {
      type: String,
      default: "183px"
    }
  },

  methods: {
    // 非空验证
    handleUpload(file, fileList) {
      this.handleImageList(fileList);
    },
    //上传图片格式及大小限制
    beforeElUpload(file) {
      var isOkExt =
        this.ext.indexOf(file.name.substring(file.name.lastIndexOf("."))) >= 0;
      if (!isOkExt) {
        this.$message.error("只能上传" + this.ext + "格式的文件");
        return false;
      }
      var isLtmaxWidth = file.size / 10240 < this.maxSize;
      this.maximg = file.size / 2048 < this.maxSize;
      if (!isLtmaxWidth) {
        this.$message.error("上传文件大小不能超过" + "10MB!");
        return false;
      }
      return this.beforeUpload(file);
    },
    getFile(file, fileList) {
      console.log(file, fileList);
      // 非空验证---start
      this.handleImageList(fileList);
      // 非空验证图片---end
      this.file = file;
      this.fileList = fileList;
      this.hideUpload = fileList.length >= this.quantity;
    },
    remove(file, fileList) {
      // 非空验证图片---start
      this.handleImageList(fileList);
      // 非空验证图片---end
      this.fileList.forEach((e, k) => {
        if (e.uid == file.uid) {
          this.rankings = k;
        }
      });
      this.hideUpload = fileList.length - 1 >= this.quantity;
      this.mount.splice(this.rankings, 1);
      this.$emit("send_Data", this.mount);
    },

    upload() {
      var reader = new FileReader();
      var file = this.file;
      try {
        reader.readAsDataURL(file.raw);
      } catch (err) {
        this.$alert("图片上传失败,请重新上传", "提示", {
          confirmButtonText: "确定",
          center: true
        });
        this.fileList.pop();
        return;
      }
      var that = this;
      reader.onload = function(e) {
        var base64IMG = "";
        let img = new Image();
        img.src = e.target.result;
        img.onload = function() {
          if (!that.maximg) {
            // 默认按比例压缩
            let w = img.width,
              h = img.height,
              scale = w / h;
            h = w / scale;
            let quality = 0.7; // 默认图片质量为0.7
            //生成canvas
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            // 创建属性节点
            let anw = document.createAttribute("width");
            anw.nodeValue = w;
            let anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(img, 0, 0, w, h);
            // 图像质量
            //if(obj.quality && obj.quality <= 1 &amp;&amp; obj.quality &gt; 0){
            //quality = obj.quality;
            //}
            // quality值越小，所绘制出的图像越模糊
            let imgResult = canvas.toDataURL("image/jpeg", quality);
            base64IMG = imgResult.substr(
              imgResult.indexOf(",") + 1,
              imgResult.length
            );
          } else {
            base64IMG = e.target.result.substr(
              e.target.result.indexOf(",") + 1,
              e.target.result.length
            );
          }
          console.log(base64IMG);
          // // 上传图片--普通入参
          // let params2 = {
          //   areaNo: that.provinceId,
          //   busiType: 1,
          //   contractChannel: 1,
          //   fileContent: base64IMG,
          //   fileName: file.name,
          //   serviceType: 1,
          //   storageBase: "outside"
          // };
          // that.$tools.apiPost(params2, that.$api.uploadPic).then(
          //   res => {
          //     console.log(res, "上传图片");
          //     if (res.code != 1) {
          //       file = {};
          //       that.fileList.pop();
          //       that.$alert(res.message || res, "提示", {
          //         confirmButtonText: "确定",
          //         center: true
          //       });
          //       if(that.quantity == 1 && that.fileList.length<1){
          //         that.hideUpload = false
          //       }
          //       return;
          //     }
          //     console.log(res.data.fileName,'res.data.fileName')
          //     that.$tools.hideFullScreenLoading();

          that.mount.push({
            contactMode: that.contactMode, //产权人 06  经办人05
            attachmentId: "res.data.fileId",
            fileType: "", //附件类型
            certNo: "", //证件号码
            sequenceId: "0", //附件序号
            fileName: "res.data.fileName", //文件名称
            filePath: "", //附件路径
            fileOrder: that.mount.length, //附件顺序
            certId: "", //证件标识
            certEffectDate: "", //证件生效日期
            certExpireDate: "", //证件失效日期
            validity: "0", //是否有效
            certName: "" //证件名称
          });
          that.handleMount();
          //   that.$emit("send_Data", that.mount);

          //   },
          //   err => {
          //     that.file = {};
          //     that.fileList.pop();
          //     that.$alert(err, "提示", {
          //       confirmButtonText: "确定",
          //       center: true
          //     });
          //   }
          // );
        };
      };
    },
    handleMount() {
      this.mount.forEach(e => {
        e.fileName = this.upLabel + "." + this.getCaption(e.fileName);
      });
      this.$emit("send_Data", this.mount);
    },
    // 更改图片fileName名称
    getCaption(obj) {
      var index = obj.lastIndexOf(".");
      obj = obj.substring(index + 1, obj.length);
      return obj;
    },

    // mbs() {
    //   this.templateImgDialog = true;
    //   // this.$emit("mob");
    // },
    // 非空验证
    handleImageList(fileList) {
      console.log(fileList);
      let imageList = [];
      fileList.length > 0 &&
        fileList.forEach(item => {
          imageList.push((item.response && item.response.id) || item.uid);
        });
      this.$emit("input", imageList.join(","));
      this.dispatch("ElFormItem", "el.form.change", imageList);
    }, // elementUI mixins - emitter 中拷贝的
    // 非空
    dispatch(componentName, eventName, params) {
      console.log(componentName, eventName, params);
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  },
  watch: {
    empty: function(newName) {
      if (newName == true) {
        if (this.mount.length != "") {
          if (this.$refs.differentiate == undefined) {
            this.$refs.back.clearFiles();
            this.$refs.front.clearFiles();
          } else {
            this.$refs.differentiate.clearFiles();
            this.hideUpload = false;
          }
        }
        this.mount = [];
      }
    }
  }
};
</script>

<style scoped>
/* 参考模板和滚动条--start */
.diaold >>> .el-dialog {
  width: 570px;
}
.diaold >>> .el-dialog__body {
  padding: 0;
  height: 0;
}
.diaold >>> .el-dialog__header {
  padding: 0;
}
.diaold::-webkit-scrollbar {
  display: none;
}
.diaold {
  scrollbar-width: none;
}
.diaold {
  -ms-overflow-style: none;
}
/* 参考模板和滚动条--end */
.image_Upload .t {
  display: block;
  /* width: 200px; */
  height: 40px;
  line-height: 40px;
  color: #999;
}
.image_Upload em {
  text-decoration: underline;
  color: #f59101;
  cursor: pointer;
}
.image_Upload >>> .el-upload--picture-card {
  /* width: 110px;
    height: 110px; */
  /* line-height: 110px;
    margin: 0px 0px 20px 0; */
  width: 110px;
  background: #f7f7f7;
  height: 110px;
  border: 1px solid #e5e5e5;
  line-height: 40px;
  border-radius: 0px !important;
}
.image_Upload >>> .el-upload-list__item {
  border-radius: 0px !important;
}
.image_Upload >>> .dig .el-upload-list--picture-card .el-upload-list__item {
  width: 110px;
  height: 110px;
  margin: 0px 28px 0px 0;
  border-radius: 0;
}
.hides >>> .el-upload--picture-card {
  display: none;
}
.uploading >>> .el-upload__input {
  display: none;
}
.dig {
  position: relative;
  height: auto;
  overflow: hidden;
}
/* 上传 */
.dig i {
  color: #a0a0a0;
  /* background: red; */
  font-size: 40px;
  margin-top: 24px;
}
.dig >>> .el-upload__text {
  font-size: 13px;
  color: #5d5d5d;
  margin-top: -15px;
}
</style>
