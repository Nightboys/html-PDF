window.onload = function (param) {
  initRateEchart(); // 主体评级echarts

  initBuildEchart(); // 主要构成echarts

  initBondEchart(); // 债券融资echarts

  initCreditEchart(); // 授信额度echarts
  initInvestEchart(); // 城投利差echarts

  addPageBreak();// 分页逻辑--页面数据加载完成后在执行此方法
}

// 测试打印
function printPage(param) {
  let targetDom = document.getElementById('printContent');
  html2canvas(targetDom, {
    // height: targetDom.offsetHeight, //给canvas设置高度，
    onrendered: function (canvas) {
      //通过html2canvas将html渲染成canvas，然后获取图片数据
      let imgData = canvas.toDataURL('image/jpeg', 1.0);
      // console.log('canvas宽高==',canvas.width, canvas.height);
      //初始化pdf，设置相应格式：a4纸的尺寸[595.28,841.89]
      // let doc = new jsPDF("p", "mm", "a4");  //p纵向、l横向
      let doc = new jsPDF("p", "px", [canvas.width, canvas.height]);

      //这里设置的是a4纸张尺寸
      doc.addImage(imgData, 'JPG', 0, 0, canvas.width, canvas.height);
      // doc.addPage(); //增加一个新页面

      //输出保存命名为content的pdf
      doc.save('城投简报.pdf');
    }
  }).then(canvas => {
    // document.body.appendChild(canvas);
  });
}

