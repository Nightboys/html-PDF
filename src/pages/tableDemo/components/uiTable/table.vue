<template>
  <div id="uiTab">
    <div class="tab-header" id="tabHeader">
      <div class="tab-left">
        <div class="tab-item sort-index" v-if="isSequence">序号</div>
        <div class="tab-item" v-for="(d, i) in filterColumns.fixedList" :key="i" :style="d.extraStyle">
          {{ d.name }}
          <i
            :class="[d.sortType == 1 ? 'sort-down' : d.sortType == 2 ? 'sort-up' : '']"
            v-if="d.sort"
            @click="handleSort1(d, i)"
          ></i>
        </div>
      </div>
      <div class="tab-right" ref="tHeader" @scroll.self="handleHorizontalScroll($event, 'tHeader')">
        <div class="tab-item" v-for="(d, i) in filterColumns.otherList" :key="i" :style="d.extraStyle">
          {{ d.name }}
          <i
            :class="[d.sortType == 1 ? 'sort-down' : d.sortType == 2 ? 'sort-up' : '']"
            v-if="d.sort"
            @click="handleSort2(d, i)"
          ></i>
        </div>
      </div>
    </div>

    <div class="tab-body" id="tabBody" @scroll.self="handleVerticalScroll($event)">
      <div class="tab-body-content">
        <div class="tab-left">
          <div class="tab-list-item" v-for="(item, index) in tableData" :key="index">
            <div class="tab-item sort-index" v-if="isSequence">{{ index }}</div>
            <div class="tab-item" v-for="(d, i) in filterColumns.fixedList" :key="i" :style="d.extraStyle">
              <template v-if="d.isCustom">
                <slot :name="d.key" :row="item"></slot>
              </template>
              <template v-else>
                {{ item[d.key] }}
              </template>
            </div>
          </div>
        </div>
        <div class="tab-right" ref="tBody" @scroll.self="handleHorizontalScroll($event, 'tBody')">
          <div class="tab-list-item" v-for="(item, index) in tableData" :key="index">
            <div class="tab-item" v-for="(d, i) in filterColumns.otherList" :key="i" :style="d.extraStyle">
              <template v-if="d.isCustom">
                <slot :name="d.key" :row="item"></slot>
              </template>
              <template v-else>
                {{ item[d.key] }}
              </template>
            </div>
          </div>
        </div>
      </div>

      <bottomstatus v-if="noMoreStatus"></bottomstatus>
      <nodata v-if="noDataStatus"></nodata>
    </div>
  </div>
</template>

<script>
import tabIndex from './js/index';
export default {
  components: {},
  mixins: [tabIndex],
};
</script>

<style lang="less" scoped>
@import './css/index.less';
</style>