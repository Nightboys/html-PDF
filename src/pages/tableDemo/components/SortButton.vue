<template>
  <div class="sortbtn" :class="classobj" @click="handleSort()">{{ item.name }}{{ item.unit }}</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    ind: {
      type: Number,
    },
    sortindex: {
      type: Number,
    },
    specialNum: {
      type: Number,
    },
  },
  data() {
    return {
      classobj: {
        common: true,
        desc: false,
        asc: false,
        bigMac: false,
      },
    };
  },
  methods: {
    handleSort() {
      // 未激活状态下点击，激活，降序
      if (this.classobj.common) {
        // console.log('第一次激活，降序排序');
        this.classobj.common = false;
        this.classobj.desc = true;
      } else {
        // 非降即升
        this.classobj.desc = !this.classobj.desc;
        this.classobj.asc = !this.classobj.asc;
      }
      this.$emit('handlerSort', { index: this.ind, value: this.item.value, sort: this.howSort });
    },
  },
  computed: {
    howSort() {
      return this.classobj.desc ? 'desc' : 'asc';
    },
  },
  watch: {
    sortindex: {
      handler() {
        if (this.ind == this.sortindex) {
          this.classobj.common = false;
          this.classobj.desc = true;
        } else {
          this.classobj.common = true;
          this.classobj.desc = false;
          this.classobj.asc = false;
        }
      },
      immediate: true,
    },
    specialNum: {
      handler() {
        if (this.ind == this.specialNum) {
          this.classobj.bigMac = true;
          console.log('this.ind:', this.ind);
        } else {
          this.classobj.bigMac = false;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.sortbtn {
  // min-width: 2.12rem;
  min-width: 1.52rem;
  text-align: center;
  line-height: 0.34rem;
  font-size: 0.26rem;
  color: #333333;
  text-align: right;
  padding-right: 0.28rem;
  min-height: 0.34rem;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  margin-right: 0.24rem;
}
.common {
  background: url('../../../assets/images/common3x.png') no-repeat;
  background-size: 0.24rem, 0.24rem;
  // background-position-y: 0.06rem;
  background-position-y: 45%;
  background-position-x: right;
}
.desc {
  background: url('../../../assets/images/desc2x.png') no-repeat;
  background-size: 0.24rem, 0.24rem;
  // background-position-y: 0.06rem;
  background-position-y: 45%;
  background-position-x: right;
}
.asc {
  background: url('../../../assets/images/asc3x.png') no-repeat;
  background-size: 0.24rem, 0.24rem;
  // background-position-y: 0.06rem;
  background-position-y: 45%;
  background-position-x: right;
}
.bigMac {
  // min-width: 3.2rem;
  min-width: 1.52rem;
}
</style>