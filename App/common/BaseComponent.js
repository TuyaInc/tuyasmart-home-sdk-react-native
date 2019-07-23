import React, {Component} from 'react'
import {View, StyleSheet, StatusBar} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Toast from 'react-native-root-toast'
import ToastUtils from '../utils/ToastUtils'

export default class BaseComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  showToast(text) {
    ToastUtils.toast(text, Toast.positions.CENTER)
  }

  showToastBottom(text) {
    ToastUtils.toast(text, Toast.positions.BOTTOM)
  }

  showToastTop(text) {
    ToastUtils.toast(text, Toast.positions.TOP)
  }

  startLoading() {
    this.setState({
      loading: true,
    })
  }

  //可能存在关闭无效的bug
  stopLoading(time=500) {
    this.loadingTimetout&&clearTimeout(this.loadingTimetout)
    this.loadingTimetout = setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, time)
  }

  renderHeaderView() {
    return <View/>
  }

  renderContent() {
    return <View/>
  }

  renderExpendView() {
    return <View/>
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Spinner visible={this.state.loading} cancelable={true}/>
        {this.renderHeaderView()}
        {this.renderContent()}
        {this.renderExpendView()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
