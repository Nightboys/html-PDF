/**
 * @author Leevare Email:liwei2@finchina.com
 * @date 2019/4/4 11:36
 * @description APP内部功能调用函数封装，更多详细配置信息介绍见SVN相关文档说明
 */
import {
  removeObjectNil
} from '@/utils/utils';
import {
  urlQueriesSerialize
} from '@/utils/urls';

/**
 * 预加载
 * @param url webview中页面的地址，相对于"https://appdev.finchina.com/finchinaAPP/"路径下
 */
export const appPreLoad = url => {
  location = `https://ari.finchina.com/finchinaAPP/OpenLeftDraw?link=${encodeURIComponent(url)}`;
};

/* eslint-disable */
/**
 * 展开左侧嵌套webview，同左侧树菜单
 * @param {String} url webview中页面的地址，相对于"https://appdev.finchina.com/finchinaAPP/"路径下
 */
export const appOpenLeftWindow = url => {
  try {
    window.jsi.isShowSideslip(url, true);
  } catch (e) {}
  try {
    webkit.messageHandlers.isShowSideslip.postMessage({
      url: url,
      isShow: true,
    });
  } catch (e) {}
};

export const getAppFrom = () => {
  let appFrom = window.appType;

  try {
    appFrom = window.jsi.getAppType();
  } catch (e) {}

  return appFrom;
};

/**
 * 头部收缩与展开
 * @param {Boolean} isCollapse 是否收起 true：收起，false：展开
 */
export const appCollapse = isCollapse => {
  try {
    webkit.messageHandlers.setStick.postMessage(isCollapse);
  } catch (e) {}
  try {
    window.jsi.setStick(isCollapse);
  } catch (e) {}
};
/* eslint-enable */

/**
 * app弹窗
 * @param {String} title 标题
 * @param {String} message 描述文字
 * @param {String} okname 确定按钮文字
 * @param {String} cancelname 取消按钮名字
 * @param {String} oklink 确认事件链接
 * @param {String} cancellink 取消事件链接
 */
export const appAlert = ({
  title,
  message,
  okname,
  cancelname,
  oklink,
  cancellink
} = {}) => {
  location = `fcnews://alert${urlQueriesSerialize(
    removeObjectNil({
      title,
      message,
      okname,
      cancelname,
      oklink,
      cancellink,
    })
  )}`;
};

/**
 * * 组合web页面
 * @param {String} title 页面标题
 * @param {String} subTitle 页面子标题
 * @param {String} placeholder 搜索框的placeholder
 * @param {Array} datas 页面数组
 * [
 *   {url: "test0.html",  "name": "test0"},
 *   {"url": "test1.html",  "name": "test1"}
 * ]
 * 打开页面时，会把user, token以url参数的形式传给页面
 * @param {Number} selectedIndex 默认选中的页面索引
 * @param {Number} hideTopView （默认是0）	是否隐藏topView
 * @param {Number} hideSearch （默认是1）  是否隐藏搜索框
 * @param {String} searchResultLink 如果有搜索框，传值不为空时，搜索内容时，会弹出此页面，作为键盘宝页面，点击键盘宝页面搜索结果，传参给主页面。
 * @param {String} helpLink 帮助链接
 */
export const appCombinePage = ({
  title,
  subTitle,
  placeholder,
  datas,
  selectedIndex,
  hideTopView = 0,
  hideSearch = 1,
  searchResultLink,
  helpLink,
} = {}) => {
  location = `fcnews://websPage?${urlQueriesSerialize(
    removeObjectNil({
      title,
      subTitle,
      placeholder,
      datas: datas ? encodeURIComponent(JSON.stringify(datas)) : null,
      selectedIndex,
      hideSearch,
      hideTopView,
      searchResultLink,
      helpLink,
    })
  )}`;
};

/**
 * 组合web页面集合
 * @param {Number} index 选中的索引
 * @param {Array} datas 页面数组(和组合web页面数据结构一致)
 */
export const appCombinePages = (index, datas = []) => {
  location = `fcnews://websPageGroup?selectedIndex=${index}&datas=${encodeURIComponent(JSON.stringify(datas))}`;
};

/**
 * 选中页面搜索结果
 * @param {String} text searchBar展示文字
 * @param result 回传给页面的搜索关键词
 */
export const appSelectSearchResult = (text, result) => {
  location = `fcnews://searchSelectedHandler?${urlQueriesSerialize(removeObjectNil({ text, result }))}`;
};

/**
 * 研究报告
 * @param {String} seminarCodes 研究报告分类组合id，可为空，为空时跳转到研究报告主页面
 */
export const appResearchReport = (seminarCodes = '') => {
  location = `fcnews://researchReport?seminarCodes=${seminarCodes}`;
};

// 扫描二维码
export const appScanQRCode = () => {
  location = 'fcnews://qrcodeScan';
};

