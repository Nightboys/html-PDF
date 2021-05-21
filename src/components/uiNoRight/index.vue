<template>
  <div class="no-right-content">
    <div><img src="./no_right_icon.png" alt="" /></div>
    <div>暂无查看权限</div>
  </div>
</template>
<script>
export default {
  name: 'no_right',
};
</script>
<style lang="less" scoped>
.no-right-content {
  img {
    width: 2.48rem;
    height: 1.2rem;
  }
  > div {
    text-align: center;
  }
  > div:nth-child(2) {
    // width: 1.44rem;
    height: 0.22rem;
    font-size: 0.22rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #bababa;
    line-height: 0.22rem;
    letter-spacing: 0.02rem;
    margin: 0.06rem auto 0.24rem;
  }
}
</style>
