'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class RequestDemo extends Component {
  render() {
    return (
      <View>
        <Text
          onPress={this._doXMLHttpRequest}
          style={styles.btn}>
          XMLHttpRequest请求数据
        </Text>

        <Text
          onPress={this._doFetch}
          style={styles.btn}>
          Fetch请求数据
        </Text>
      </View>
    );
  }

  _doXMLHttpRequest() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        alert('success' + request.responseText);
      } else {
        alert('error');
      }
    };

    request.open('GET', 'https://www.baidu.com/');
    request.send();
  }

  _doFetch() {
    fetch('https://www.baidu.com/')
      .then((data) => { return data.text(); })
      .then(alert).catch(alert);
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    height: 35,
    backgroundColor: '#3BC1FF',
    color: '#FFF',
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
