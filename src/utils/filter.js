import Vue from 'vue'


Vue.filter('_orVal', function (data) {
  // console.log(data, 'val')
  return data = data ? data : '-';
  // return '1';
})
// 处理20200414 to 2020-04-14 没有值即为“-”
Vue.filter('formatdate', function (data) {
  if (data) {
    const ls = data.split('');
    ls.splice(4, 0, '-')
    // ls.splice(7, 0, '-')

    return ls.join('')
  } else {
    return '-';
  }
})
// 2021 - 01 - 20T00: 00: 00.000Z
Vue.filter('sliceFont', function (data) {
  if (data) {
    return data.split('T')[0];
  } else {
    return '-'
  }
})
// 保留两位小数
Vue.filter('tofixed2', function (data) {
  if (data) {
    if (isNaN(data)) {
      if (data.endsWith('年')) {
        return data.substring(0, data.length - 1)
      } else if (data.length > 10) {
        return data.substring(0, 10) + '...';
      } else {
        return data;
      }
    } else {
      return parseFloat(data).toFixed(2);
    }
  } else {
    return '';
  }
})
// 取首字母
Vue.filter('Initials', function (data) {
  // console.log(data);
  return data.substring(0, 1);
})


const fileTypeMap = {
  pdf: require('@/assets/images/zq_pdf.png'),
  excl: require('@/assets/images/zq_excl.png'),
  file: require('@/assets/images/zq_file.png'),
  htm: require('@/assets/images/zq_html.png'),
  ppt: require('@/assets/images/zq_ppt.png'),
  tp: require('@/assets/images/zq_tp.png'),
  txt: require('@/assets/images/zq_txt.png'),
  word: require('@/assets/images/zq_word.png'),
  zip: require('@/assets/images/zq_zip.png'),
};

Vue.filter('handlePic', function (data) {
  // console.log(data);
  if (!data || (typeof data !== 'string')) {
    return fileTypeMap['file']
  }
  let ext = data.split('.');
  let c = ext[ext.length - 1];
  // console.log(c);
  switch (c) {
    case 'pdf':
      return fileTypeMap['pdf'];
    case 'xls':
      return fileTypeMap['excl'];
    case 'xlsx':
      return fileTypeMap['excl'];
    case 'excl':
      return fileTypeMap['excl'];
    case 'csv':
      return fileTypeMap['excl'];
    case 'xlsm':
      return fileTypeMap['htm'];
    case 'html':
      return fileTypeMap['htm'];
    case 'ppt':
      return fileTypeMap['ppt'];
    case 'pptx':
      return fileTypeMap['ppt'];
    case 'tp':
      return fileTypeMap['tp'];
    case 'tif':
      return fileTypeMap['tp'];
    case 'jpg':
      return fileTypeMap['tp'];
    case 'png':
      return fileTypeMap['tp'];
    case 'tiff':
      return fileTypeMap['tp'];
    case 'bmp':
      return fileTypeMap['tp'];
    case 'jpeg':
      return fileTypeMap['tp'];
    case 'gif':
      return fileTypeMap['tp'];
    case 'txt':
      return fileTypeMap['txt'];
    case 'word':
      return fileTypeMap['word'];
    case 'doc':
      return fileTypeMap['word'];
    case 'docx':
      return fileTypeMap['word'];
    case 'dot':
      return fileTypeMap['word'];
    case 'wps':
      return fileTypeMap['word'];
    case 'zip':
      return fileTypeMap['zip'];
    case 'rar':
      return fileTypeMap['zip'];
    default:
      return fileTypeMap['file'];
  }
})
// 开发区类别码
Vue.filter('devAreaName', function (data) {
  console.log(data == 'k001')
  switch (data) {
    case 'K001':
      return '国家级经开区';
    case 'K002':
      return '国家级高新区';
    case 'K003':
      return '国家海关监管区域';
    case 'K004':
      return '国家级新区';
    case 'K005':
      return '其他国家级开发区';
    case 'K006':
      return '国家边和区';
    case 'K007':
      return '省级新区';
    case 'K008':
      return '省级开发区';
    default:
      return data;
  }
})