// 主体评级echarts
function initRateEchart() {
  let rateRange = [
    'AAA+',
    'AAA',
    'AAA-',
    'AA+',
    'AA',
    'AA-',
    'A+',
    'A',
    'A-',
    'BBB+',
    'BBB',
    'BBB-',
    'BB+',
    'BB',
    'BB-',
    'B+',
    'B',
    'B-',
    'CCC',
    'CC',
    'C',
    'D',
  ];

  let seriesA = [{
    name: '2019-11-25',
    value: ['2019-11-25', "AAA"]
  },
  {
    name: '2020-02-28',
    value: ['2020-02-28', "AAA"]
  },
  {
    name: '2020-03-17',
    value: ['2020-03-17', "AAA"]
  },
  {
    name: '2020-04-16',
    value: ['2020-04-16', "AAA"]
  },
  {
    name: '2020-06-02',
    value: ['2020-06-02', "AAA"]
  },
  {
    name: '2020-06-16',
    value: ['2020-06-16', "AAA"]
  },
  {
    name: '2020-07-08',
    value: ['2020-07-08', "AAA"]
  },
  {
    name: '2020-07-30',
    value: ['2020-07-30', "AAA"]
  },
  {
    name: '2020-08-17',
    value: ['2020-08-17', "AAA"]
  },
  {
    name: '2020-09-08',
    value: ['2020-09-08', "AAA"]
  },
  {
    name: '2020-09-21',
    value: ['2020-09-21', "AAA"]
  },
  {
    name: '2020-10-10',
    value: ['2020-10-10', "AAA"]
  },
  {
    name: '2020-10-20',
    value: ['2020-10-20', "AAA"]
  },
  {
    name: '2020-11-20',
    value: ['2020-11-20', "AAA"]
  },
  {
    name: '2020-12-10',
    value: ['2020-12-10', "AAA"]
  },
  {
    name: '2020-12-24',
    value: ['2020-12-24', "AAA"]
  },
  {
    name: '2021-01-14',
    value: ['2021-01-14', "AAA"]
  },
  {
    name: '2021-02-24',
    value: ['2021-02-24', "AAA"]
  },
  {
    name: '2021-03-04',
    value: ['2021-03-04', "AAA"]
  },
  {
    name: '2021-03-11',
    value: ['2021-03-11', "AAA"]
  },
  {
    name: '2021-03-25',
    value: ['2021-03-25', "AAA"]
  },
  {
    name: '2021-04-12',
    value: ['2021-04-12', "AAA"]
  },
  ];
  let seriesB = [{
    name: '2013-07-31',
    value: ['2013-07-31', "AA+"]
  },
  {
    name: '2013-11-07',
    value: ['2013-11-07', "AA+"]
  },
  {
    name: '2014-07-14',
    value: ['2014-07-14', "AAA-"]
  },
  {
    name: '2015-06-24',
    value: ['2015-06-24', "AAA-"]
  },
  {
    name: '2018-12-10',
    value: ['2018-12-10', "AAA-"]
  },
  ];
  let seriesC = [{
    name: '2013-07-31',
    value: ['2013-07-31', "A+"]
  },
  {
    name: '2018-12-10',
    value: ['2018-12-10', "AA-"]
  },
  ];

  /* 如果需要梯形图尾端对齐，加入下面代码 */
  if (seriesA.length > 0) {
    seriesA.push({
      name: formatDate(new Date(), 'YYYY-MM-DD'),
      value: [formatDate(new Date(), 'YYYY-MM-DD'), seriesA[seriesA.length - 1].value[1]]
    });
  }
  if (seriesB.length > 0) {
    seriesB.push({
      name: formatDate(new Date(), 'YYYY-MM-DD'),
      value: [formatDate(new Date(), 'YYYY-MM-DD'), seriesB[seriesB.length - 1].value[1]]
    });
  }
  if (seriesC.length > 0) {
    seriesC.push({
      name: formatDate(new Date(), 'YYYY-MM-DD'),
      value: [formatDate(new Date(), 'YYYY-MM-DD'), seriesC[seriesC.length - 1].value[1]]
    });
  }
  // console.log('seriesA===', seriesA);
  // console.log('seriesB===', seriesB);
  /* 如果需要梯形图尾端对齐，加入上面代码 */

  var chartDom = echarts.init(document.getElementById('ratingEchart'));
  var chartOption = {
    color: ['#3986FE', '#EDB965', '#F26279', '#73E6BF', '#965EE3', '#FA7C14', '#6D7278'],
    tooltip: {
      // trigger: "axis"
    },
    legend: {
      show: true,
      bottom: 0,
      icon: 'rect',
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        fontSize: 10,
        color: 'rgba(102,102,102,1)'
      }
    },
    grid: {
      top: 20,
      left: 50,
      right: 0,
      bottom: 60,
    },
    xAxis: {
      type: 'time',
      minInterval: 1.5 * 365 * 3600 * 24 * 1000, //x坐标轴间隔
      axisLabel: {
        color: 'rgba(102,102,102,1)',
        fontSize: 10,
        formatter: '{yyyy}/{MM}/{dd}',
        // formatter: '{MM}-{dd}\n{yyyy}',
        // lineHeight: 12,
        // showMinLabel: true,
        // showMaxLabel: true,
        rotate: 20, //横坐标标签文字旋转角度
        // width: 35, //横坐标标签文字换行
        // overflow: 'breakAll'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(226,230,236,1)',
          //type: 'dashed'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(239,239,239,1)'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'rgba(239,239,239,1)'
        }
      },
      axisLabel: {
        color: 'rgba(102,102,102,1)',
        fontSize: 10
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(239,239,239,1)',
          type: 'dashed'
        }
      },
      interval: 2,
      data: rateRange.reverse()
    },
    series: [{
      data: seriesA,
      type: 'line',
      showSymbol: false,
      step: 'end', //是否是阶梯线图
      name: '联合资信'
    },
    {
      data: seriesB,
      type: 'line',
      showSymbol: false,
      step: 'end', //是否是阶梯线图
      name: '中债资信'
    },
    {
      data: seriesC,
      type: 'line',
      showSymbol: false,
      step: 'end', //是否是阶梯线图'start', 'middle', 'end'
      name: '东方资信'
    }
    ]
  };
  chartDom.setOption(chartOption);
}

// 主营构成echarts
function initBuildEchart() {
  var chartDom = echarts.init(document.getElementById('analysisEchart'));
  var colorArr = ['rgba(57,134,254,1)', 'rgba(249,210,55,1)', 'rgba(115,230,191,1)', 'rgba(242,98,121,1)',
    'rgba(53,202,202,1)'
  ];
  var chartOption = {
    color: colorArr,
    tooltip: {
      trigger: 'item',
      textStyle: {
        fontSize: 10
      },
      formatter: '{b}: {d}%'
    },
    legend: {
      show: true,
      bottom: 0,
      icon: 'rect',
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        fontSize: 10,
        color: 'rgba(108,108,108,1)'
      }
    },
    series: [{
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['50%', '40%'],
      name: '主营构成',
      itemStyle: {
        // borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        width: 50,
        formatter: '{d}%'
      },
      labelLine: {
        length: 5,
        length2: 5
      },
      data: [{
        value: 1048,
        name: '公益性',
        label: {
          color: colorArr[0]
        }
      },
      {
        value: 735,
        name: '准公益性',
        label: {
          color: colorArr[1]
        }
      },
      {
        value: 580,
        name: '经营性',
        label: {
          color: colorArr[2]
        }
      },
      {
        value: 484,
        name: '其他',
        label: {
          color: colorArr[3]
        }
      }
      ]
    }]
  };
  chartDom.setOption(chartOption);
}

