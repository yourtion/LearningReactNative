'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  NetInfo,
  Vibration,
} from 'react-native';

import Geolocation from 'Geolocation';

class PixelRatioView extends Component {

  render() {
    return (
      <View style={styles.flex}>
        <Text>PixelRatio Demo :</Text>
        <View style={styles.prv_1}></View>
        <View style={styles.prv_2}></View>
      </View>
    );
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
        reachability: reach,
      });
    }).catch(alert);

    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        connected: isConnected ? 'online' : 'offline',
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
    );
  }
}

class VibrationView extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <Text style={styles.btn} onPress={this._vibration1}>振动一下</Text>
        <Text style={styles.btn} onPress={this._vibration2}>振动几下</Text>
      </View>
    );
  }

  _vibration1() {
    Vibration.vibrate();
  }

  _vibration2() {
    Vibration.vibrate([ 0, 500, 200, 500 ]);
  }
}

class GeolocationView extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <Text style={styles.btn} onPress={this._get_geo}>获取位置</Text>
      </View>
    );
  }

  _get_geo() {
    Geolocation.getCurrentPosition(
      (data) => alert(JSON.stringify(data)),
      (error) => alert(error.message)
    );
  }
}

export default class IOSAPIDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PixelRatioView />
        <NetInfoView />
        <VibrationView />
        <GeolocationView />
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
  prv_1: {
    borderWidth: 1,
    borderColor: 'red',
    height: 40,
    marginBottom: 20,
  },
  prv_2: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'red',
    height: 40,
  },
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
