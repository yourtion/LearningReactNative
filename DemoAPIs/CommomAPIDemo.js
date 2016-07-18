'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
} from 'react-native';

class PixelRatioView extends Component {

  render() {
    return (
      <View style={styles.flex}>
        <Text>PixelRatio Demo :</Text>
        <View style={styles.prv_1}></View>
        <View style={styles.prv_2}></View>
      </View>
    )
  }
}

export default class IOSAPIDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PixelRatioView />
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
  prv_1:{
    borderWidth: 1,
    borderColor: 'red',
    height: 40,
    marginBottom: 20,
  },
  prv_2:{
    borderWidth: 1/PixelRatio.get(),
    borderColor: 'red',
    height: 40,
  },
});
