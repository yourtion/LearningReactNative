/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import BoxContainer from './Demos/Boxs'

class LeaningReactNative extends Component {
  render() {
    return (
      <BoxContainer />
    );
  }
}

AppRegistry.registerComponent('LeaningReactNative', () => LeaningReactNative);
