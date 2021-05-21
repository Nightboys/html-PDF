export default {
  /**
   * 日期格式化，如下示例：
   * formatDate('20170101', 'YYYYMMDD', 'YYYY.MM.DD') 输出:2017.01.01
   * formatDate(Date.now(), 'YYYY-MM-DD') 输出：当前时间的格式化
   * @param value
   * @param format 源日期格式
   * @param newFormat 新日期格式
   * @returns {String}
   */
  formatDate(value, format, newFormat = 'YYYY-MM-DD') {
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
  },
  upperCase(value) {
    return value || value === 0 ? value.toString().toUpperCase() : '';
  },
  lowerCase(value) {
    return value || value === 0 ? value.toString().toLowerCase() : '';
  },
  placeholder(input, property) {
    return input === undefined || input === '' || input === null ? property : input;
  },
  truncate(value, length = 15) {
    if (!value || typeof value !== 'string') return '';
    if (value.length < length) return value;
    return value.substring(0, length) + '...';
  },
  //数字千分位并保留fixed位小数
  formatNumber(value, fixed = 2) {
    if (isNaN(parseFloat(value))) return '';
    value = parseFloat(value)
      .toFixed(fixed)
      .replace(/(\d)(?=(\d{3})+(\.\d*)?$)/g, '$1,');
    return value;
  },
  getBgColor(index) {
    let colorArray = ['#FB7171', '#FF944B', '#7686DE', '#23BFB1', '#EEB055', '#47C062'],
      i = index % 6;
    return colorArray[i];
  },
  toCompany(company, itcode) {
    if (itcode === '' || itcode === null || itcode === undefined) {
      return;
    }

    let code = itcode,
      func = 'ITCODE8TO10';

    $.getJSON(
      '/finchinaAPP/getDictData.action',
      {
        //itcode8位转itcode10位
        func,
        code,
      },
      res => {
        if (res.returncode === 0) {
          let itcode10 = res.data[0];
          location.href = 'dzh://company?type=company&name=' + company + '&code=' + itcode10;
        }
      }
    );
  },
  formatMoneyUnit(value) {
    // debugger
    if (!value) return '';

    value = parseFloat(value);
    if (value >= 10000000) {
      value = value / 100000000;
      value = value.toFixed(2);
      return value + '亿';
    } else if (value > 1000 && value < 10000000) {
      value = value / 10000;
      value = value.toFixed(2);
      return value + '万';
    } else {
      value = value.toFixed(2);
      return value;
    }
  },
};
