'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
} from 'react-native';
import Calendar from './Calendar';

StatusBar.setHidden(true);

export default class CalendarDemo extends Component {
  render() {
    const holiday = {
      '2016-10-1': '国庆节',
      '2016-9-10': '教师节',
      '2016-1-1': '元旦节',
      '2016-11-11': '双十一',
    };
    const check = {
      '2016-10-1': 'checked',
      '2016-9-1': 'checked',
      '2016-7-10': 'checked',
      '2016-9-10': 'checked',
    };
    const headerBGStyle = {
      backgroundColor: '#3C9BFD',
    };
    const headerStyle = {
      backgroundColor: '#3C9BFD',
      color: '#FFF',
      fontSize: 15,
      fontWeight: '500',
    };
    return (
      <View style={styles.container}>
        <Calendar
          touchEvent={this.press}
          headerBGStyle={headerBGStyle}
          headerStyle={headerStyle}
          holiday={holiday}
          check={check}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
