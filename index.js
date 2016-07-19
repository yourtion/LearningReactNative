/**
 * Index
 * @yourtion
 */

import React, { Component } from 'react';


import AsyncStorageDemo from './DemoAPIs/AsyncStorageDemo'
import IOSAPIDemo from './DemoAPIs/IOSAPIDemo'
import CommomAPIDemo from './DemoAPIs/CommomAPIDemo'
import CameraRollDemo from './DemoAPIs/CameraRollDemo'
import RequestDemo from './DemoAPIs/RequestDemo'

export default class Index extends Component {
  render() {
    return (
      // <AsyncStorageDemo />
      // <IOSAPIDemo />
      // <CommomAPIDemo />
      // <CameraRollDemo />
      <RequestDemo />
    );
  }
}

