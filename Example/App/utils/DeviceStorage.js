import React, { AsyncStorage } from 'react-native';

export const FIRSTLOADGUIDE = 'firstLoadGuide';
export const CONDITION = 'condition';
export const CITY = 'city';
class DeviceStorage {
  /**
   * 获取
   * @param key
   * @returns {Promise<T>|*|Promise.<TResult>}
   */

  static get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }

  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key, value) {
    return DeviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  static saveUserInfo(phone, password, countryCode) {
    return this.save('userInfo', JSON.stringify({ phone, password, countryCode })).catch(error => console.log(error));
  }

  static getUserInfo() {
    return this.get('userInfo');
  }

  /**
   * 更新
   * @param key
   * @returns {*}
   */
  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}

export default DeviceStorage;
