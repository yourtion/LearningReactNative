'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class HelloMessage extends Component {
  render() {
    return (
      <Text> Hello {this.props.name} </Text>
    );
  }
}

class Child extends Component {
  render() {
    return (
      <Text> {this.props.name} </Text>
    );
  }
}

class Parent extends Component {

  click() {
    console.log(this.refs.child);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.click.bind(this)}>
        <View onClick={this.click}>
          <Text>Parent is : </Text>
          <Child name={this.props.name} ref="child" />
        </View>
      </TouchableHighlight>
    );
  }
}

class ComponentDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HelloMessage name="Yourtion" />
        <Parent name="Yourtion Guo" />
      </View>
    );
  }
}

export default ComponentDemo;
