'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  NetInfo,
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

class NetInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NetInfo.fetch().then(reach => {
      this.setState({
        reachability: reach
      });
    }).catch(alert);

    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        connected: isConnected ? 'online' : 'offline'
      });
    }).catch(alert);
  }

  render() {
    return (
      <View style={styles.flex}>
        <Text>NetInfo :</Text>
        <Text>Reachability : {this.state.reachability}</Text>
        <Text>Connected : {this.state.connected}</Text>
      </View>
    )
  }
}

export default class IOSAPIDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PixelRatioView />
        <NetInfoView />
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
