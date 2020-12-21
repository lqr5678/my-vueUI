<template>
  <div>
    <!-- 背面 -->
    <div class="inile_block back">
      <div
        class="img-load-cover"
        v-loading="true"
        v-if="backLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
        element-loading-text="OCR认证中..."
        ref="backLoading"
      ></div>

      <el-upload
        action="#"
        list-type="picture-card"
        :limit="1"
        :ext="ext"
        :before-upload="beforeElUpload"
        :on-change="getFile"
        :http-request="() => upload('back')"
        :on-remove="remove"
        ref="back"
        :on-success="handleUpload"
      >
        <!-- <el-button size="small" class="uploading">上传国徽面</el-button> -->
        <i class="el-icon-plus plus"></i>
      </el-upload>
    </div>

    <!-- 正面 -->
    <div class="inile_block front">
      <div
        class="img-load-cover"
        v-loading="true"
        element-loading-spinner="el-icon-loading"
        v-if="frontLoading"
        element-loading-background="rgba(255, 255, 255, 0)"
        element-loading-text="OCR认证中..."
        ref="frontLoading"
      ></div>

      <el-upload
        action="#"
        list-type="picture-card"
        :limit="1"
        :ext="ext"
        :before-upload="beforeElUpload"
        :on-change="getFile"
        :http-request="() => upload('front')"
        :on-remove="remove"
        ref="front"
        :on-success="handleUpload"
      >
        <!-- <el-button size="small" class="uploading">上传人像面</el-button> -->
        <i class="el-icon-plus plus"></i>
      </el-upload>
    </div>
      
  </div>
</template>

