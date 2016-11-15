'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  AlertIOS,
  ActionSheetIOS,
} from 'react-native';

class AlertIOSView extends Component {

  render() {
    return (
      <View style={styles.flex}>
        <Text style={styles.item} onPress={this._tip}>提示对话框</Text>
        <Text style={styles.item} onPress={this._input}>输入对话框</Text>
      </View>
    );
  }

  _tip() {
    AlertIOS.alert('提示', 'Yourtion 学习 ReactNative', [
      { text: '取消', onPress: () => alert('你点击了取消') },
      { text: '确认', onPress: () => alert('你点击了确认') },
    ]);
  }

  _input() {
    AlertIOS.prompt('提示', 'Yourtion 学习 ReactNative', [
      { text: '取消', onPress: () => alert('你点击了取消') },
      { text: '确认', onPress: (e) => alert(e) },
    ]);
  }
}

class ActionSheetIOSView extends Component {

  render() {
    return (
      <View style={styles.flex}>
        <Text style={styles.item} onPress={this._tip}>showActionSheetWithOptions</Text>
        <Text style={styles.item} onPress={this._share}>Show ShareActionSheet with Options</Text>
      </View>
    );
  }

  _tip() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [ '拨打电话', '发送邮件', '发送短信', '取消' ],
        cancelButtonIndex: 3,
        destructiveButtonKey: 0,
      },
      (index) => alert(index)
    );
  }

  _share() {
    ActionSheetIOS.showShareActionSheetWithOptions(
      {
        url: 'http://demo.yourtion.com',
      },
      (err) => alert(err),
      (e) => alert(e)
    );
  }
}

export default class IOSAPIDemo extends Component {
  render() {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.container}>
          <AlertIOSView />
          <ActionSheetIOSView />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text> Android is not support !</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    borderColor: '#DDD',
  },
});
