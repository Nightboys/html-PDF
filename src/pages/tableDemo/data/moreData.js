export default {
  name: '指标', //顶部标题 为空或无时 只做占位使用
  // type: 'multiOption', //模板类型
  type: 'equalMultiOption', //模板类型
  extraClass: '', //顶部标题自定义class 可选/blue
  // disabled: true,     //是否禁用
  showName: '', //强制显示名称
  list: [
    {
      name: '经济',
      list: [
        {
          name: 'GDP',
          value: 'GDP',
          unit: '(亿元)',
          selected: true
        },
        {
          name: 'GDP增速',
          value: 'GDP增速',
          unit: '(%)',
        },
        {
          name: '第一产业',
          value: '第一产业',
          unit: '(亿元)',
        },
        {
          name: '第二产业',
          value: '第二产业',
          unit: '(亿元)',
        },
        {
          name: '第三产业',
          value: '第三产业',
          unit: '(亿元)',
        },
        {
          name: '固定资产投资',
          value: '固定资产投资',
          unit: '(亿元)',
          selected: true
        },
        {
          name: '固定资产投资增速',
          value: '固定资产投资增速',
          unit: '(%)',
        },
        {
          name: '进出口总额',
          value: '进出口总额',
          unit: '(亿元)',
        },
        {
          name: '进口额',
          value: '进口额',
          unit: '(亿元)',
        },
        {
          name: '出口额',
          value: '出口额',
          unit: '(亿元)',
        },
        {
          name: '工业增加值',
          value: '工业增加值',
          unit: '(亿元)',
        },
        {
          name: '工业总产值',
          value: '工业总产值',
          unit: '(亿元)',
          selected: true
        },
        {
          name: '社会消费品零售总额',
          value: '社会消费品零售总额',
          unit: '(亿元)',
        },
        {
          name: '社会消费品零售总额增速',
          value: '社会消费品零售总额增速',
          unit: '(%)',
          selected: true
        },
        {
          name: '户籍人口',
          value: '户籍人口',
          unit: '(亿元)',
        },
        {
          name: '常住人口',
          value: '常住人口',
          unit: '(亿元)',
        },
      ]
    },
    {
      name: '财政',
      list: [
        {
          name: '一般公共预算收入',
          value: '一般公共预算收入',
          unit: '(亿元)',
          selected: true
        },
        {
          name: '一般公共预算收入增速',
          value: '一般公共预算收入增速',
          unit: '(%)',
        },
        {
          name: '转移支付收入',
          value: '转移支付收入',
          unit: '(亿元)',
        },
        {
          name: '一般性转移支付',
          value: '一般性转移支付',
          unit: '(亿元)',
        },
        {
          name: '专项转移支付',
          value: '专项转移支付',
          unit: '(亿元)',
        },
        {
          name: '税收收入',
          value: '税收收入',
          unit: '(亿元)',
        },
        {
          name: '转移性收入',
          value: '转移性收入',
          unit: '(亿元)',
        },
        {
          name: '一般公共预算支出',
          value: '一般公共预算支出',
          unit: '(亿元)',
          selected: true
        },
        {
          name: '政府性基金收入',
          value: '政府性基金收入',
          unit: '(亿元)',
        },
        {
          name: '土地出让收入',
          value: '土地出让收入',
          unit: '(亿元)',
        },
        {
          name: '政府性基金支出',
          value: '政府性基金支出',
          unit: '(亿元)',
        },
        {
          name: '国有资本经营收入',
          value: '国有资本经营收入',
          unit: '(亿元)',
        },
        {
          name: '国有资本经营支出',
          value: '国有资本经营支出',
          unit: '(亿元)',
        }
      ]
    },
    {
      name: '债务',
      list: [
        {
          name: '地方政府债务余额',
          value: '地方政府债务余额',
          unit: '(亿元)',
        },
        {
          name: '地方政府债务限额',
          value: '地方政府债务限额',
          unit: '(亿元)'
        },
        {
          name: '财政自给率',
          value: '财政自给率',
          unit: '(%)'
        },
        {
          name: '负债率',
          value: '负债率',
          unit: '(%)'
        },
        {
          name: '负债率（宽口径）',
          value: '负债率（宽口径）',
          unit: '(%)'
        },
        {
          name: '债务率',
          value: '债务率',
          unit: '(%)'
        },
        {
          name: '债务率（宽口径）',
          value: '债务率（宽口径）',
          unit: '(%)'
        },
      ]
    },
    {
      name: '产业发展',
      list: [
        {
          name: '外商实际投资',
          value: '外商实际投资',
          unit: '(亿元)'
        },
        {
          name: '外商实际投资增速',
          value: '外商实际投资增速',
          unit: '(%)'
        },
        {
          name: '高新技术企业产值',
          value: '高新技术企业产值',
          unit: '(亿元)'
        },
        {
          name: '高新技术企业产值增速',
          value: '高新技术企业产值增速',
          unit: '(%)'
        },
        {
          name: '合同外资金额',
          value: '合同外资金额',
          unit: '(亿元)'
        },
        {
          name: '规模以上企业数',
          value: '规模以上企业数',
          unit: '(亿元)'
        },
        {
          name: '世界500强企业数',
          value: '世界500强企业数',
          unit: '(亿元)'
        },
        {
          name: '新批企业数',
          value: '新批企业数',
          unit: '(亿元)'
        },
        {
          name: '新批内资企业数',
          value: '新批内资企业数',
          unit: '(亿元)'
        },
        {
          name: '新批外商及港澳台企业数',
          value: '新批外商及港澳台企业数',
          unit: '(亿元)'
        },
        {
          name: '上市企业数',
          value: '上市企业数',
          unit: '(亿元)'
        },
        {
          name: '年末从业人员',
          value: '年末从业人员',
          unit: '(亿元)'
        },
        {
          name: '科学研究与试验发展经费支出',
          value: '科学研究与试验发展经费支出',
          unit: '(亿元)'
        },
        {
          name: '创业创新平台数量',
          value: '创业创新平台数量',
          unit: '(亿元)'
        },
        {
          name: '销售（营业）收入',
          value: '销售（营业）收入',
          unit: '(亿元)'
        },
        {
          name: '利润总额',
          value: '利润总额',
          unit: '(亿元)'
        }
      ]
    },
    {
      name: '基本信息',
      list: [
        {
          name: '成立年份',
          value: 'CR0231_015',
          unit: '',
          basic: 'basic',
          selected: true
        },
        {
          name: '主导产业',
          value: 'CR0231_018',
          unit: '',
          basic: 'basic',
          selected: true
        },
        {
          name: '管辖面积',
          value: 'CR0231_017',
          unit: '(平方公里)',
          basic: 'basic',
        },
        {
          name: '开发区类别',
          value: 'CR0231_021',
          unit: '',
          basic: 'basic',
        },
        {
          name: '核准面积',
          value: 'CR0231_016',
          unit: '(公顷)',
          basic: 'basic',
        },
      ]
    }
  ],
};

// { String } includes 指定返回的字段，用于指定"基本信息"的筛选
// (CR0231_015 - 成立时间(默认返回), 
// CR0231_018 - 主导产业(默认返回), 
// CR0231_016 - 核准面积, 
// CR0231_017 - 管辖面积, 
// CR0231_021 - 开发区大类)