import nodata from '@/components/uiNoData';
import bottomstatus from '@/components/uiBottomStatus';
export default {
  components: {
    nodata,
    bottomstatus
  },
  props: {
    isSequence: true, //是否显示序列号
    columns: [],
    tableData: [],
    total: 100
  },
  data() {
    return {
      // columns: [{
      //   key: 'devzName',
      //   name: '开发区',
      //   fixed: true, //是否固定
      //   sort: true,  //是否排序
      //   isCustom: true, //是否自定义模板
      //   extraStyle: {
      //     width: '2rem'
      //   }
      // }, {
      //   key: 'tab1',
      //   name: 'GDP(元)'
      // }],
      // tableData: [],
      filterColumns: {},
      noMoreStatus: false, //暂无更多数据
      noDataStatus: false, //暂无数据
    };
  },
  computed: {

  },
  watch: {
    total: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.noMoreStatus = false; //暂无更多数据
        this.noDataStatus = false; //暂无数据
        if (!newVal) {
          this.noDataStatus = true; //暂无数据
        }
      },
    },
  },
  mounted() {
    this.getColumns(); // 处理表头数据
    // this.getColumnsData();
  },
  methods: {
    // 处理表头数据
    getColumns() {
      let [fixedList, otherList] = [
        [],
        []
      ];
      let columns = this.columns.map(item => {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序
        return item;
      });

      fixedList = columns.filter(item => item.fixed);
      otherList = columns.filter(item => !item.fixed);
      this.filterColumns = {
        fixedList,
        otherList
      };

      this.$nextTick(() => {
        this.calcTabHeight(); // 计算表格主体高度
      });
    },

    // 处理表格数据
    getColumnsData() {
      let arr = [];
      for (var k = 0; k < 50; k++) {
        arr.push({
          devzName: '上海外滩' + k,
          tab1: k + '923.45',
          tab2: k + '35.68',
          tab3: k + '25.89',
          tab4: k + '1.00'
        })
      }
      this.tableData = arr;
    },

    // 计算表格主体高度
    calcTabHeight() {
      let tabHeader = document.getElementById("tabHeader"), //表头
        tabBody = document.getElementById("tabBody"), //表体
        uiTab = document.getElementById("uiTab"); //父元素

      let w = tabHeader.offsetWidth; // 返回表头的总宽度
      let h = tabHeader.offsetHeight; // 返回表头的总高度
      tabBody.style.height = uiTab.offsetHeight - h + 'px';
    },

    // 监听表格水平滚动事件
    handleHorizontalScroll(e, type) {
      // console.log('===', e)
      let scrollLeft = e.target.scrollLeft;
      if (type == 'tHeader') { //表头滚动
        this.$refs.tBody.scrollLeft = scrollLeft;
      } else if (type == 'tBody') { //表体滚动
        this.$refs.tHeader.scrollLeft = scrollLeft;
      }
    },

    // 监听表格垂直滚动事件
    handleVerticalScroll(e) {
      let scrollHeight = e.target.scrollHeight,
        scrollTop = e.target.scrollTop,
        offsetHeight = e.target.offsetHeight;
      if (offsetHeight + scrollTop - 50 >= scrollHeight) {
        // console.log('===', e);
        if (this.total > this.tableData.length) {
          this.$emit('handleLoadMore'); //触发加载更多
        } else {
          this.noMoreStatus = true; //暂无更多数据
        }
      }
    },

    // 排序-固定列
    async handleSort1(d, i) {
      let item = Object.assign({}, d);
      await this.resetSort();
      item.sortType = item.sortType == 2 ? 0 : (item.sortType + 1);
      this.$set(this.filterColumns.fixedList, i, item);
      this.$emit('handleSort', item);
    },
    // 排序-非固定列
    async handleSort2(d, i) {
      let item = Object.assign({}, d);
      await this.resetSort();
      item.sortType = item.sortType == 2 ? 0 : (item.sortType + 1);
      this.$set(this.filterColumns.otherList, i, item);
      this.$emit('handleSort', item);
    },
    // 重置排序
    resetSort() {
      this.filterColumns.fixedList.map(item => {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序
        return item;
      });
      this.filterColumns.otherList.map(item => {
        item.sort && (item.sortType = 0); //0默认,1降序，2升序
        return item;
      });
    }
  }
};
