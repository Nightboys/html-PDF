<template>
  <div class="noData">
    <div class="wsj" v-if="idx == 1">
      <img src="./tp_zwxgsj@3x.png" alt />
      <div>暂无相关数据</div>
    </div>
    <div class="wjg" v-if="idx == 2">
      <img src="./tp_wsxjg@3x.png" alt />
      <div>此筛选条件下无结果， 请重新筛选</div>
    </div>
    <div class="zwsj" v-if="idx === 3">
      <div>暂无相关数据</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noData',
  props: ['idx'],
};
</script>

<style lang="less" scoped>
.noData {
  padding-top: 1.2rem;

  .wsj,
  .wjg {
    text-align: center;

    img {
      width: 3.2rem;
      height: 3.2rem;
    }

    div {
      width: 1.56rem;
      height: 0.36rem;
      opacity: 0.8;
      font-size: 0.26rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #888888;
      line-height: 0.36rem;
      letter-spacing: 0;
      margin: 0.26rem auto 0;
    }
  }

  .wjg {
    div {
      width: 2.4rem;
      height: 0.34rem;
      font-size: 0.24rem;
      line-height: 0.34rem;
    }
  }
  .zwsj {
    div {
      width: 1.68rem;
      height: 0.4rem;
      font-size: 0.28rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      margin: 0 auto;
      padding: 0.8rem 0 1rem;
      color: #8c8c8c;
      line-height: 0.4rem;
    }
  }
}
</style>
