import React from 'react';
import { View } from 'react-native';

import _ from 'lodash';

module.exports = {
  compareVersion(v1, v2) {
    const _v1 = v1.toString().split('.');
    const _v2 = v2.toString().split('.');

    for (let i = 0; i < _v1.length || i < _v2.length; i++) {
      let n1 = parseInt(_v1[i], 10);
      let n2 = parseInt(_v2[i], 10);

      if (isNaN(n1)) {
        n1 = 0;
      }
      if (isNaN(n2)) {
        n2 = 0;
      }
      if (n1 < n2) {
        return -1;
      } if (n1 > n2) {
        return 1;
      }
    }
    return 0;
  },
  getBitValue(num, index) {
    return (num & (1 << index)) >> index;
  },
  setBitValue(num, index) {
    return num ^ (1 << index);
  },
  numberToFixed(n, c) {
    let s = `${Math.abs(n)}`;
    if (s.length < c) {
      s = '0'.repeat(c - s.length) + s;
    } else {
      s = s.slice(-c);
    }
    return n < 0 ? `-${s}` : s;
  },

  numberToFilled(n, c) {
    let s = `${Math.abs(n)}`;
    if (s.length < c) {
      s = '0'.repeat(c - s.length) + s;
    }
    return n < 0 ? `-${s}` : s;
  },

  parseJSON(str) {
    let rst;
    if (str && typeof str === 'string') {
      // 当JSON字符串解析
      try {
        rst = JSON.parse(str);
      } catch (e) {
        // 出错，用eval继续解析JSON字符串
        try {
          // eslint-disable-next-line
          rst = eval(`(${str})`)
        } catch (e2) {
          // 当成普通字符串
          rst = str;
        }
      }
    } else {
      rst = str || {};
    }

    return rst;
  },

  intToBytes(int) {
    const bytes = [];
    for (let c = 0; c < int.length; c += 2) {
      bytes.push(int.substr(c, 2));
    }
    return bytes;
  },

  bytesToInt(bytes) {
    const int = [];
    for (let i = 0; i < bytes.length; i++) {
      int.push(bytes[i].toString());
    }
    return int.join('');
  },

  hexToBytes(hex) {
    const bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
      bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
  },

  hexToBin(hex) {
    const strBin = [];
    for (let c = 0; c < hex.length; c += 2) {
      const bin = parseInt(hex.substr(c, 2), 16).toString(2);
      strBin.push(this.numberPad(bin, 8));
    }
    return strBin.join('');
  },

  binToHex(bin) {
    const strBin = bin.match(/[01]{4}/g);
    const hex = [];
    // eslint-disable-next-line
    for (const c in strBin) {
      hex.push(parseInt(strBin[c], 2).toString(16));
    }
    return hex.join('');
  },

  bytesToHex(bytes) {
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
      // eslint-disable-next-line
      hex.push((bytes[i] >>> 4).toString(16))
      // eslint-disable-next-line
      hex.push((bytes[i] & 0xf).toString(16))
    }
    return hex.join('');
  },

  decToHex(d, padding = 2) {
    const hex = Number(d).toString(16);
    return this.numberPad(hex, padding);
  },

  hexToBins(hex, padding = 8) {
    const bins = [];
    for (let c = 0; c < hex.length; c += 2) {
      const d = parseInt(hex.substr(c, 2), 16);
      let bin = Number(d).toString(2);
      while (bin.length < padding) {
        bin = `0${bin}`;
      }
      bins.push(bin);
    }
    return bins;
  },

  binsToHex(bins) {
    const hex = [];
    for (let i = 0; i < bins.length; i++) {
      const d = parseInt(bins[i], 2);
      hex.push(this.decToHex(d));
    }
    return hex.join('');
  },

  numberToHex(d) {
    if (typeof d === 'number') {
      return this.decToHex(d, d <= 255 ? 2 : 4);
    }
    return this.bytesToHex(d);
  },

  numberToBytes(d, bytes = 2) {
    return this.hexToBytes(this.decToHex(d, bytes * 2));
  },

  numberPad(num, n) {
    let len = num.toString().length;
    while (len < n) {
      // eslint-disable-next-line
      num = `0${num}`
      len += 1;
    }
    return num;
  },

  parseSec(t) {
    const h = parseInt(t / 3600, 10);
    const m = parseInt(t / 60 - h * 60, 10);
    const s = parseInt(t - h * 3600 - m * 60, 10);

    let st = '';
    if (h > 0) {
      st += `${this.numberToFixed(h, 2)}:`;
      st += `${this.numberToFixed(m, 2)}:`;
      st += this.numberToFixed(s, 2);
    } else if (m > 0) {
      st += `${this.numberToFixed(m, 2)}:`;
      st += this.numberToFixed(s, 2);
    } else if (s >= 0) {
      st += `${this.numberToFixed(s, 2)}S`;
    }

    return st;
  },

  parseTimer(t) {
    const h = parseInt(t / 3600, 10);
    const m = parseInt(t / 60 - h * 60, 10);

    return `${this.numberToFixed(h, 2)}:${this.numberToFixed(m, 2)}`;
  },

  parseTimers(t) {
    const h = parseInt(t / 3600, 10);
    const m = parseInt(t / 60 - h * 60, 10);
    const s = t % 60;

    return `${this.numberToFixed(h, 2)}:${this.numberToFixed(m, 2)}:${this.numberToFixed(s, 2)}`;
  },

  parseHour12(t) {
    const h = parseInt(t / 3600, 10);
    const m = parseInt(t / 60 - h * 60, 10);

    const st = `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${this.numberToFixed(m, 2)} ${h >= 12 ? 'PM' : 'AM'} `;
    return st;
  },

  timerToHex(t) {
    const h = parseInt(t / 3600, 10);
    const m = parseInt(t / 60 - h * 60, 10);

    return [h, m];
  },

  timerToHexs(t, limit = 0) {
    const h = this.numberToFixed(parseInt(t / 3600, 10), limit);
    const m = this.numberToFixed(parseInt(t / 60 - h * 60, 10), limit);
    const s = this.numberToFixed(t % 60, limit);

    return [h, m, s];
  },

  stringToTimer(timerString) {
    const [h, m, s] = timerString.split(':');

    return parseInt(h, 10) * 3600 + parseInt(m, 10) * 60 + (typeof s === 'undefined' ? 0 : parseInt(s, 10));
  },

  /**
   * 高低位转换位 int
   * @param  {[type]} high [description]
   * @param  {[type]} low  [description]
   * @return {[type]}      [description]
   */
  highlowToInt(high, low) {
    return low + high * 256;
  },

  /**
   * int 转换为高低位
   * @param  {[type]} d [description]
   * @return {[type]}   [description]
   */
  intToHighlow(d) {
    const h = parseInt(d / 256, 10);
    const l = d % 256;

    return [h, l];
  },

  /*
   * 分割数组
   * @param  {[type]} d    [description]
   * @param  {[type]} pNum [description]
   * @return {[type]}      [description]
   */
  arraySplit(d, pNum) {
    const pCount = Math.ceil(d.length / pNum);
    const pData = [];

    for (let i = 0; i < pCount; i++) {
      pData.push(d.slice(i * pNum, (i + 1) * pNum));
    }

    return {
      pCount,
      pData,
    };
  },
  // Taken from Underscore.js
  _isObject(obj) {
    return obj === Object(obj);
  },

  _isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },

  _isDate(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
  },

  _isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
  },

  _isBoolean(obj) {
    return Object.prototype.toString.call(obj) === '[object Boolean]';
  },

  // Performant way to determine if obj coerces to a number
  _isNumerical(obj) {
    // eslint-disable-next-line
    obj -= 0
    // eslint-disable-next-line
    return obj === obj
  },

  camelize(string) {
    if (this._isNumerical(string)) {
      return string;
    }
    // eslint-disable-next-line
    string = string.replace(/[\-_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
  },

  // dateString格式  20161122 08:00:00
  dateToTimer(dateString) {
    const date = new Date();

    date.setFullYear(dateString.substring(0, 4));
    date.setMonth(dateString.substring(4, 6) - 1);
    date.setDate(dateString.substring(6, 8));
    date.setHours(dateString.substring(9, 11));
    date.setMinutes(dateString.substring(12, 14));
    date.setSeconds(dateString.substring(15, 17));

    return Date.parse(date) / 1000;
  },

  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  dateFormat(fmt, date) {
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    // eslint-disable-next-line
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    // eslint-disable-next-line
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        // eslint-disable-next-line
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
      }
    }
    return fmt;
  },

  // eslint-disable-next-line
  formatNumber: (scale, value) => (value / Math.pow(10, scale)).toFixed(scale).toString(),

  formatValue: (values, value) => {
    const strValue = `${value}`;
    return typeof values[strValue] !== 'undefined' ? values[strValue] : strValue;
  },

  formatBitmap: (keys, values, value) => {
    for (let i = 0; i < keys.length; i++) {
      // eslint-disable-next-line
      const v = 1 << i
      // eslint-disable-next-line
      if ((v & value) !== 0) {
        return values[keys[i]] !== undefined ? values[keys[i]] : `${value}`;
      }
    }
    return '';
  },

  formatBitmapToKey: (keys, value) => {
    for (let i = 0; i < keys.length; i++) {
      // eslint-disable-next-line
      const v = 1 << i
      // eslint-disable-next-line
      if ((v & value) !== 0) {
        return keys[i];
      }
    }
    return '';
  },

  formatBitmapToLabels: (keys, values, value) => {
    // 有可能出现多个故障
    const strs = [];
    for (let i = 0; i < keys.length; i++) {
      // eslint-disable-next-line
      const v = 1 << i
      // eslint-disable-next-line
      if ((v & value) !== 0) {
        const str = values[keys[i]] !== undefined ? values[keys[i]] : `${value}`;
        strs.push(str);
      }
    }
    return strs;
  },

  formatBitmapLabel: (keys, values, value, priority) => {
    if (priority) {
      for (let i = 0; i < priority.length; i++) {
        const j = keys.indexOf(priority[i]);
        if (j === -1) continue;
        // eslint-disable-next-line
        const v = 1 << j
        // eslint-disable-next-line
        if ((v & value) !== 0) {
          return typeof keys[j] !== 'undefined' ? keys[j] : `${value}`;
        }
      }
    }

    for (let i = 0; i < keys.length; i++) {
      // eslint-disable-next-line
      const v = 1 << i
      // eslint-disable-next-line
      if ((v & value) !== 0) {
        return typeof keys[i] !== 'undefined' ? keys[i] : `${value}`;
      }
    }
    return '';
  },

  formatTime: (value) => {},

  bindFunc(func, ...arg) {
    return function (value) {
      return func(...arg, value);
    };
  },

  c2f(c) {
    return Math.round(1.8 * c + 32, 10);
  },

  f2c(f) {
    return parseInt(((f - 32) / 1.8).toFixed(0), 10);
    // return parseInt((f - 32) / 1.8, 10);
  },

  timezone() {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    const gt0 = Math.abs(offset);
    let hour = Math.floor(gt0 / 60);
    let minute = gt0 % 60;
    hour = this.numberToFixed(hour, 2);
    minute = this.numberToFixed(minute, 2);
    const strHour = `${hour}:${minute}`;
    const zone = offset > 0 ? `-${strHour}` : `+${strHour}`;
    return zone;
  },

  inMaxMin(min, max, value) {
    return Math.max(Math.min(max, value), min);
  },

  canVisible(Element) {
    return _props => (!_props.visible ? null : <Element {..._props} />);
  },

  canTouchable(Element) {
    return _props => (
      <View style={_props.disabled && { opacity: 0.4 }} pointerEvents={_props.disabled ? 'none' : 'auto'}>
        <Element {..._props} />
      </View>
    );
  },

  rangeMaxMin(start = 0, inEnd, step = 1) {
    const end = Math.floor((inEnd + step) / step) * step;

    return _.range(start, end, step);
  },
  /* eslint-disable */
  _gcd(a, b) {
    if (b === 0) {
      return a
    }
    return this._gcd(b, a % b)
  },

  _gcdEx(a, b) {
    let ref, ref1, x, y
    if (b === 0) {
      return [1, 0]
    }
    ;(ref = this._gcdEx(b, a % b)), (x = ref[0]), (y = ref[1])
    return (ref1 = [y, x - Math.floor(a / b) * y]), (x = ref1[0]), (y = ref1[1]), ref1
  },

  getSolutionOfLinearConguenceEquation(a, b, n) {
    let d, k, r, ref, s, x, x0
    if (a * b === 0) {
      return false
    }
    d = this._gcd(a, n)
    if (d % b === 0 && b !== 1) {
      ;(ref = this._gcdEx(a, n)), (r = ref[0]), (s = ref[1])
      x0 = r * (b / d)
      return (function() {
        let i, ref1, results
        results = []
        for (k = i = 0, ref1 = n; 0 <= ref1 ? i < ref1 : i > ref1; k = 0 <= ref1 ? ++i : --i) {
          if ((x = x0 + k * Math.floor(n / d) > 0)) {
            results.push(x)
          }
        }
        return results
      })().slice(0, d)
    }
    return [b]
  },

  hsvToRgb(h, s, v) {
    let r, g, b, i, f, p, q, t

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h))
    s = Math.max(0, Math.min(1, s))
    v = Math.max(0, Math.min(1, v))

    i = (this.getSolutionOfLinearConguenceEquation(1, Math.floor(h / 60), 6) || [0])[0]

    f = h / 60 - i
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    switch (i % 6) {
      case 0:
        r = v
        g = t
        b = p
        break
      case 1:
        r = q
        g = v
        b = p
        break
      case 2:
        r = p
        g = v
        b = t
        break
      case 3:
        r = p
        g = q
        b = v
        break
      case 4:
        r = t
        g = p
        b = v
        break
      case 5:
        r = v
        g = p
        b = q
        break
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  },

  rgbToHsv(r, g, b) {
    let h, s, v

    const min = Math.min(r, g, b)
    const max = Math.max(r, g, b)
    const delta = max - min
    v = max / 255.0
    if (max === 0) {
      return { h: -1, s: 0, v }
    }
    s = delta / max
    if (r === max) {
      h = (g - b) / delta
    } else if (g === max) {
      h = 2 + (b - r) / delta
    } else {
      h = 4 + (r - g) / delta
    }
    h *= 60
    if (h < 0) h += 360

    return { h: Math.round(h), s, v }
  },

  hueToRgb(p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  },

  hslToRgb(h, s, l) {
    // 360, 1.0, 1.0
    const h0 = ((h % 360 + 360) % 360) / 360
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const r = this.hueToRgb(p, q, h0 + 1 / 3)
    const g = this.hueToRgb(p, q, h0)
    const b = this.hueToRgb(p, q, h0 - 1 / 3)

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  },

  rgbToHsl(rr, gg, bb) {
    // 255, 255, 255
    let r, g, b, h, s, l, min, max

    r = parseFloat(rr) / 255
    g = parseFloat(gg) / 255
    b = parseFloat(bb) / 255

    min = Math.min(r, g, b)
    max = Math.max(r, g, b)

    l = (max + min) / 2
    if (max === min) {
      s = 0
      h = Number.NaN
    } else if (l < 0.5) s = (max - min) / (max + min)
    else s = (max - min) / (2 - max - min)

    switch (max) {
      case r:
        h = (g - b) / (max - min)
        break
      case g:
        h = 2 + (b - r) / (max - min)
        break
      case b:
        h = 4 + (r - g) / (max - min)
        break
    }

    h *= 60
    h += h < 0 ? 360 : 0

    return { h, s, l }
  },

  /* eslint-enable */

  // 自动绑定除生命周期外的所有函数
  // rcAutoBind(this);
  rcAutoBind(self, ...props) {
    const ignoreProps = [
      'constructor',
      'render',
      'componentWillMount',
      'componentDidMount',
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'componentDidUpdate',
      'componentWillUnmount',
    ];

    const ownProps = Object.getOwnPropertyNames(self.constructor.prototype);
    const toBind = props.length > 0 ? props : ownProps;
    const filteredProps = toBind.filter(item => ignoreProps.indexOf(item) < 0);
    this.autoBind(self, ...filteredProps);
  },

  // 自动绑定(无过滤)
  autoBind(self, ...props) {
    const ownProps = Object.getOwnPropertyNames(self.constructor.prototype);
    const toBind = props.length > 0 ? props : ownProps;
    toBind.forEach((key) => {
      const val = self[key];
      if (val && key !== 'constructor' && typeof val === 'function') {
        /* eslint-disable no-param-reassign */
        self[key] = val.bind(self);
      }
    });
  },
};
