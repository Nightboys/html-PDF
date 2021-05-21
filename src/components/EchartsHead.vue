<template>
  <div class="blondeHair">
    <div class="head_left">
      <div class="blueEyes"></div>
      <div class="vermilion">{{ mytitle }}</div>
    </div>

    <div class="head_right" v-if="show">
      <div class="trance_w_left">
        <input type="checkbox" @change="change" v-model="ischeck" :id="mytitle + 'emptyBlank'" />
        <!-- <p>隐藏空行</p> -->
        <label :for="mytitle + 'emptyBlank'">隐藏空行</label>
      </div>

      <div class="trance_w_right">
        <div class="menudiv_left" @click.prevent="handleShowDialog">溯源</div>

        <div class="ios_button">
          <input type="checkbox" :id="mytitle" />
          <label :for="mytitle" id="ios_but_label">
            <em></em>
          </label>
        </div>

        <div class="ioscheck_top" @click.prevent="handle_trance"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { appAlert } from '@/utils/appAssist';
export default {
  components: { appAlert },
  props: {
    mytitle: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ischeck: true,
      open_trance: false, //溯源开启状态
    };
  },
  created() {
    // console.log(this.mytitle, 'this.mytitle');
  },
  methods: {
    change() {
      // console.log(this.ischeck);
      this.$emit('removeblank', this.ischeck);
    },
    handleShowDialog() {
      //弹窗
      appAlert({
        title: '提示',
        message: '财汇资讯新增数据溯源功能，便于用户快速查询指标数据来源。目前部分指标可溯源，更多指标溯源将陆续上线。',
        okname: '已了解',
      });
    },
    handle_trance() {
      // console.log('朔源打开');
      //溯源打开
      let a = document.getElementById(`${this.mytitle}`);
      let e = document.createEvent('MouseEvent');
      e.initEvent('click', false, false);
      a.dispatchEvent(e);

      this.open_trance = !this.open_trance;
      // console.log(this.open_trance, 'head组件内部改变');
      this.$emit('tracesource', this.open_trance);
    },
  },
};
</script>