// 债券融资echarts
function initBondEchart() {
  // 饼图
  var echartPie = echarts.init(document.getElementById('echartPie'));
  var colorArr = ['rgba(115,222,179,1)', 'rgba(115,160,250,1)', 'rgba(57,134,254,1)', 'rgba(249,210,55,1)',
    'rgba(115,230,191,1)'
  ];
  var pieOption = {
    color: colorArr,
    tooltip: {
      trigger: 'item',
      textStyle: {
        fontSize: 10
      },
      formatter: '{b}: {d}%'
    },
    legend: {
      show: true,
      bottom: -3,
      icon: 'rect',
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        fontSize: 10,
        color: 'rgba(108,108,108,1)'
      }
    },
    series: [{
      type: 'pie',
      // radius: ['50%', '70%'],
      center: ['50%', '45%'],
      name: '债券融资',
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        // show: false,
        // position: 'center',
        width: 50,
        formatter: '{d}%'
      },
      labelLine: {
        length: 5,
        length2: 5
      },
      data: [{
        value: 1048,
        name: '公募',
        label: {
          color: colorArr[0]
        }
      },
      {
        value: 735,
        name: '私募',
        label: {
          color: colorArr[1]
        }
      }
      ]
    }]
  };
  echartPie.setOption(pieOption);


  // 柱状图
  var echartBar = echarts.init(document.getElementById('echartBar'));
  var dataArray = [506, 282.2, 9438.55, 5600.68];
  var maxVal = Math.max(...dataArray); //获取最大值
  var yData = dataArray.map(item => {
    return {
      value: `{arrow|${item}} 亿`,
      textStyle: {
        rich: {
          arrow: {
            color: 'rgba(56,146,255,1)'
          }
        }
      }
    }
  });

  // 方法1
  /* var barOoption = {
    grid: {
      left: 40,
      right: 40,
      bottom: 10,
      top: 10,
    },
    textStyle: {
      color: '#6c6c6c',
      fontSize: 10
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: [{
        value: '{arrow|>}5年',
        textStyle: {
          rich: {
            arrow: {
              color: '#c0c0c0'
            }
          }
        }
      }, '3-5年', '1-3年', {
        value: '{arrow|<}1年',
        textStyle: {
          rich: {
            arrow: {
              color: '#c0c0c0'
            }
          }
        }
      }],
      axisLabel: {
        // 坐标轴刻度标签的相关设置。
        color: '#5C5C5C',
        fontFamily: 'PingFangSC, PingFangSC-Regular',
        fontSize: 11,
        fontWeight: 400,
      },
      maxInterval: 0,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      offset: -2,
    },
    series: [{
      type: 'bar',
      barWidth: 6,
      data: [50, 22, 100, 50],
      showBackground: true,
      backgroundStyle: {
        color: '#f0f1f2', // 柱状图背景颜色设置
        borderRadius: 3,
      },
      label: {
        show: true,
        color: '#619CFF',
        position: ['100%', -3],
        formatter: params => `${params.value}{a| 亿}`,
        rich: {
          a: {
            color: '#c0c0c0'
          }
        },
        valueAnimation: true,
      },
      labelLayout(params) {
        return {
          x: '100%',
          y: params.rect.y + params.rect.height / 2,
          verticalAlign: 'middle',
          align: 'right',
        };
      },
      itemStyle: {
        color: '#619CFF',
        borderRadius: 3,
      }
    }],
  }; */

  // 方法2
  var barOoption = {
    grid: {
      left: 50,
      right: 60,
      bottom: 10,
      top: 10,
      // containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: function (params) {
        return params[0].seriesName + ' : ' + params[0].value + ' 亿元'
      }
    },
    textStyle: {
      color: '#6c6c6c',
      fontSize: 10
    },
    xAxis: {
      show: false,
      type: 'value'
    },
    yAxis: [{
      type: 'category',
      inverse: true,
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        fontSize: 10
      },
      data: [{
        value: '{arrow|>}5年',
        textStyle: {
          rich: {
            arrow: {
              color: '#c0c0c0'
            }
          }
        }
      }, '3-5年', '1-3年', {
        value: '{arrow|<}1年',
        textStyle: {
          rich: {
            arrow: {
              color: '#c0c0c0'
            }
          }
        }
      }]
    }, {
      type: 'category',
      inverse: true,
      axisTick: 'none',
      axisLine: 'none',
      axisLabel: {
        margin: 5,
        fontSize: 10
      },
      data: yData
    }],
    series: [{
      name: '金额',
      type: 'bar',
      zlevel: 1,
      itemStyle: {
        normal: {
          barBorderRadius: 3,
          color: 'rgba(56,146,255,1)'
          // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          //     offset: 0,
          //     color: 'rgb(57,89,255,1)'
          // }, {
          //     offset: 1,
          //     color: 'rgb(46,200,207,1)'
          // }]),
        },
      },
      barWidth: 6,
      data: dataArray
    },
    {
      name: '背景',
      type: 'bar',
      barWidth: 6,
      barGap: '-100%',
      data: dataArray.map(item => maxVal),
      itemStyle: {
        normal: {
          color: '#f0f1f2',
          barBorderRadius: 3
        }
      }
    },
    ]
  };
  echartBar.setOption(barOoption);
}

