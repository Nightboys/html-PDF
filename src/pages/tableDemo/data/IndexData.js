export default {
  name: '更多', //顶部标题 为空或无时 只做占位使用
  // type: 'multiOption', //模板类型
  type: 'equalMultiOption', //模板类型
  extraClass: '', //顶部标题自定义class 可选/blue
  // disabled: true,     //是否禁用
  showName: '', //强制显示名称
  list: [
    {
      name: '开发区类别',
      list: [
        {
          name: '国家级经开区',
          value: 'K001',
          selected: true
        },
        {
          name: '国家级高新区',
          value: 'K002',
          selected: true
        },
        {
          name: '国家海关监管区域',
          value: 'K003',
          selected: true
        },
        {
          name: '国家级新区',
          value: 'K004',
          selected: true
        },
        {
          name: '其他国家级开发区',
          value: 'K005',
          selected: true
        },
        {
          name: '国家边和区',
          value: 'K006',
          selected: true
        },
        {
          name: '省级新区',
          value: 'K007',
          selected: true
        },
        {
          name: '省级开发区',
          value: 'K008',
          selected: true
        },
      ]
    },
    {
      name: '年份',
      single: true,       //只能单选
      hasSelectAll: false,  //取消全选配置
      list: [
        // {
        //   name: '2020',
        //   value: '2020',
        // },
        // {
        //   name: '2019',
        //   value: '2019',
        //   // selected: true
        // },
        // {
        //   name: '2018',
        //   value: '2018',
        // },
        // {
        //   name: '2017',
        //   value: '2017',
        // }
      ]
    },
  ],
};