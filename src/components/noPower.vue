<template>
  <div id="no-power">
    <div class="bg"></div>
    <div class="msg">
      {{ msg }}
      <a target="_blank" :href="url">去升级</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg'],
  data() {
    return {
      url: location.origin + '/finchinaAPP/rights_and_interests.html' + location.search,
    };
  },
  methods: {
    help() {
      window.open('fcnews://chat/feedback');
    },
  },
  mounted() {
    this.$nextTick(() => {
      let appVersion = window.appVersion; //app version(ios)
      try {
        appVersion = window.jsi.appVersion(); //app version(android)
      } catch (e) {}
      if (appVersion) {
        let arr = appVersion.substr(1).split('.'),
          compareVersion = 1; // 0 大于当前版本  1当前版本 2小于当前版本
        try {
          [3, 5, 0].forEach((n, i) => {
            if (compareVersion === 1) {
              let temp = parseInt(arr[i]);
              compareVersion = temp === n ? 1 : temp > n ? 0 : 2;
            }
          });
        } catch (e) {}
        if (!compareVersion) {
          this.url = 'https://ari.finchina.com/finchinaAPP/Permission';
        }
      }
    });
  },
};
</script>
<style lang="less">
#no-power {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  width: 4rem;
  // margin: 0 auto;
  margin: 0 auto;
  margin-top: 66%;
  // transform: translate(-50%, -50%);

  .bg {
    margin: 0 auto 0.2rem;
    width: 2.42rem;
    height: 1.78rem;
    background: url(../assets/img/vip.png) no-repeat;
    background-size: 100% auto;
  }

  .msg {
    margin: 0 auto;
    color: #bbb;
    font-size: 0.24rem;
    line-height: 0.34rem;
    text-align: center;
    font-weight: normal;
    /*letter-spacing: 0.02rem;*/

    a {
      color: #1482f0;
      text-decoration: none;
    }
  }
}
</style>