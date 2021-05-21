import {
  resize
} from '@/utils/dom';
import menuHead from '@/components/menuHead/menuHead';
import sortbtn from '../components/SortButton';
import {
  menus
} from '../data';
import {
  appAlert
} from '@/utils/appAssist';
import {
  arrToObj
} from '@/utils/utils';
import nodata from '@/components/uiNoData';
import noselectdata from '@/components/noData';
import bottomstatus from '@/components/uiBottomStatus';
import {
  getUrlSearches
} from '@/utils/urls';

const {
  user,
  token
} = getUrlSearches();

// 所有开发区类别和选中的开发区类别
let [allDevAreaCategory, selectedDevAreaCategory] = [
  [],
  []
];

menus[2].list.forEach((option) => {
  if (option.name == '开发区类别') {
    option.list.forEach((subOption) => {
      allDevAreaCategory.push(subOption.value);
      if (subOption.selected && !subOption.disabled) {
        selectedDevAreaCategory.push(subOption.value);
      }
    });
  }
});

//所有更多,默认选择更多（除了基本信息）
let [allIndicatorList, selectedIndicatorList] = [
  [],
  []
];
//所有更多（除了基本）查询值与显示名称映射关系
let indicatorValueNameObj = {};
//更多（除了基本）名与单位map
let indicatorUnitObj = {};

// 所有基本信息，默认基本信息
let [allBasicList, selectBasicList] = [
  [],
  []
];
// 基本信息值与显示名称映射关系
let basicValueNameObj = {};
// 基本信息名与单位map
let basicUnitObj = {};

let selectedHeadList = [];

// 区分'更多'中的选项和'基本信息选项'
menus[1].list.forEach((option) => {
  // 区分'更多'中与'基本信息'的其他选项，用来分开传参
  if (option.name !== '基本信息') {
    option.list.forEach((subOption) => {
      indicatorValueNameObj[subOption.value] = subOption.name;
      indicatorUnitObj[subOption.value] = subOption.unit;

      allIndicatorList.push(subOption.value);
      if (subOption.selected && !subOption.disabled) {
        selectedIndicatorList.push(subOption.value);
      }
    });
  } else {
    option.list.forEach((subOption) => {
      basicValueNameObj[subOption.value] = subOption.name;
      basicUnitObj[subOption.name] = subOption.unit;

      allBasicList.push(subOption.value);
      if (subOption.selected && !subOption.disabled) {
        selectBasicList.push(subOption.value);
      }
    });
  }
  // 获取'更多'中所有选项，用来做滚动头部列表
  option.list.forEach((subOption) => {
    if (subOption.selected && !subOption.disabled) {
      selectedHeadList.push(subOption);
    }
  });
});