// 授信额度echarts
function initCreditEchart() {
  var chartDom = echarts.init(document.getElementById('creditLineBar'));
  var barOption = {
    color: ['rgba(57,134,254,1)', 'rgba(237,185,101,1)'],
    "tooltip": {
      show: false,
      "trigger": "axis"
    },
    legend: {
      show: true,
      bottom: 0,
      icon: 'rect',
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        fontSize: 10,
        color: 'rgba(102,102,102,1)'
      }
    },
    grid: {
      top: 20,
      left: 50,
      right: 0,
      bottom: 70
    },
    textStyle: {
      color: '#6c6c6c',
      fontSize: 10
    },
    "xAxis": [{
      "type": "category",
      "splitLine": {
        "show": false
      },
      "axisTick": {
        "show": false
      },
      axisLabel: {
        rotate: 40,
        fontSize: 10
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(226,230,236,1)'
        }
      },
      "data": ['2021/1/2', '2021/1/3', '2021/1/4', '2021/1/5', '2021/1/6', '2021/1/7', '2021/1/8',
        '2021/1/9'
      ],
      splitNumber: 5
    }],
    "yAxis": [{
      "type": "value",
      // formatter: '{value}',
      // formatter(value, index) {
      //   return value;
      // },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 10
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(239,239,239,1)',
          type: 'dashed'
        }
      },
    }],
    "series": [{
      "name": "已使用",
      "type": "bar",
      "stack": "总量",
      "barWidth": 13,
      "data": [2000, 6000, 9000, 3000, 5000, 1000, 4000, 800],
    },

    {
      "name": "未使用",
      "type": "bar",
      "stack": "总量",
      "barWidth": 13,
      itemStyle: {
        normal: {
          barBorderRadius: [2, 2, 0, 0],
        },
      },
      "data": [6000, 3000, 5000, 800, 1000, 3000, 900, 2000]
    }
    ]
  };
  chartDom.setOption(barOption);
}