/**
 * 打开网页
 * @param {String} link 页面地址，打开页面标题为网页的标题
 */
export const appOpenPage = (link = '') => {
  location = `fcnews://webviewPage?link=${link}`;
};

// 原生搜索框内容
export const appSetSearchBarText = (text = '') => {
  location = `fcnews://setSearchBarText?text=${text}`;
};

// 意见反馈
export const appFeedback = (txt = '') => {
  location = `fcnews://chat/feedback?text=${txt}`;
};

// 签到
export const appCheckIn = () => {
  location = 'https://ari.finchina.com/finchinaAPP/checkIn';
};

// 搜新闻
export const appSearchNews = () => {
  location = 'https://ari.finchina.com/finchinaAPP/newsSearch';
};

// 搜公告
export const appSearchAnnouncement = () => {
  location = 'https://ari.finchina.com/finchinaAPP/noticeSearch';
};

// 查关系
export const appSearchRelationship = () => {
  location = 'https://ari.finchina.com/finchinaAPP/relationshipSearch';
};

// 查受益所有人
export const appSearchBeneficiary = () => {
  location = 'https://ari.finchina.com/finchinaAPP/profitSearch';
};

// 版本检测
export const appCheckVersion = () => {
  location = 'https://ari.finchina.com/finchinaAPP/checkLasterVersion';
};

/* eslint-disable */
// 获取原始版本号，如v3.4.1
export const appGetVersion = () => {
  let appVersion = window.appVersion;
  try {
    appVersion = window.jsi.appVersion();
  } catch (e) {}
  return appVersion;
};
/* eslint-enable */

// 获取版本号数值，如3.41
export const appGetVersionNumber = () => {
  let versionNumber;
  if (this.appVersion) {
    let version = this.appVersion.replace(/[a-zA-Z]*(.+)/, '$1');
    const index = version.indexOf('.');
    if (index > -1) {
      version = version.substring(0, index) + '.' + version.substr(index).replace(/\./g, '');
    }
    versionNumber = parseFloat(version);
  }
  return versionNumber && !Number.isNaN(versionNumber) ? versionNumber : 0;
};

/* eslint-disable */
//发送当前查询后台接口参数至APP
export const sendCondition = condition => {
  let strCondtion = JSON.stringify(condition);
  try {
    window.jsi.downloadCondition(strCondtion);
  } catch (e) {}
  try {
    webkit.messageHandlers.downloadCondition.postMessage(strCondtion);
  } catch (e) {}
};
/* eslint-enable */

//隐藏/显示全屏回退按钮
export const hideBackBtn = hide => {
  /* eslint-disable */
  try {
    window.jsi.needHideBackBtn(hide);
  } catch (e) {}
  try {
    webkit.messageHandlers.needHideBackBtn.postMessage(hide);
  } catch (e) {}
  /* eslint-disable */
};

//跳转到f9对应公司或个人
export const goToF9Detail = ({
  name,
  id,
  type
}) => {
  location.href = `fcnews://item?id=${id}&type=${type}&name=${name}`;
};

//红点舆情
export const redNews = (redNewList, code) => {
  location.href = `fcnews://itemsNews?codes=${JSON.stringify(redNewList)}&selectedCode=${code}`;
};

/*
app中f9页面跳转
url参考  https://192.168.100.188/svn/FC_APP/开发相关/配置/F9树配置.xls
如 'https://ari.finchina.com/finchinaAPP/f9/companyTree/3000/3017/3018?type=company&code=5435433543'
 */

/*个人中心分享出去的黄金权限页面点击立即领取回填邀请码，邀请码invitecode需要原生捕获后加在url上获取，
如：window.location =
  (this.isIOS9() ? 'https' : 'fcnews') +
  '://ari.finchina.com/finchinaAPP/personal_center/receiveGold?invitecode=AE46TZ15&&channelCode=1'
 */

/*个人中心至尊权限分享出去的钻石权限页面点击立即领取回填尊享卡密码，尊享卡密码password，
卡是体验卡还是尊享卡的cardType（supreme||experiment）需要原生捕获后加在url上获取，
如：window.location =
        (this.isIOS9() ? 'https' : 'fcnews') +
        '://ari.finchina.com/finchinaAPP/personal_center/share?password=12RE67ahTY89H4ds&cardType=supreme&channelCode=1';
 */

/*app活动分享
 *jumpPage,要跳转页面的相对地址，如：receiveGiftDiamond.html
 *shareTypes，分享类型，如：qq,wechat,copylink,dingding,browser,wechatgroup
 * title，活动分享出去在第三方软件展示的标题
 * content，活动分享出去在第三方软件展示的内容
 */
