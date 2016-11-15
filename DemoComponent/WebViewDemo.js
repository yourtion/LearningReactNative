'use strict';

import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native';

export default class WebViewDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          injectedJavaScript={alert('Hello Yourtion !')}
          bounces={false}
          source={{ uri: 'https://blog.yourtion.com/' }}
          style={styles.webview} />
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width,
    height,
  },
});
