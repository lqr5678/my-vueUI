<template>
  <div class="my-progress-linear clearfix">
    <div class="progress pull-left" :style="{ width: (data.progressWidth || 400) + 'px', height: (data.height || 20) + 'px' }">
      <div
        class="progress-bar progress-bar-success progress-bar-striped"
        :class="{ 'my-progress-active': data.active || false }"
        :style="{ width: percentage, 'background-color': color }"
      >
        <span v-if="textInside">
          {{ isPercent ? percentage : data.currentData + '/' + data.total }}
        </span>
      </div>
    </div>
    <div v-if="!textInside" class="pull-left my-progress-linear-text" :style="{ lineHeight: (data.height || 20) + 'px' }">
      {{ isPercent ? percentage : data.currentData + '/' + data.total }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'myProgress',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    color: {
      type: String,
      default: ''
    },
    textInside: {
      type: Boolean,
      default: false
    },
    isPercent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    percentage() {
      return this.data.currentData === this.data.total ? '100%' : ((this.data.currentData / this.data.total) * 100).toFixed(2) + '%'
    }
  }
}
</script>
<style lang="less">
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
.my-progress-active {
  animation: progress-bar-stripes 2s linear infinite;
}
.my-progress-linear-text {
  margin-left: 20px;
}
.my-progress-linear {
  .progress {
    margin-bottom: 0;
    background-color: #ebeef5;
    position: relative; // 防止与vue的css重叠
  }
}
.progress{

}
</style>