<script>
export default {
  name: "sgUploadId",
  props: {
    // 清空
    empty: {
      type: Boolean,
      default: false
    },
    // 上传失败
    isRemove: {
      type: Boolean,
      default: false
    },
    //所读取配置文件字段名
    ToConfigure: {
      type: String,
      default: "doorNumberManeger"
    },
    // 限制文件格式
    ext: {
      type: String,
      default: ".jpg,.png,.jpeg"
    },
    // 最大
    maxSize: {
      type: Number,
      default: 1204
    },
    beforeUpload: {
      type: Function,
      default: function () {
        return true;
      }
    },
    // 身份证背面图
    backImg:{
      type: String,
      default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAACTCAYAAACTbsWzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzMwMjFERjBGRTQ2MTFFQTlCQkJCMEFFRUUzOTJBRTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzMwMjFERUZGRTQ2MTFFQTlCQkJCMEFFRUUzOTJBRTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBCMjBGQjVEMTk3MzExRUFBNDNGQTlCQUU3QjdGNjZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBCMjBGQjVFMTk3MzExRUFBNDNGQTlCQUU3QjdGNjZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+lpk4pQAAD5xJREFUeNrsnVtwXVUZx/9rnZP7rWlubdqG0qa1QkFsETodOqCoyDitzjjK5UEfcRxGcHzx0RkffPFBHWYYFZ4dLpargIIF5KIFSukFLG0pbemNpklzv5zkrOX3rXV2cpIGmjRpaXL+v+GQc5K9z97N2b9837du23zpiT94zAwDQsiMPLL8/RHyxUMRCaGIhBAlzZqPkFlhut54RkRCmJoSQigiIRSREEIRCblMSc/WG5U8sCO/1Ygtr2Q+M9riOXTven9ZiJgT0OQJaCgiKQARwyN3/fuZCpmeJQntm0//aXNZafF91tr18rqSnxWZx/Q653YMDGZ+v3HLPc/KaycuzCg62tmQ8J0XHv5NRXnpVpHwZkpICoBKvdblmn9Cr/2cR2ZCeXZpREwkfP3JBzcXpdO/4mdDChG99sWBLYmMl1TEPPNteVnJ/fw4SCEjDtyXuHShUTE9A4tDaioheh0/ClLI5BxISjU/DX+w7/s/n53U1BjDmpAUNDkHLn1qCnZREDKrXthZODAhZIYucIgbIZdDnclfASEUkRBCEQmhiIQQikgIRSSEUERCKCIhhCISQhEJIRSREIpICKGIhFBEQghFJIQiEkLOQ7og/pXZLHx/HzAwAD84KK9HAOd01R8glYYpLQXKymAqKuP3CKGIs4SI5tvPwJ9pg+/pEQEHgpDwIqD3ca0tY5K16ETIFIzKWFUNU1cPU18fv08IRZw+XiPd8WNwJ0/A93YH6YxKJpEPxcUx4gUBTU5IH6OjPvp64bq7gBPHgpB2cTOwZJmu0sUrhVDEKUso0c8dOgjfJTKlJeUsKg5fUVwKr8+DeC5GRn2kUyE1TcQ0wxmYjKSuIyMicQ+y//sARoS2K1pDlCSEIn6+gnD7P4T75Ij4ZEOKiXQRUF4p7ol4Zz4VoQ7DnD4BdHbADPbLLiKiScGXlQML6uAbmuGblwN1TdFLrSlHhgFJa7PvvQvbshx21WpeMYQiTsrwMNz7u+FOi2ylZTECVlSF4GcO7Ibdsx3m8H6Yro7YSONzCzGH1FRLRB+fS2T0C+rhl6+GX3sDfOtaGN22rxtGoqf7+KOQutq118ZjEEIRxyTMvrcDvrNToqBENkk/fVUNzLFDsK88A7vvPSAzAJSWx4c1sQFG68HhIdm+ZFytaLolWr61Ddj1H7gvr4O/eTP8kithejpDnejaTsNLdExdt44yEooYcJKO7t0lEp6NqWhJGVxpBez2bbD/fCxIhaoFIT0ddzsCiYpepWxaBnPqSBQzabxJhJWU1O58Hf7QB3C33QF3/c2wA33R2bPtcHt2waqMbMQhs8ScbZ93B/ZJhGqLkVAk9MWlIuAjSG39C8yQRMGFjbFOTFJPbZwZGgQ0Ra1ZCHfLFnibArRlVRtoNEomYul+sr8ZHEDqsT/Dvvg4fInKXhqk18joDu7n1UMKW0Tf9imy2jCjHfGajpaUw7z0OFIvbQXKKkONOFoLhigoElZWw9cvCkL5FqkDV60Flq0UgUtCQ02IhLrd6EF8fJ/ycqRERPOvrRJJK8Lx9LjZo4dDKy0hhZmajozAfXQQNpUKdZqvqIb574tIbXtKZKsJUWuchKGWzMDL9u6bPwAWLQvCmd5OuO/cFbs5PtwNvPIUjDbm2OLxMmokhEFKRMzW1MHf8A3ZrgM2nMcBpGoXhsEAF5PtR3mhTpcbWxgRL25KevxY6FKARDKIhPhEpHzxb/F1IqGmmJlMEDA815TyzCnYfzwCc/IofE0tvNSGXqKk2bcT9uUnJA3ti+8R9h2KXRdJQ05JjLyaouL4IYmS1XFwQHe3nM8nvOpJYYnotaP95HG9X3LsiHdZ2FefDa2ao+moytN9FqhvihFSf6bfk5TVHP4QZvtLsabUn0ldaP/9HHC2Laamur/UkL6uKb5fX/eYjBp5u9rleM/EQQFaR2pE1hE8I1leSaSARGxrg+/rjRLoAO39u2MXRVXNuFEz2uXgvv49uNvvhG+9Ov5seBColki4bhPs3reQeui3MCKgW78pvp825KSL4a7dIPvdDXfT7VFIjarIDYWrWhCPd3BPbI0tKoLv7Q1jWgkpHBHb20K9FiKR1nkiVOgPTOfVdZlB+NqG0A/orr8FWNAQI5vuJyKaD3bAbn0oyGgffRDm9PEY/UIkbQdaVsHfeCv8qmvC0LgwCGC0oi4Owpq9b8cxral07rxO80oiBdJYMzwcxn/qAO4gyOkTMEcOSMpZjtF+QhMbTcyZk7CvPx8l0rRTuyl0rGl/L8yet+I+jc2S0koKK7VjiG7aQT+Sgjl6APbJh6NwZyXSpYowdg9KOU5pmRx3P9B2EqhrhJHtdHaHNiKxk5/MexE1BYTOJUxFqcyJI3HYWnlF/lah/jOZIRit5XRMaVVtrBV7u+LYU0kvQ03pYp3na+pgOs/Ejn3ZTiUze7bHwQAqrzba5FNUItu3w5w8AixaEs9Hzsv3yR+JmtqL8m+fay2AZB6npl6lCulgStJCSUvPnBib3DvuXySvtUNfo1h5VXwu2zupDd0PfwqsuCp+T/sMNcp+ZSOyd/wspqIDvVE8FVej6Ujm3NEz+v7h+CflPPzoa98/wKuJFECNODgUI55GrqwLsyhys3snGOtjKqqRKhm6NjgAv/ZGOK39VoqItY2SpvbANy2DX30N3KbvhtpQtxudrximR03y60laUbvag4Bhe32tXR6EzPsa0Y1E73TgtkSrMIxtKmM9dZ+ahbC73oDr74bZvxvQ2lCipU6NsnvfhtF67+N9sl1dbPxJTeHv02CMtMksjlAjEjL/RUxGy5jYTaFpKaYgona864Dtd1+DPbA3RspcH2AQac9bsO+8GiIkKmpGW0I/F51EHM4hLyKH8yFkvouY1IKhM70EXhd98u68wsTZ+COhw96obJpuqojaPyjvqZ30cfRNWa4rJB1T24nD5Cakv96mo9TZXGPORR7mRijiZXKmRWP1mUpZXj4FCUeiiDp0Tb0qKh5LVxPKi8bvpzMxUjmxPlNGE1trjR0bzZMu4tVECkBEnWmRpICaPtY2jDXOTFYras022AevI2zWrJPUs2+CgZOIW1YBu/MNmDefjy2nkzXWaBTWw+nxVdYkJU3Oj5D5LKKVCOg0bdQRNepD49IY4cIiUOlzUketC/11G5G9ZUsUamJ/4KT1ZAlcXSNsx6cw+3fFQeUT0ePp1KvGJbE6DK+LwvkRMv8joo5+0Zn42rGfGYJvbgljQXVWBdKV50bDikq4q6+XOlJe93ZO7Rjaj1i1AG7DrUjpLAutI4uKx2+jI2malsIvviKu+KYiVlVNGFhAyDQDzZw505SFra4JnfmhUWVhE9zKq+MMe+3s1+6M5KHRr6sD9u2X48+mWr/pWFJdIGr7tjiDQ98n/30H+sMwOacDyTU1zWTC+eh5cYVwUhgRUcu4hsaw+G/oR1RJrt0Af3h/biGoovGNKTrQu/gC6zapF31NfZjVP66u1AjZ2AysvQFGjxkmEqfkvJp4JZECErG2DqZmAdCpcwx7wxqk7u57xyYAn7ODHT974nzk6khdMGq0s35i7andFrpso9SgGhHNwoVyXrW8kkjhiKiBzi5tgevoiK2VKo6uI6P1oz9327hsYmb6x9FpUWHo2mTv6WMEDq2lPpwPIYUlorrQKGlgvdRnunCTtlSqFEkXRmk5vKaoyU1mlOLSGYmv/wtpcFgd3I+NXx2S4zY2xnT5IsM1a6bPXJuxMicn0NnW1ch2nQ2zJ4yKpyNhNJXU9WeGBuB11kUQ0c8s/Op/fT1xWf7lq2Na6h18aE0tQqqVS/CTAhbRVFbCrloD9/4eeB33qTLqAk+6MPBzf40zI6oXRkEvRMZkVI7KXluP7OYfx8iqq8Fp10hmOCy9b9hlQQpZxBAVm5eEBhN36KPRGRD+qzch27AY9oVHY4e89gGW59181J8vDc3Vlf29Ubq118Pd9qO47L52k+jPMhnYla3xlm2EFLqIQcaVkhpmPbx2aWhk1Jn3S1Yg+5Nfwux4LfQjmlNHo2UaMZMB3ePI3R9xeGR0QrHeFcp97Rb4dTeF+yqanq7cAlQi4dJl4TZthFDEcTK2YqS9DUbXMVXR9IYxunr3xm8je9V6WKkbddU1e+pYnOqk3Q7J8vrJAHKdeVFZA9d6DaAThddcF1JbrQ/DGNWkgUYnJOsoGkIo4oR4pqNdtG5L+vz0q95wVOvEEhFyw60hsvmONqD9VLz3RVg8WNNQeRQXxXpSl+OvbRSJi2FUVt0/eb9R622485TeRfhSwjVrKOLlL2JvT2g9DROAJ6LLV+hCUjpLorYOaFgU5xEGuXKTevV2bDr7X+Q0egs3HW/6Wej76LqqOr6U8w8JRcxDlzLMZj9/2YwwOVjrvwFc8I3UdDKwRt7ubvi+Ppjqal49hCKOT02H4Yck8qXTk0eqz5qzONl2E9NRqSd9Jjc6R+SzjYviEDdCKGJe2baiFX5BndRu7fDdXXFRJ+T6FpOJu5MtuzgZSSNOWAJjRAQcDh33OnrGLloUR9EYzrIgFPEcTGVVeKClBV5bODvPwneolJJC9nTD1DfANjTBffzRudEuP+10WaTWrJXnWWT37ArzGW3LYpimZpiaGl4phCJOWUod6SIP07w0TOB1p07B6C3ZJJrZUZkmS1F9GMytsyi0DrSrM2GfcDdiQijiDBAB7RXLxyTV6VNTkVlvXHrlCl4Z5NKWWPwVEEIRCSEUkRCKSAihiIRQREIIRSSEIhJCKCIhFJEQQhEJoYiEEIpICEUkhFBEQigiIYQiEkIRCSFTYE4ulcH7BZLzMddWR2dEJIQiEkIoIiEUkRBCEQm5jJiTraa8XyBhRCSEUERCKCIhhCISQhEJIRSREIpICKGIhFBEQghFJIQiEkIoIiEUkRBCEQmhiIQQikgIRSSEUERCKCIhhCISQhEJIRSREIpICJnTInqhl79GUsiIA3365YsQ0ScHzmbdTn4UpJARB96d6MV0SU+yo5mGjK6js/uBxvraTfw4SKGiDqgL05QwbLvmyT/OODUN9n/rzvuf7esf/B0/DlKI6LWvDswkGl6wiEP3rk8OqH8Fshu33PPrU20dd2WGR16XfLmfHw+Z5zVhv17rcs3fqde+OpBzId+NaaemM4mILnlx212/eFq+/D0nt+HHReazi0kQyntMNzWdHRHV/JIHdiBPRp87ITvNWpOQuSYh8sRzyfMLjYYzjYgTZXQ5+QwlJAUgY35NOCMJZyxiXk7sc/J5RkNSQFERmGH/4ayJeDFPjpBCgUPcCKGIhBCKSAhFJIQkTNZYM92GFraQEvIFzb4ghDA1JYQiEkJmmf8LMAAKT+Gq9MXOrgAAAABJRU5ErkJggg=="
    },
    // 身份证正面图
    frontImg:{
      type: String,
      default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAACTCAYAAACTbsWzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0FCNjgzMzNGRTQ2MTFFQUE3RUFBOERDRjhCNUNENzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0FCNjgzMzJGRTQ2MTFFQUE3RUFBOERDRjhCNUNENzIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJDREQ2RTdFMTk3MzExRUFBODVBODRENUVBREZFRUVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJDREQ2RTdGMTk3MzExRUFBODVBODRENUVBREZFRUVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PMW1HQAADr1JREFUeNrsnWtsXGeZ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"
    }
  },

  created(){
  },
  mounted: function () {
    // document.querySelector('.back .el-upload--picture-card').style.backgroundImage = `url(${this.backImg})`
    // document.querySelector('.front .el-upload--picture-card').style.backgroundImage = `url(${this.frontImg})`
  },
  data() {
    return {
      fileList: [],
      loading: false,
      backLoading: false, //身份证国徽面认证中，覆盖层
      frontLoading: false, //身份证人像面认证中，覆盖层
    }
  },

  watch: {
    empty(newOld) {
      if (newOld == true) {
        this.$refs.back.clearFiles();
        this.$refs.front.clearFiles();
      }
    },
    isRemove(newOld) {
      if (newOld == true) {
        this.fileList.pop()
      }
    },
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
      // 非空验证---start
      this.handleImageList(fileList);
      // 非空验证图片---end
      this.file = file;
      this.fileList = fileList;

      // this.$emit("send_Data", this.mount);
    },
    remove(file, fileList) {
      this.UpLoading()
      // 非空验证图片---start
      this.handleImageList(fileList);
      // 非空验证图片---end

      this.fileList.forEach((e, k) => {
        if (e.uid == file.uid) {
          this.rankings = k;
        }
      });
      this.$emit("send_Data", this.mount);
    },

    upload(type) {
      var reader = new FileReader();
      var file = this.file;
      try {
        reader.readAsDataURL(file.raw);
      } catch (err) {
        this.$alert('图片上传失败,请重新上传', "提示", {
          confirmButtonText: "确定",
          center: true,
        });
        this.fileList.pop()
        return
      }
      var that = this;
      let params = null;
      reader.onload = function (e) {
        var base64IMG = "";
        let img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          if (!that.maximg) {
            // 默认按比例压缩
            let w = img.width,
              h = img.height,
              scale = w / h;
            w = w;
            h = w / scale;
            let quality = 0.7;  // 默认图片质量为0.7
            //生成canvas
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
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
            let imgResult = canvas.toDataURL('image/jpeg', quality);
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
          that.$emit("sendImgInfo", base64IMG, file.name)
        };
      }
    },
    UpLoading() {
      if (this.$refs.backLoading) {
        this.backLoading = false;
      }
      if (this.$refs.frontLoading) {
        this.frontLoading = false;
      }
    },
    // 非空验证
    handleImageList(fileList) {
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
  }
}
</script>