export const shareActivity = opts => {
  opts = Object.assign({
      url: location.href,
      image: 'https://app.finchina.com/finchinaAPP/static/logo.png',
      title: '企业预警通-给你最省心的风控体验',
      content: '看预警信息，用企业预警通。数十万金融专业人士都在用的App',
    },
    opts
  );
  let shareInfo = `dzh://shareActivity?url=${encodeURIComponent(opts.url)}&image=${opts.image}&title=${
    opts.title
  }&content=${opts.content}`;

  if (opts.shareTypes) shareInfo += `&shareInfo=${opts.shareTypes}`;

  return shareInfo;
};

// export const shareActivity = (jumpPage, shareTypes, otherParams, title, content) => {
//   let arr = location.href.split('/');
//   arr.pop();
//   arr.push(jumpPage);
//
//   let shareInfo =
//     'dzh://shareActivity?shareTypes=' +
//     shareTypes +
//     '&url=' +
//     encodeURIComponent(arr.join('/') + '?' + otherParams) +
//     '&image=' +
//     encodeURIComponent(location.origin + '/finchinaAPP/static/logo.png') +
//     '&title=' +
//     title +
//     '&content=' +
//     content;
//
//   return shareInfo;
// };

//原生弹窗，框内图标是小图标
export const appModalAlert1 = ({
  title = '',
  iconUrl = '',
  message = '',
  buttons = []
}) => {
  const str = JSON.stringify({
    title,
    iconUrl,
    message,
    buttons
  });
  try {
    webkit.messageHandlers.Alert1.postMessage(str);
  } catch (e) {}
  try {
    window.jsi.Alert1(str);
  } catch (e) {}
};

//原生弹窗，框内图标是大图标
export const appModalAlert2 = ({
  title = '',
  iconUrl = '',
  message = '',
  buttons = []
}) => {
  const str = JSON.stringify({
    title,
    iconUrl,
    message,
    buttons
  });
  try {
    webkit.messageHandlers.Alert2.postMessage(str);
  } catch (e) {}

  try {
    window.jsi.Alert2(str);
  } catch (e) {}
};

// 设置web组件标题栏效果
export const setTitleBar = str => {
  try {
    webkit.messageHandlers.setTitleBar.postMessage(str);
  } catch (e) {}
  try {
    window.jsi.setTitleBar(str);
  } catch (e) {}
};

/* eslint-disable */
/**
 * 设置标题
 * @param str 为标题名称
 */
export const setTitle = str => {
  let title = str;
  if (typeof str === 'Object') title = str.title + (str.subTitle ? ` ${str.subTitle}` : '');

  document.getElementsByTagName('title')[0].innerHTML = title;
  try {
    webkit.messageHandlers.setTitle.postMessage(str);
  } catch (e) {}
  try {
    window.jsi.setTitle(str);
  } catch (e) {}
};
/* eslint-enable */

/* eslint-disable */
//android 获取状态栏高度
export const statusBarHeight = () => {
  let result = 0;
  try {
    result = parseFloat(window.jsi.statusBarHeight()) / window.devicePixelRatio;
  } catch (e) {}

  return result;
};
//android 获取标题栏高度
export const getTitleBarHeight = () => {
  let result = 0;
  try {
    result = parseFloat(window.jsi.getTitleBarHeight()) / window.devicePixelRatio;
  } catch (e) {}

  return result;
};
/* eslint-enable */

//跳转到查关系页面
export const gotoRelationLink = ({
  from,
  to,
  fromType,
  toType
}) => {
  location = `fcnews://relationshipMap?from=${from}&fromtype=${fromType}&to=${to}&totype=${toType}`;
};

/* eslint-disable */
/**
 * 设置是否禁用app上推效果
 * @param str 为标题名称
 */
export const forbidAppPushUp = isForbid => {
  try {
    webkit.messageHandlers.forbidScroll.postMessage(isForbid);
  } catch (e) {}
  try {
    window.jsi.forbidScroll(isForbid);
  } catch (e) {}
};
/* eslint-enable */

/* eslint-disable */
//发送超长参数至APP，解决传递超长字符串的问题
export const queryClob = data => {
  Object.assign({
      method: 'post',
      callback: 'callback',
      url: '',
      params: {},
    },
    data
  );

  let dataStr = JSON.stringify(data);

  try {
    window.jsi.request(dataStr);
  } catch (e) {}
  try {
    webkit.messageHandlers.request.postMessage(dataStr);
  } catch (e) {}
};
/* eslint-enable */



// 设置顶部右侧菜单
export const setRightMenu = str => {
  try {
    // h5发送ios
    webkit.messageHandlers.setRightMenu.postMessage(str);
  } catch (e) {}
  try {
    // h5发送给Android
    window.jsi.setRightMenu(str);
  } catch (e) {}
};
/* eslint-enable */

// 判断当前app的系统版本类型哦 --！
export const judgeSystemType = () => {
  let isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isIOS) {
    return 'ios'
  } else {
    return 'android'
  }

}

// 判断是否为iphoneX
export const iphoneX = () => {
  return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
}
