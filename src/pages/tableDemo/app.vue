<template>
  <div class="contrast">
    <div class="top_head">
      <menu-head :menus="menus" @menuChange="menuChange" v-show="!isInpute">
        <div class="search" slot="right" @click="handleInputWord">
          <img src="../../assets/images/search3x.png" alt="" />
          <span v-if="keytext" class="text">{{ keytext.length > 2 ? keytext.slice(0, 2) + '...' : keytext }}</span>
          <span v-else class="base_text">搜索关键字</span>
          <img v-if="keytext" src="../../assets/images/oval3x.png" alt="" @click.stop="hanleDeleteValue" />
        </div>
      </menu-head>

      <div class="inpute">
        <div class="ico_search">
          <img src="../../assets/images/ico_search3x.png" alt="" />
        </div>
        <input
          type="text"
          v-model="keyword"
          placeholder="请输入开发区名称"
          class="inputword"
          ref="targetInput"
          @keydown.enter="handleSearch"
        />
        <div class="input_search" @click="handleSearch">搜索</div>
        <div class="leaveInpute" @click="handleInputBack">
          <div>收起</div>
          <img src="../../assets/images/ico_chakan_ba3x.png" alt="" />
        </div>
      </div>
    </div>

    <div class="middle_head">
      <div class="middle_left">
        <span>共：</span>
        <span class="oriangedata">{{ allDataQuantity }}</span>
        <span>条数据</span>
      </div>
      <div class="middle_right">
        <div class="menudiv_left" @click.prevent="handleShowDialog">溯源</div>

        <div class="ios_button">
          <input type="checkbox" id="onoffbutton" />
          <label for="onoffbutton" id="ios_but_label">
            <em></em>
          </label>
        </div>

        <div class="ioscheck_top" @click.prevent="handle_trance"></div>
      </div>
    </div>

    <div class="table_body">
      <uiTab
        :columns="tableColumns"
        :tableData="tableData"
        :total="totalCount"
        @handleSort="handleSort"
        @handleLoadMore="handleLoadMore"
      >
        <!-- 自定义列模板 -->
        <template #tab2="{ row }">
          <span>111{{ row.devzName }}</span>
        </template>
      </uiTab>
    </div>
  </div>
</template>

<script>
import uiTab from './components/uiTable/table';
import myApp from './js/myApp';
export default {
  components: { uiTab },
  mixins: [myApp],
};
</script>

<style lang="less" scoped>
@import './css/style.less';
.table_body {
  width: 100%;
  height: calc(100vh - 1.24rem);
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  // background: #999;
}
</style>