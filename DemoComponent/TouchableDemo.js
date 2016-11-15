'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';


class Highlight extends Component {
  show(text) {
    alert(text);
  }
  render() {
    return (
      <View>
        <View>
          <TouchableHighlight
            onPress={this.show.bind(this, 'Yourtion Touched')}
            underlayColor='#E1F6FF' >
            <Text style={styles.item}> Learning ReactNative </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.show.bind(this, 'Yourtion')}
            underlayColor='#E1F6FF' >
            <Text style={styles.item}> ReactNative </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

class Opacity extends Component {
  show(text) {
    alert(text);
  }
  render() {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={this.show.bind(this, 'Yourtion Touched')} >
            <Text style={styles.item}> Learning ReactNative </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.show.bind(this, 'Yourtion')} >
            <Text style={styles.item}> ReactNative </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.show.bind(this, 'Yourtion')} >
            <View style={styles.btn}>
              <Text style={styles.btn_text}> 按钮 </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class TouchableDemo extends Component {
  render() {
    return (
      <View style={styles.flex}>
        <Text>Highlight: </Text>
        <Highlight />
        <Text>Opacity: </Text>
        <Opacity />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: 25,
  },
  item: {
    fontSize: 18,
    margin: 10,
    color: '#434343',
  },
  btn: {
    marginLeft: 30,
    marginTop: 30,
    width: 100,
    height: 100,
    backgroundColor: '#18B4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  btn_text: {
    fontSize: 25,
    color: '#FFF',
  },
});
