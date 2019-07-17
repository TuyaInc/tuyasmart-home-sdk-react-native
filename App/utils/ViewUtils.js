import React, { Component } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Image,
} from 'react-native';

export default class ViewUtils {
  /**
   * 获取设置页的Item
   * @param callBack 单击item的回调
   * @param icon 左侧图标
   * @param text 显示的文本
   * @param tintStyle 图标着色
   * @param expandableIco 右侧图标
   * @return {XML}
   */
  // static getSettingItem(callBack, icon, text, tintStyle, expandableIcon) {
  //   return (
  //     <TouchableOpacity onPress={callBack}>
  //       <View style={[styles.setting_item_container]}>
  //         <View style={{ alignItems: "center", flexDirection: "row" }}>
  //           {icon ? (
  //             <Image
  //               source={icon}
  //               resizeMode="stretch"
  //               style={[
  //                 { opacity: 1, width: 16, height: 16, marginRight: 10 },
  //                 tintStyle
  //               ]}
  //             />
  //           ) : (
  //             <View
  //               style={{ opacity: 1, width: 16, height: 16, marginRight: 10 }}
  //             />
  //           )}
  //           <Text>{text}</Text>
  //         </View>
  //         <Image
  //           source={
  //             expandableIcon
  //               ? expandableIcon
  //               : require("../../res/images/ic_tiaozhuan.png")
  //           }
  //           style={[
  //             {
  //               marginRight: 10,
  //               height: 22,
  //               width: 22,
  //               alignSelf: "center",
  //               opacity: 1
  //             },
  //             tintStyle
  //           ]}
  //         />
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }

  static getLeftButton(callBack) {
    return (
      <TouchableOpacity style={{ padding: 8 }} onPress={callBack}>
        <Image style={{ width: 15, height: 26 }} source={require('../res/images/arrow_left.png')} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