// 城投利差echarts
function initInvestEchart() {
  var chartDom = echarts.init(document.getElementById('echartInvestLine'));
  var chartOption = {
    color: ['rgba(237,185,101,1)'],
    legend: {
      show: false,
      bottom: 0,
      icon: 'rect',
      itemWidth: 6,
      itemHeight: 6,
      textStyle: {
        fontSize: 10,
        color: 'rgba(102,102,102,1)'
      }
    },
    grid: {
      top: 30,
      // left: 30,
      right: 0,
      bottom: 50
    },
    textStyle: {
      color: '#6c6c6c',
      fontSize: 10
    },
    xAxis: {
      axisLabel: {
        rotate: 40,
        fontSize: 10
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(226,230,236,1)',
          //type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      splitNumber: 3,
      data: ['2021/1/2', '2021/1/3', '2021/1/4', '2021/1/5', '2021/1/6', '2021/1/7', '2021/1/8', '2021/1/9'],
    },
    yAxis: {
      name: 'bp',
      type: 'value',
      nameTextStyle: {
        padding: [4, 4, 4, -18]
      },
      nameGap: 10,
      axisLabel: {
        fontSize: 10
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(239,239,239,1)',
          type: 'dashed'
        }
      },
      // interval: 2
    },
    series: [{
      data: [30.5, 40, 54.5, 85, 25.5, 74.5, 53.8, 64.5],
      type: 'line',
      showSymbol: false,
      // step: 'end', //是否是阶梯线图
      name: '城投利差'
    }]
  };
  chartDom.setOption(chartOption);
}

function formatDate(value, format, newFormat = 'YYYY-MM-DD') {
  if (!value) return '';
  if (value == '19000101') return '-';

  const time = new Date(value);
  if (isNaN(+time)) {
    const matches = format.match(/([a-zA-Z])\1{1,}/g);
    let start = 0;
    for (const match of matches) {
      if (newFormat && newFormat.indexOf(match) !== -1) {
        newFormat = newFormat.replace(new RegExp(match, 'g'), value.substr(start, match.length));
      }
      start += match.length;
    }
    return newFormat;
  } else {
    const timeMaps = {
      'Y{4}': time.getFullYear(),
      'Y{2}': time
        .getFullYear()
        .toString()
        .substr(2),
      'M{2}': time.getMonth() + 1,
      'D{2}': time.getDate(),
      'H{2}': time.getHours(),
      'm{2}': time.getMinutes(),
      's{2}': time.getSeconds(),
    };

    Object.keys(timeMaps).forEach(key => {
      timeMaps[key] = String(timeMaps[key]).padStart(2, 0);
      format = format.replace(new RegExp(key, 'g'), timeMaps[key]);
    });
    return format;
  }
}

/**
 * 文字加图片水印效果
 * id 要加水印的区域
 * watermarkImg 水印为图片的图片url
 * watermarkText 水印文字
 */

function watermarkWord(watermarkImg, watermarkText, id) {
  var doc = id ? document.getElementById(id) : document.body;
  var screenHeight = window.screen.height;
  var watermarkImg = watermarkImg || '';
  var watermarkText = watermarkText || '';

  var xr = document.createElement('div');
  xr.className = 'watermark';
  var html = '';
  var step = 180 / 480 * screenHeight;
  for (var i = 0;i <= parseInt(doc.offsetHeight / step);i++) {
    html += '<div class="item" style="top:' + step * (i) + 'px;">' + watermarkText +
      '<br /><img style="width:8em;" src="' + watermarkImg + '" /></div>';
  }
  xr.innerHTML = html;

  doc.appendChild(xr);
}

// 分页逻辑
function addPageBreak() {
  let doc = document.querySelectorAll('.echarts-page'); //获取所有可能需要分页的元素
  let index_h = document.getElementById('indexHome').offsetHeight;//封面高度
  let a4_h = 1040;  //A4纸：794×1123, 浏览器打印内容高度：588*1040, pdf插件打印内容高度：595*952

  let prev_top = 0, //上个分页节点位置
    prev_h = 0;
  doc.forEach(item => {
    let t = item.getBoundingClientRect().top,//当前节点所在位置
      h = item.offsetHeight;//当前节点内容高度
    let surplus = (t + h - index_h - prev_top) % a4_h; //取余

    if (Math.abs(surplus) < h) {
      item.classList.add("page-break-before");

      let classList = item.className;
      if (classList.indexOf('echarts-page-table') != -1) {  //分页标签在表格上面
        let tab = (h - Math.abs(surplus)) % a4_h; //取余
        if (Math.abs(tab) >= 300) { //打印时底部留白区域范围,默认半页a4纸520
          item.classList.remove("page-break-before");
        } else {
          prev_top = t - index_h;
        }
      } else {
        prev_top = t - index_h;
      }
    }
  });
}
