import indexdata from './data/IndexData';
import moredata from './data/moreData'
// import moredata from './data/IndexData';
// import indexdata from './data/moreData'
let menus = [
  {
    name: '地区',
    type: 'columnThird',
    extraClass: 'special',
    list: [],
    selectAll: false,
    selectName: ''
  },
  // indexdata,
  // moredata
  moredata,//指标
  indexdata,//更多

]

export { menus };