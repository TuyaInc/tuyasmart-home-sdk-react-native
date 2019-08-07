import { SwipeableFlatList, FlatList } from 'react-native'
import React from 'react'

export default class fixSwipeadFlatList extends SwipeableFlatList {
  render(): React.Node {
    return (
      <FlatList
        {...this.props}
        ref={(ref) => {
          this._flatListRef = ref
        }}
        extradata={{
          ...this.state,
        }}
        onScroll={this._onScroll}
        renderItem={this._renderItem}
      />
    )
  }

  _onOpen(key: any): void {
    this.notification()
    this.setState({
      openRowKey: key,
    })
  }

  notification() {
    if (this.props.notification) this.props.notification()
  }
}