export default {
  // {"module_type":"devZone_devZoneContrastList"，"exportFlag":"true"}
  components: {
    menuHead,
    nodata,
    bottomstatus,
    sortbtn,
    noselectdata
  },
  data() {
    return {
      menus,
      nodataIndex: 2,
      sortIndex: 0,
      keytext: '', //关键字
      keyword: '', //输入框绑定的v-model
      isInpute: false, //menushead和输入框的状态切换
      open_trance: false, //溯源开启状态
      selectedIndicName2: selectedIndicatorList.toString(), //选中更多(除了更多)  参数
      selectedIncludes: selectBasicList.toString(), //选中的基本信息  参数
      selectedDevArea: selectedDevAreaCategory.toString(), //选中的开发区分类 参数
      // cr0231_013: 'default', //地区码 参数
      cr0231_013: '', //地区码 参数
      cr0231_005: '', //地区码 传全国下的省份地区码
      selectedDate: '', //选中的日期  参数
      sortKey: '', //排序对象像 参数
      sortRule: '', //排序规则: desc倒序,asc顺序 参数
      selectedIndicNameList: selectedIndicatorList, //头部滚动列表的更多（除了基本数据）数组
      selectedIncludesList: selectBasicList, //基本数据的列表，也要加入头部滚动数组
      selectHead: selectedHeadList, //滚动头部的数组
      basisData: [], //基本信息数据
      mainData: [],
      nodata: false,
      noSelectData: false,
      dataQuantity: 0, //数据数量 用作赋值from
      allDataQuantity: 0, //共n条数据
      devzFrom: 0,
      devzSize: 20,
      stopLoad: false, //停止加载，防止滑动式连续多次请求接口
      hasNext: true,
      noMoreData: false,
      appCondition: {
        user,
        token,
        exportFlag: true,
        module_type: 'devZone_devZoneContrastList',
      },
      exportFlag: false,
      specialNum: 7,
      contextTips: {}, //主导产业完整信息
      contextTipsNum: 0, //主导产业完整信息下标
      contextTipsFlag: false,
      contextTipsStyles: {},

      tableColumns: [{
        key: 'devzName',
        name: '开发区',
        fixed: true,
        extraStyle: {
          width: '2.14rem',
          color: '#1482f0'
        }
      }, {
        key: 'tab1',
        name: 'GDP(元)',
        sort: true
      }, {
        key: 'tab2',
        name: '固定资产',
        isCustom: true
      }, {
        key: 'tab3',
        name: '工业总产值(元)'
      }, {
        key: 'tab4',
        name: '社会消费'
      }],
      tableData: [],
      totalCount: 50
    };
  },
  created() {
    // console.log('user:',user,'token:',token)
    this.$loading.open();
    resize();
    window.downloadCondition = this.downloadCondition;
    // 获取地区数据
    this.getRegionalData();
    // 获取年份数据
    this.getYear();
  },
  mounted() {
    let that = this;
    // 绑定滚动事件
    this.$nextTick(() => {
      this.addScroll();
    });
    // 绑定右边滚动联动
    this.$nextTick(() => {
      let $headScroll = $('.t_y_middle'),
        $bodyScroll = $('.indicator_content'),
        scrollFrom = '';

      $bodyScroll.on('touchstart', () => {
        scrollFrom = 'bodyScroll';
      });

      $headScroll.on('touchstart', () => {
        scrollFrom = 'headScroll';
      });

      $bodyScroll.scroll(() => {
        if (scrollFrom === 'headScroll') return;
        $headScroll.scrollLeft($bodyScroll.scrollLeft());
        that.contextTipsFlag = false;
      });

      $headScroll.scroll(() => {
        if (scrollFrom === 'bodyScroll') return;
        $bodyScroll.scrollLeft($headScroll.scrollLeft());
        that.contextTipsFlag = false;
      });
    });
    // 特殊处理 主导产业
    this.handleLongWord(this.selectHead);

    this.getColumnsData(); // 表格测试数据
  },
  computed: {},
  methods: {
    // 表格测试数据
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
    // 表格排序
    handleSort(item) {
      console.log('===', item);
    },
    // 加载更多
    handleLoadMore() {

    },

    downloadCondition() {
      try {
        webkit.messageHandlers.downloadCondition.postMessage(JSON.stringify(this.appCondition));
      } catch (e) {}

      try {
        window.jsi.downloadCondition(JSON.stringify(this.appCondition));
      } catch (e) {}
    },
    addScroll() {
      let content = document.querySelector('.inner'),
        wHeight = $(window).height();

      this.scrollPage = () => {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset;
        let conHeight = content.scrollHeight;
        if (!this.stopLoad && this.hasNext && conHeight < wHeight + scrollTop - 80) {
          this.devzFrom = this.dataQuantity;
          this.getSubjectData();
        }

        this.contextTipsFlag = false; //列表滚动隐藏主导生产提示弹窗
      };
      window.addEventListener('scroll', this.scrollPage, {
        passive: false
      });
    },
    // 获取年份数据
    async getYear() {
      try {
        let params = {
          user,
          token,
          isHomePage: true
        };
        // console.log(params, '日期params');
        let res = await this.$get('/finchinaAPP/devZone/devZoneContrastEndDate.action', params);
        // console.log(res, '真实接口，开发区对比获取年份');
        this.menus[2].list[1].list = res.data.map((val, index) => {
          if (index == 1) {
            this.selectedDate = val.EndDate;
            return {
              value: val.EndDate,
              name: val.EndDate,
              selected: true,
            };
          } else {
            return {
              value: val.EndDate,
              name: val.EndDate,
            };
          }
        });
        this.getSubjectData();
      } catch (err) {
        console.log(err);
      } finally {}
    },
    // 获取地区数据
    getRegionalData() {
      let url = '/finchinaAPP/devZone/getCityAndProvince.action';
      let params = {
        user,
        token,
        includeProvinceSelf: true
      };
      $.getJSON(url, params, (res) => {
        // console.log(res, 'res');
        let results = [];
        res.data.forEach((arr) => {
          results.push(this.handleItems(arr, 1));
        });
        if (!results.length) return;
        this.menus[0].list = results;
        // console.log(results, 'results', this.menus, 'this.menus');
      });
    },
    // 获取主题数据
    async getSubjectData() {
      if (this.devzFrom == 0) {
        this.$loading.open();
      }
      this.stopLoad = true;
      // console.log('都有数据了');
      let url = '/finchinaAPP/devZone/devZoneContrastList.action';
      let params = {
        endDate: this.selectedDate, //日期
        indicName2: this.selectedIndicName2, //指标
        includes: this.selectedIncludes + ',Guid', //基本信息
        cr0231_013: this.cr0231_013, //地区 选择省份下的地区
        cr0231_005: this.cr0231_005, //地区 选择全国下的省份
        cr0231_022: this.selectedDevArea, //开发区
        sortKey: this.sortKey,
        sortRule: this.sortRule,
        devzFrom: this.devzFrom,
        devzSize: this.devzSize,
        devzName: this.keytext,
        user,
        token,
        exportFlag: this.exportFlag,
      };
      this.appCondition = Object.assign(this.appCondition, params, {
        devzSize: 1000
      });
      // this.appCondition = Object.assign({}, params, this.appCondition, { devzSize: 10000 });
      console.log(params, 'params');
      // console.log(this.appCondition, 'this.appCondition');
      try {
        let res = await this.$get(url, params);
        // console.log(res, 'res');
        this.allDataQuantity = res.total;
        // 判断是否还有数据
        if (!res.data.length || res.data.length % this.devzSize) {
          this.hasNext = false;
          this.noMoreData = true;
        }
        // 判断暂无数据的情况
        if (!res.data.length && this.devzFrom === 0) {
          if (this.cr0231_013 !== 'default' || this.keytext !== '') {
            this.noSelectData = true;
          } else {
            this.nodata = true;
          }
          this.noMoreData = true; //不让暂无相关消息&&没有更多数据同时出现
        }
        if (res.data.length) {
          // 将头部滚动的数据内容加入'基本信息选项'
          this.basisData = this.fillMoreData(res.data);
          // 将更多中除'基本信息'外的数据内容填充完整
          this.fillData(res.data);
          // 将'更多除了基本信息的数据'和'基本数据'结合起来
          this.connectArr(res.data);
          // 设置头部滚动数组
          // this.getScrollList();
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.$loading.close();
        this.stopLoad = false;
      }
    },
    // '更多' 数据填充(除了基本信息)
    fillData(array) {
      array.forEach((item) => {
        if (item.hits.length) {
          let arr = [];
          this.selectedIndicNameList.forEach((val) => {
            var a = item.hits.filter((item2) => {
              return val == item2.IndicName2;
            });
            if (a.length > 0) {
              arr.push(a[0]);
            } else {
              arr.push({
                IndicName2: val,
                Mvalue: null,
                DEVZCode: item.DEVZCode
              });
            }
          });
          item.hits = arr;
        } else {
          let arr2 = [];
          this.selectedIndicNameList.forEach((val2) => {
            arr2.push({
              IndicName2: val2,
              Mvalue: null,
              DEVZCode: item.DEVZCode
            });
          });
          item.hits = arr2;
        }
      });
      // console.log(array, '填充之后');
      return array;
    },
    // 根据开发区和基本信息选项筛选出数组
    fillMoreData(array) {
      // 基本信息不会和更多中的其他选项一起返回，而是融入每一个选项，任取一个就好
      // 获取每个开发区的第一个数据
      let arr = array.map((item) => {
        return item.hits[0];
      });
      // console.log(arr);
      // console.log(array);
      // 从选中的基本信息数组中遍历出各基本条件所属的开发区
      // console.log(this.selectedIncludesList);
      let arr2 = [];
      this.selectedIncludesList.forEach((val) => {
        array.forEach((val2) => {
          for (var i in val2) {
            if (i == val) {
              arr2.push({
                DEVZName: val2.devzName, //重庆两江新区
                DEVZCode: val2.DEVZCode,
                // IndicName2: val2.IndicName2,
                Mvalue: val2[i],
                basic: i,
              });
            }
          }
        });
      });
      // 通过开发区区别数组
      // console.log(arr2, '处理后');
      let arr3 = arrToObj(arr2, 'DEVZName');
      // console.log(arr3);
      return arr3;
    },
    // 将更多中的选项和 '基本信息'选项数据结合
    connectArr(array) {
      let arr1 = JSON.parse(JSON.stringify(array));
      arr1.forEach((val) => {
        for (var i in this.basisData) {
          if (val.devzName == i) {
            val.hits = val.hits.concat(this.basisData[i]);
          }
        }
      });
      let disposableData = arr1;
      this.mainData = [...this.mainData, ...disposableData];
      // console.log(this.mainData);
      this.dataQuantity = this.mainData.length;
    },
    // 处理地区数据
    handleItems(arr, idx) {
      let means = ['value', 'name', 'parent', 'level', 'list'],
        obj = {};

      arr.forEach((v, i) => {
        obj[means[i]] = v;
      });

      if (obj.list) {
        if (obj.list.length) {
          let tArr = [];
          obj.selectAllName = '全部';
          obj.list.forEach((itemArr) => tArr.push(this.handleItems(itemArr, idx + 1)));
          obj.list = tArr;
        } else {
          delete obj.list;
        }
      }
      return obj;
    },
    // 筛选项的点击
    menuChange(arr, idx, selectlist) {
      this.stopLoad = false; //重置请求条件
      this.nodata = false; //重置无数据判断
      this.mainData = []; //清空数据
      this.hasNext = true; //重置滚动请求加载条件
      this.noMoreData = false;
      this.devzFrom = 0; //重置起始页

      this.menus = arr;
      switch (idx) {
        case 0:
          console.log('改变地区', selectlist);
          if (selectlist.length) {
            let primaryArea = []; //一级地区
            let secondaryArea = []; //二级地区
            selectlist.forEach((val) => {
              if (val.level == 0) {
                // console.log('点击了全国下的全部');
                val.list.forEach((val2) => {
                  primaryArea.push(val2.value);
                });
                // secondaryArea.push('default');
              } else if (val.level == 1) {
                // console.log('选中了全国下的省', '或者点击省份的全部');
                primaryArea.push(val.value);
              } else {
                // console.log('二级或者三级地区');选中本级和全部时
                if (val.selectAll && val.selected) {
                  secondaryArea.push(val.value);
                  val.list.forEach((val2) => {
                    secondaryArea.push(val2.value);
                  });
                  // 选中全部但没选本级时
                } else if (val.selectAll === true && val.selected === false) {
                  val.list.forEach((val2) => {
                    secondaryArea.push(val2.value);
                  });
                } else {
                  secondaryArea.push(val.value);
                }
              }
            });
            // console.log(allarr, 'allarr');
            // 对一级地区去重
            let firtsSet = new Set(primaryArea);
            let cr005 = [];
            for (let i of firtsSet) {
              cr005.push(i);
            }
            // 对二级地区去重
            let secondSet = new Set(secondaryArea);
            let cr013 = [];
            for (let i of secondSet) {
              cr013.push(i);
            }
            // 应领导要求，做返回限制，返回前100个地区
            // 一级地区的地区数量
            // let cr005AreaNum = cr005.length;
            let maxCr013Num = 100 - cr005.length;
            // console.log(maxCr013Num);
            if (cr013.length > maxCr013Num) {
              cr013.splice(maxCr013Num);
              appAlert({
                title: '提示',
                message: '单次筛选最多返回一百个地区结果',
                okname: '已了解',
              });
            }
            // console.log('一级地区数量：', cr005.length);
            // console.log('二级地区数量：', cr013.length);

            this.cr0231_013 = cr013.toString();
            this.cr0231_005 = cr005.toString();
          } else {
            // console.log('重置后没选任何地区');
            this.cr0231_013 = '';
            this.cr0231_005 = '';
          }
          this.keytext = '';
          break;
        case 2:
          console.log('改变了更多');
          // 改变日期
          let typeOfDevArea = [],
            endDate = '';
          endDate = selectlist[selectlist.length - 1].value;
          this.selectedDate = endDate;
          // 改变开发区类别
          for (let i = 0; i < selectlist.length - 1; i++) {
            typeOfDevArea.push(selectlist[i].value);
          }
          this.selectedDevArea = typeOfDevArea.toString();
          // this.cr0231_013 = ''; //改变更多时，将筛选地区置为全国

          break;
        case 1:
          // console.log('改变了指标', selectlist);
          let exceptBasic = [],
            basic = [];
          selectlist.forEach((val) => {
            if (val.basic == 'basic') {
              basic.push(val.value);
            } else {
              exceptBasic.push(val.value);
            }
          });
          // console.log('除了基本:', exceptBasic, '基本:', basic);
          // 获取'开发区类别','年份','除了基本信息的更多选项','基本信息'选项，以供数据甄别和传参
          this.selectedIndicNameList = exceptBasic;
          this.selectedIndicName2 = exceptBasic.toString();
          this.selectedIncludesList = basic;
          this.selectedIncludes = basic.toString();
          // 改变滚动头部的数组内容
          this.selectHead = selectlist;
          this.handleLongWord(this.selectHead);
          break;
      }
      this.getSubjectData();
    },
    // 点击 '搜索关键字'
    handleInputWord() {
      // console.log('点击搜索关键字');
      this.isInpute = true;
      // console.log(this.$refs.targetInput);
      this.$refs.targetInput.focus();
    },
    // 高亮关键字
    highlightKeyword(content) {
      if (!content || this.keytext == '') return content;
      let codeText = content,
        index = content.indexOf(this.keytext);
      if (index > -1) {
        codeText = content.replace(
          new RegExp(this.keytext, 'g'),
          '<label class="highlight_text">' + this.keytext + '</label>'
        );
      }
      return codeText;
    },
    // 点击删除关键字按钮
    hanleDeleteValue() {
      // console.log('删除关键字');
      this.keytext = '';
      this.keyword = '';
    },
    // 退出输入框状态
    handleInputBack() {
      this.isInpute = false;
    },
    // 点击搜索
    handleSearch() {
      if (this.keyword == '') {
        // console.log('未搜索任何东西');
        this.isInpute = false; //输入框隐藏
        return;
      }
      this.keytext = this.keyword; //将input的值赋给keytext
      this.isInpute = false; //输入框隐藏
      this.stopLoad = false; //重置请求条件
      this.nodata = false; //重置无数据判断
      this.mainData = []; //清空数据
      this.hasNext = true; //重置滚动请求加载条件
      this.noMoreData = false; //
      this.devzFrom = 0; //重置起始页

      this.cr0231_013 = ''; //搜索条件应该在搜索时默认为全国范围
      this.$refs.targetInput.blur();
      this.getSubjectData();
    },
    // 溯源
    handle_trance() {
      //溯源打开
      let a = document.getElementById('onoffbutton');
      let e = document.createEvent('MouseEvent');
      e.initEvent('click', false, false);
      a.dispatchEvent(e);

      this.open_trance = !this.open_trance;
    },
    // 溯源弹框
    handleShowDialog() {
      //弹窗
      appAlert({
        title: '提示',
        message: '财汇资讯新增数据溯源功能，便于用户快速查询指标数据来源。目前部分指标可溯源，更多指标溯源将陆续上线。',
        okname: '已了解',
      });
    },
    // 点击排序
    handleClickSort(obj) {
      console.log(obj, 'obj');
      this.stopLoad = false; //重置请求条件
      this.nodata = false; //重置无数据判断
      this.mainData = []; //清空数据
      this.hasNext = true; //重置滚动请求加载条件
      this.noMoreData = false; //
      this.devzFrom = 0; //重置起始页

      this.sortIndex = obj.index;
      this.sortKey = obj.value;
      this.sortRule = obj.sort;
      this.getSubjectData();
      // console.log('this.sortIndex', this.sortIndex);
    },
    // 跳转开发区详情页
    devZoneDetails(data) {
      // hideTopView=1 => 隐藏头部背景图
      // hideSearch = 1 => 是否隐藏搜索栏,
      console.log(data, user, token);
      // <a class="a-href-link" href="./contrastDetails.html?user=dev&token=000000&devzCode=G111001">开发区详情页</a>
      let title = data.devzName;
      let devAreaCategory = data.CR0231_022;
      let params =
        '?user=' +
        user +
        '&token=' +
        token +
        '&devzCode=' +
        data.DEVZCode +
        '&CR0231_022=' +
        devAreaCategory +
        '&developZoneName=' +
        title;
      let datas = [{
        name: '开发区对比详情页',
        url: '/hf/areaForDevelopment/contrastDetails.html' + params,
      }, ];

      location.href =
        'fcnews://websPage?title=' +
        title +
        '&hideTopView=1&hideSearch=1&datas=' +
        encodeURIComponent(JSON.stringify(datas)) +
        '&exportData=1';
    },
    // 溯源跳地区经济溯源
    go_source(data) {
      console.log(data.Guid, 'data');
      if (!data.Guid) {
        return;
      }

      let isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

      if (isIOS) {
        window.open(
          `${location.origin}/finchinaAPP/areaEconomy/areaTrance.html?&user=${user}&token=${token}&guId=${data.Guid}&sharetype=1`
        );
      } else {
        let dd =
          `${location.origin}/finchinaAPP/areaEconomy/areaTrance.html?&user=${user}&token=${token}&guId=${data.Guid}&sharetype=1`;
        window.open('fcnews://commonWebviewPage?link=' + encodeURIComponent(dd));
      }
    },
    // 溯源直接跳附件
    // async go_source(item) {
    //   console.log('跳转溯源', item, 'title:', item.DEVZName);
    //   if (!item.Guid) {
    //     // console.log('没有数据');
    //     return;
    //   }
    //   try {
    //     let url = '/finchinaAPP/devZone/guidInfo.action';
    //     let params = {
    //       user,
    //       token,
    //       guid: item.Guid,
    //     };
    //     let res = await this.$get(url, params);
    //     let fileList = res.data.fileList; //附件路径
    //     let ext = res.data.fileList.split('.');
    //     let type = ext[ext.length - 1]; //附件类型
    //     console.log('fileList:', fileList, 'type:', type, 'name:', item.DEVZName);

    //     let url2 = `${location.origin}/finchinaAPP/hf/companyF9/company/zlib_html.html?url=${fileList}&title=${item.DEVZName}`;

    //     if (type === 'zlib') {
    //       console.log('zlib:', url2);
    //       location.href = `fcnews://webviewPage?link=${encodeURIComponent(url2)}`;
    //     } else {
    //       if (!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //         //安卓
    //         // let androUrl = fileList + `&title=${encodeURIComponent(item.DEVZName)}`;
    //         console.log('安卓 其他附件');
    //         let androUrl = fileList + `&title=附件`;
    //         location.href = `fcnews://webviewPage?link=${encodeURIComponent(androUrl)}`;
    //       } else {
    //         // ios
    //         console.log('ios 其他附件');
    //         location.href = `fcnews://webviewPage?link=${encodeURIComponent(fileList)}&title=${encodeURIComponent(
    //           item.DEVZName
    //         )}`;
    //       }
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   } finally {
    //   }
    // },
    handleLongWord(arr) {
      // console.log(arr, 'arr');
      arr.forEach((val, index) => {
        if (val.name == '主导产业') {
          this.specialNum = index;
        }
      });
      // console.log(this.specialNum);
    },

    /**
     * 点击主导产业显示完整信息
     * @param data 查询对象
     * @param columnIndex 列下标
     * @param rowIndex 行下标
     * @return {string}
     */
    showContextTips(data, columnIndex, rowIndex, e) {
      let that = this;
      if (this.specialNum != columnIndex) return;
      this.contextTips = data;
      // console.log('===', e);
      if (this.contextTipsNum == rowIndex) {
        this.contextTipsFlag = !this.contextTipsFlag;
      } else {
        this.contextTipsFlag = true;
        this.contextTipsNum = rowIndex;
      }

      this.$nextTick(() => {
        let tips_w = $('.top_con_item_tips').width(),
          tips_h = $('.top_con_item_tips').height();

        that.contextTipsStyles = {
          // left: e.clientX - tips_w + 'px',
          top: e.clientY - tips_h - 20 + 'px'
        };
      });
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollPage);
  },
};