<style scoped>
.back {
  margin-right: 50px;
}
.inile_block {
  display: inline-block;
  position: relative;
  /* padding-bottom: 6px;
  margin-top: 15px; */
}
.inile_block >>> .el-upload-list,
.inile_block >>> .el-upload-list--picture-card {
  width: 226px;
  height: 147px;
  position: absolute;
  left: 0;
  top: 0;
}
.inile_block >>> .el-upload-list li,
.inile_block >>> .el-upload-list--picture-card li {
  width: 226px;
  height: 147px;
}
.inile_block >>> .el-upload--picture-card {
  width: 226px;
  height: 147px;
  border: none;
  border-radius: 0px;
}

.inile_block.back >>> .el-upload--picture-card {
  /* background: url('../assets/img/Hguohui.png') no-repeat; */
  background-repeat: no-repeat;
  background-size: 226px 147px;
}
.inile_block.front >>> .el-upload--picture-card {
  /* background: url('../assets/img/Hrenmian.png') no-repeat; */
  background-repeat: no-repeat;
  background-size: 226px 147px;
}

.inile_block >>> .el-icon-plus {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
  height: 100%;
}
.inile_block >>> .el-icon-plus::before {
  content: '';
}

/* 删除提示 */
.inile_block >>> .el-upload-list__item-actions{
  z-index: 1000;
}
</style>
