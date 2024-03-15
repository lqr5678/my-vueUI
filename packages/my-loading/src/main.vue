<template>
  <div class="loading-warp " :class="isFullSreen === true ? 'full-screen' : ''" v-if="showLoading" @click="close">
    <div class="sk-fading-circle">
      <section v-if="loadingType === 'wave'">
        <div class="sk-wave">
          <div class="sk-rect sk-rect-1"></div>
          <div class="sk-rect sk-rect-2"></div>
          <div class="sk-rect sk-rect-3"></div>
          <div class="sk-rect sk-rect-4"></div>
          <div class="sk-rect sk-rect-5"></div>
        </div>
      </section>
      <section v-if="loadingType === 'dots'">
        <div class="sk-three-bounce">
          <div class="sk-bounce-1 sk-child"></div>
          <div class="sk-bounce-2 sk-child"></div>
          <div class="sk-bounce-3 sk-child"></div>
        </div>
      </section>
      <section v-if="loadingType === 'circle'">
        <div class="sk-circle-bounce">
          <div class="sk-child sk-circle-1"></div>
          <div class="sk-child sk-circle-2"></div>
          <div class="sk-child sk-circle-3"></div>
          <div class="sk-child sk-circle-4"></div>
          <div class="sk-child sk-circle-5"></div>
          <div class="sk-child sk-circle-6"></div>
          <div class="sk-child sk-circle-7"></div>
          <div class="sk-child sk-circle-8"></div>
          <div class="sk-child sk-circle-9"></div>
          <div class="sk-child sk-circle-10"></div>
          <div class="sk-child sk-circle-11"></div>
          <div class="sk-child sk-circle-12"></div>
        </div>
      </section>
      <div class="wrap-text">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myLoading',
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    loadingType: {
      type: String,
      default: 'wave'
    },
    loadingText: {
      type: String,
      default: '加载中......'
    },
    isFullSreen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      if (this.autoClose) {
        this.showLoading = false
      }
    }
  }
}
</script>
<style scoped>
.loading-warp {
  background: rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: Center;
  z-index: 10000000;
}
.loading-warp .wrap-text {
  margin-top: 10px;
}
.sk-fading-circle {
  text-align: center;
}
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
/**/
section {
  flex: 1 1 25%;
}
.sk-wave {
  width: 6em;
  height: 4em;
  margin: auto;
  text-align: center;
  font-size: 1em;
}
.sk-wave .sk-rect {
  background-color: #337ab7;
  height: 100%;
  width: 0.5em;
  display: inline-block;
  -webkit-animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
  animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
}
.sk-wave .sk-rect-1 {
  -webkit-animation-delay: -1.2s;
  animation-delay: -1.2s;
}
.sk-wave .sk-rect-2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.sk-wave .sk-rect-3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.sk-wave .sk-rect-4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.sk-wave .sk-rect-5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-wave-stretch-delay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
    transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

@keyframes sk-wave-stretch-delay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
    transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

/**/
.sk-three-bounce .sk-child {
  width: 1em;
  height: 1em;
  background-color: #337ab7;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
  animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
}
.sk-three-bounce .sk-bounce-1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.sk-three-bounce .sk-bounce-2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-three-bounce {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes sk-three-bounce {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
/**/
.sk-circle-bounce {
  width: 4em;
  height: 4em;
  position: relative;
  margin: auto;
}
.sk-circle-bounce .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle-bounce .sk-child:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #337ab7;
  border-radius: 100%;
  -webkit-animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
  animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
}
.sk-circle-bounce .sk-circle-2 {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}
.sk-circle-bounce .sk-circle-3 {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
}
.sk-circle-bounce .sk-circle-4 {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.sk-circle-bounce .sk-circle-5 {
  -webkit-transform: rotate(120deg);
  transform: rotate(120deg);
}
.sk-circle-bounce .sk-circle-6 {
  -webkit-transform: rotate(150deg);
  transform: rotate(150deg);
}
.sk-circle-bounce .sk-circle-7 {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.sk-circle-bounce .sk-circle-8 {
  -webkit-transform: rotate(210deg);
  transform: rotate(210deg);
}
.sk-circle-bounce .sk-circle-9 {
  -webkit-transform: rotate(240deg);
  transform: rotate(240deg);
}
.sk-circle-bounce .sk-circle-10 {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
}
.sk-circle-bounce .sk-circle-11 {
  -webkit-transform: rotate(300deg);
  transform: rotate(300deg);
}
.sk-circle-bounce .sk-circle-12 {
  -webkit-transform: rotate(330deg);
  transform: rotate(330deg);
}
.sk-circle-bounce .sk-circle-2:before {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.sk-circle-bounce .sk-circle-3:before {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.sk-circle-bounce .sk-circle-4:before {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.sk-circle-bounce .sk-circle-5:before {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.sk-circle-bounce .sk-circle-6:before {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.sk-circle-bounce .sk-circle-7:before {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.sk-circle-bounce .sk-circle-8:before {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.sk-circle-bounce .sk-circle-9:before {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.sk-circle-bounce .sk-circle-10:before {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.sk-circle-bounce .sk-circle-11:before {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.sk-circle-bounce .sk-circle-12:before {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes sk-circle-bounce-delay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes sk-circle-bounce-delay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
