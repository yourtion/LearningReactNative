'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AlertIOS,
} from 'react-native';

class AlertIOSView extends Component {

  render() {
    return (
      <View style={styles.flex}>
        <Text style={styles.item} onPress={this._tip}>提示对话框</Text>
        <Text style={styles.item} onPress={this._input}>输入对话框</Text>
      </View>
    )
  }

  _tip() {
    AlertIOS.alert('提示', 'Yourtion 学习 ReactNative', [
      {text: '取消', onPress:() =>alert("你点击了取消")},
      {text: '确认', onPress:() =>alert("你点击了确认")},
    ]);
  }

  _input() {
    AlertIOS.prompt('提示', 'Yourtion 学习 ReactNative', [
      {text: '取消', onPress:() =>alert("你点击了取消")},
      {text: '确认', onPress:(e) =>alert(e)},
    ]);
  }
}

export default class IOSAPIDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AlertIOSView />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 25,
  },
  flex: {
    flex: 1,
    margin: 5,
  },
  item: {
    padding: 5,
    margin: 5,
    height: 30,
    borderWidth: 1,
    borderColor: '#DDD'
  },
});
