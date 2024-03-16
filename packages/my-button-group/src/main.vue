<template lang="html">
  <div class="btn-group">
    <button
      type="button"
      v-for="(button, key) in buttons"
      v-show="!button.hide"
      :key="key"
      class="btn"
      :class="[{ active: button[valueKey] === value, disabled: button.disabled }, 'btn-' + (type || 'default')]"
      :disabled="button.disabled"
      @click.prevent="active(button[valueKey] || key)"
    >
      <i :class="['iconfont', button.icon, 'btn-icon']" v-if="button.icon"></i>
      <span>{{ button.name || button }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'myButtonGroup',
  props: {
    buttons: {
      default() {
        return {}
      }
    },
    value: {
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    valueKey: {
      type: String,
      default() {
        return 'value'
      }
    }
  },
  methods: {
    active(button) {
      this.$emit('input', button)
      this.$emit('change', button)
    }
  }
}
</script>
<style>
.btn {
  padding: 5px 8px;
  cursor: pointer;
}
.btn.active {
  color: #fff;
}
.btn-default.active {
  background: #909399;
  border-color: #909399;
}
.btn-primary.active {
  background: #409eff;
  border-color: #409eff;
}
.btn-success.active {
  background: #67c23a;
  border-color: #67c23a;
}
.btn-warning.active {
  background: #e6a23c;
  border-color: #e6a23c;
}
.btn-danger.active {
  background: #f56c6c;
  border-color: #f56c6c;
}
.btn.disabled {
  cursor: not-allowed;
}
</style>