<style lang="less" scoped>
.blondeHair {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  .head_left {
    display: flex;
    .blueEyes {
      width: 0.08rem;
      height: 0.32rem;
      opacity: 1;
      background: #1e9df8;
      border-top: 1px solid transparent;
      margin-right: 0.18rem;
    }
    .vermilion {
      // width: 80px;
      height: 0.34rem;
      opacity: 1;
      font-size: 0.32rem;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #3c3c3c;
      line-height: 0.34rem;
      letter-spacing: 0rem;
    }
  }
  .head_right {
    height: 0.34rem;
    display: flex;
    .trance_w_left {
      display: flex;
      align-items: center;
      input {
        width: 0.24rem;
        height: 100%;
        border: none;
        outline: none;
        position: relative;
        visibility: hidden;
        margin-right: 0.1rem;
        margin-left: 0.1rem;
        display: flex;
        align-items: center;
        &:after {
          content: '';
          display: inline-block;
          visibility: visible;
          width: 0.24rem;
          height: 0.24rem;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAALVJREFUSA1j3L17938GGEDmMMEEQTQjsgyyBBoblzIUw5D14JQg1kaIYXv27NmG0ygqSjDg8iCyn2BsvI6CKUKncToWXSGMT3sNLCCrQJ6BWUmANiUt7kg0HRwFtPf0qA0EYhksTXIogdKSKbFp6f///5CSh5GR8Q1Q42linESCGlOgBSLg1A0y3MXFxYsEzQSVQn3pSXIYETQZTcGoBWgBgskdDSLMMEETGfpBRHq1gxYEhLgA/3E8Oqr9PbUAAAAASUVORK5CYII=')
            no-repeat #fff;
          // background-color: aquamarine;
          background-size: 100% 100%;
        }
        &:checked {
          &:after {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAAXNSR0IArs4c6QAAApRJREFUSA21VTtvE0EQ3rVPIEHss3DOebREmEdtCgQISvIDaPgJgRQIBRTFLmwrIkRp4riiTkMP7SFFQJEWIRkiIURB5EvhsxFFfLfLzNpzurXPhy8SJ9kzN/PN9+3s6/hstSPZ8EmhPankuGGkbzDMWHV3FYM8DMOAeua25UXlLO3KrHIiYZBRzFbNXUHUYq1btJpyJrYiWlGVRPxZVfed0gjnaDAqQS9oscUwULVKAY0qFkkVkywyGZOS4fhCrXdNphn3fcGDLqxa508YhP7iZvcqNuBdmvl5vJ75wiSTgYJTzl2A9XoshWwwI1Vknmhl0plsa51r3QYFyOhsmHtg8IcPPxlY7V8VYDNadPJLKdnaIVECdrVYwSxNHoWemarAqndeU5k2SxQMW9jNx0ywrxRTCla187BQ765RkKwCM/bNqZh3KaYKnErujRBiK1wEk/ELVvbIKZt3CIw2GBLuStwGUCSklE8B/B2Yb4fB6GtNYxEobUP8B4BvjYLxPVCg5Nj+p8TQagojuchXVChNu9qwuwc3Dx9szMNIyrMHSyAwSz0fwqQsn51rvHLY5YPEczROFR+hDuJR/8jOb/au+56wYUoKKZ561i5nd6hkTOCeLY3397lHgDiLl5vHhO15/hys4wHPm5fbK/x3uEYTgLOy/PnAfQs7nMHN9QLuta0wmHy8DPuetPvSnwfiD0C85IwQE1YTgHOFVxnH7xEcnz0Qegktr0HLeDrU96nPpH3qiQXO+cf8OfNK6znvEVmU1QQIAEJN8Jsg9ERIsQtCrxhn7qkUJoz4U/68WURihwpibKQA4UGoAX6jUHcfScFumrls+WiVd6chJo5YAQK1N8x98PeTEFPtfz8HyT87NLQp7V/vOwldhPOgfwAAAABJRU5ErkJggg==');
          }
        }
      }
      p {
        width: 0.96rem;
        height: 0.32rem;
        opacity: 1;
        font-size: 0.24rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: right;
        color: #5c5c5c;
        line-height: 0.32rem;
      }
      label {
        width: 0.96rem;
        height: 0.32rem;
        opacity: 1;
        font-size: 0.24rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: right;
        color: #5c5c5c;
        line-height: 0.32rem;
      }
    }
    .trance_w_right {
      display: flex;
      align-items: center;
      position: relative;
      margin-left: 0.32rem;
      .menudiv_left {
        flex: none;
        width: 0.6rem;
        font-size: 0.24rem;
        color: #5c5c5c;
        padding-left: 0.36rem;
        background: url('../assets/images/question3x.png') no-repeat;
        background-size: 0.24rem, 0.24rem;
        background-position: left;

        height: 0.32rem;
        opacity: 1;
        font-size: 0.24rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #5c5c5c;
        line-height: 0.32rem;
      }
      .ioscheck_top {
        position: absolute;
        left: 0.4rem;
        width: 1.2rem;
        height: 0.64rem;
      }
      .ios_button {
        margin: 0;
        padding: 0;

        clear: both;
      }

      .ios_button input {
        display: none;
      }

      .ios_button label {
        width: 0.52rem;

        background: white;

        height: 0.28rem;

        border-radius: 0.14rem;

        float: right;

        // margin-top: 0.2rem;

        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
      }

      .ios_button label em {
        width: 0.26rem;

        height: 0.26rem;

        float: left;

        margin: 1px;

        border-radius: 0.13rem;
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.1);

        background: #fff;

        transition: 0.1s;
      }

      .ios_button input:checked + label {
        background: #1482f1;
      }

      .ios_button input:checked + label em {
        margin: 1px 1px 1px 0.25rem;
      }

      .ios_button input:disabled + label {
        opacity: 0.5;
      }
    }
  }
}
</style>