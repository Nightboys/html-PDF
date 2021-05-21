// import {debounce} from 'lodash';

export default {
  resize(designWidth = 750) {
    function changeView() {
      let width = document.body.clientWidth || document.documentElement.clientWidth,
        height = document.body.clientHeight || document.documentElement.clientHeight;
      // if (width > height) width = height;

      // if (width < 320) {
      //     let screen = window.screen;
      //     width = screen[screen.width > screen.height ? 'height' : 'width'];
      //     if (width < 320) width = 320;
      // }

      //if (width > 750) width = 750;

      document.getElementsByTagName('html')[0].style.setProperty('font-size', (100 * width) / designWidth + 'px');
      document.getElementsByTagName('body')[0].style.setProperty('visibility', 'visible');
    }

    let ev = 'orientationchange' in window ? 'orientationchange' : 'resize';

    if (document.addEventListener) {
      window.addEventListener(ev, changeView, false);
    } else if (document.attachEvent) {
      window.attachEvent(ev, changeView);
    } else {
      window['on' + ev] = changeView;
    }
    changeView();
  },
  replaceSepcialTxt(txt) {
    let specialArr = '$()*+.[]?^{}|'.split(''),
      results = [];
    txt.split('').forEach(s => {
      results.push(specialArr.indexOf(s) == -1 ? s : '\\' + s);
    });

    return results.join('');
  },
  //移动端滚动处理，解决移动端滚动穿透,应用于蒙层且蒙层内有滚动
  smartScrolls(container, selectorScrollable) {
    //传入的参数为选择器字符串
    // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略

    if (!selectorScrollable || this.isBindScroll) {
      return;
    }
    // 是否是搓浏览器
    // 自己在这里添加判断和筛选
    let isSBBrowser;

    let data = {
      posY: 0,
      maxscroll: 0,
    };

    // 事件处理
    $(container).on('touchstart', function (event) {
      let events = event.touches[0] || event;

      // 先求得是不是滚动元素或者滚动元素的子元素
      let elTarget = $(event.target);

      if (!elTarget.length) {
        return;
      }

      let elScroll;
      // 获取标记的滚动元素，自身或子元素皆可
      if (elTarget === $(selectorScrollable)) {
        elScroll = elTarget;
      } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
        elScroll = null;
      }
      if (!elScroll) {
        return;
      }

      // 当前滚动元素标记
      data.elScroll = elScroll;

      // 垂直位置标记
      data.posY = events.pageY;
      data.scrollY = elScroll.scrollTop();
      // 是否可以滚动
      data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
    });
    $(container).on('touchmove', function (event) {
      // 如果不足于滚动，则禁止触发整个窗体元素的滚动
      if (data.maxscroll <= 0 || isSBBrowser) {
        // 禁止滚动
        event.preventDefault();
      }
      // 滚动元素
      let elScroll = data.elScroll;
      if (!elScroll) {
        return;
      }
      // 当前的滚动高度
      let scrollTop = elScroll.scrollTop();

      // 现在移动的垂直位置，用来判断是往上移动还是往下
      let events = event.touches[0] || event;
      // 移动距离
      let distanceY = events.pageY - data.posY;

      if (isSBBrowser) {
        elScroll.scrollTop(data.scrollY - distanceY);
        elScroll.trigger('scroll');
        return;
      }

      // 上下边缘检测
      if (distanceY > 0 && scrollTop == 0) {
        // 往上滑，并且到头
        // 禁止滚动的默认行为
        event.preventDefault();
        return;
      }

      // 下边缘检测
      if (distanceY < 0 && scrollTop + 1 >= data.maxscroll) {
        // 往下滑，并且到头
        // 禁止滚动的默认行为
        event.preventDefault();
        return;
      }
    });
    $(container).on('touchend', function () {
      data.maxscroll = 0;
    });
    // 防止多次重复绑定
    this.isBindScroll;
  },
  bindScrollEvt() {
    let body = document.getElementsByTagName('body')[0];
    // , currentScroll = false
    // , resizing = false, stopScrollHandler = false;

    $(window).on('scroll', () => {
      try {
        window.jsi.setStick(body.scrollTop > 0);
      } catch (e) { }

      try {
        webkit.messageHandlers.setStick.postMessage(body.scrollTop > 0);
      } catch (e) { }
    });
  },
  getAppFrom() {
    let appFrom = window.appType;

    try {
      appFrom = window.jsi.getAppType();
    } catch (e) { }

    return appFrom;
  },
  addWaterMark(size = 750) {
    let appFrom = this.getAppFrom();
    if (appFrom && appFrom !== 'finchina') return;

    let waterMark = document.createElement('img');

    waterMark.style.cssText = 'position: fixed; z-index: -1; bottom: .36rem; right: .36rem; opacity: 0.0001;';
    waterMark.src = location.origin + '/finchinaAPP/static/waterMark.png';

    document.getElementsByTagName('body')[0].appendChild(waterMark);

    let rate = size / 750;
    waterMark.onload = function () {
      waterMark.style.cssText =
        'position: fixed; z-index: 9; bottom: ' +
        0.36 * rate +
        'rem; right: ' +
        0.36 * rate +
        'rem; opacity: 0.5;' +
        ' width: ' +
        (waterMark.naturalWidth / 100) * rate +
        'rem; height: ' +
        (waterMark.naturalHeight / 100) * rate +
        'rem;';
    };
  },
};
