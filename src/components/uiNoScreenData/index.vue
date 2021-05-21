<template>
  <div class="no-screen">
    <div class="bg"></div>
    <div class="desc">筛选结果为空</div>
  </div>
</template>

<style lang="less" scoped>
.no-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  .bg {
    background: url('kby_shaixuan.png') no-repeat center;
    width: 2.32rem;
    height: 2.22rem;
    background-size: cover;
  }
  .desc {
    color: #c9c9c9;
    margin-top: 0.64rem;
    font-size: 0.28rem;
  }
}
</style>
