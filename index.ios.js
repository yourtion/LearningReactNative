/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import BoxContainer from './Demos/Boxs'
import BoxContainer2 from './Demos/Boxs2'
import ComponentDemo from './Demos/ComponentDemo'

class LeaningReactNative extends Component {
  render() {
    return (
      // <BoxContainer />
      // <ComponentDemo />
      <BoxContainer2 />
    );
  }
}

AppRegistry.registerComponent('LeaningReactNative', () => LeaningReactNative);
