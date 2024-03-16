<template>
  <div>
    <div>
      <span class="cursor" @click="checkall">全选</span><span class="line">|</span><span class="cursor" @click="checkOther">反选</span>
      <span class="text-danger tips" v-if="tips">{{ tips }}</span>
    </div>
    <div class="clerafix">
      <label
        class="checkbox-inline cursor"
        :class="{
          'checkbox-disabled': disabled || item.disabled,
          'is-checked': (value instanceof Array && value.includes(item[optionValue])) || value === trueValue
        }"
        v-for="(item, ind) in options"
        :key="ind"
      >
        <input
          :id="item[optionValue]"
          :disabled="disabled || item.disabled"
          :value="item[optionValue]"
          type="checkbox"
          @change="change"
          name="checkall"
          v-model="value"
        />
        {{ item[optionLabel] }}
        <i v-if="item.icon" :class="item.icon.className"></i>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myCheckbox',
  props: {
    tips: {
      type: String,
      default() {
        return ''
      }
    },
    optionValue: {
      type: String,
      default() {
        return 'value'
      }
    },
    optionLabel: {
      type: String,
      default() {
        return 'label'
      }
    },
    trueValue: {
      type: String,
      default() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    value: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    checkOther() {
      if (this.disabled) {
        return
      }
      let tempval = JSON.parse(JSON.stringify(this.value))
      let val = []
      Object.values(this.options).map(item => {
        if (!tempval.includes(item[this.optionValue]) && !item.disabled) {
          val.push(item[this.optionValue])
        }
      })
      this.$emit('input', val)
    },
    change() {
      this.$emit('input', this.value)
    },
    checkall() {
      if (this.disabled) {
        return
      }
      let val = []
      Object.values(this.options).map(item => {
        if (!item.disabled) {
          val.push(item[this.optionValue])
        }
      })
      this.$emit('input', val)
    }
  }
}
</script>
<style scoped>
.cursor {
  cursor: pointer;
}
.line {
  height: 6px;
  overflow: hidden;
  color: #bfbfbf;
  font-size: 12px;
  margin: 0 5px;
}
.tips {
  font-size: 12px;
  margin-left: 12px;
}
.text-danger {
  color: #e94260;
}

.checkbox-inline {
  margin-left: 10px;
}
.checkbox-disabled {
  cursor: not-allowed;
}
.is-checked {
  color: red;
}
</style>
