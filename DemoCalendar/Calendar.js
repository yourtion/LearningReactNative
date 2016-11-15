'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: this.props.startTime || new Date(),
      num: this.props.num || 3,
      holiday: this.props.holiday || {},
      check: this.props.check || {},
      headerStyle: this.props.headerStyle || {},
      headerBGStyle: this.props.headerBGStyle || {},
    };
  }

  render() {
    const date = this.state.startTime;
    const num = this.state.num;
    const holiday = this.state.holiday;
    const check = this.state.check;
    const headerStyle = this.state.headerStyle;

    const items = [];
    const dateNow = new Date();

    for(let n = 0; n < num; n++) {
      const rows = [];
      const newDate = new Date(date.getFullYear(), date.getMonth() + 1 + n, 0); // 天数
      let week = new Date(date.getFullYear(), date.getMonth() + n, 1).getDay(); // 月份开始的星期
      if (week === 0) week = 7;
      const counts = newDate.getDate();
      const rowCounts = Math.ceil((counts + week - 1) / 7); // 本月行数

      for (let i = 0; i < rowCounts; i++) {
        const days = [];
        for (let j = (i * 7) + 1; j < ((i + 1) * 7) + 1; j++) {
          // 根据每个月开始的［星期］往后推
          let dayNum = j - week + 1;
          if (dayNum > 0 && j < counts + week) {
            // 如果当前日期小于今天，则变灰
            const dateObj = new Date(date.getFullYear(), date.getMonth() + n, dayNum);
            const dateStr = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dayNum;
            let grayStyle = {};
            let bk = {};
            if (dateNow >= new Date(date.getFullYear(), date.getMonth() + n, dayNum + 1)) {
              grayStyle = {
                color: '#ccc',
              };
            }
            if (holiday[dateStr]) {
              dayNum = holiday[dateStr];
            }
            if (check[dateStr]) {
              bk = {
                backgroundColor: '#1EB7FF',
                width: 46,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              };
              grayStyle = {
                color: '#fff',
              };
            }
            days.push(
              <TouchableHighlight
                key={dayNum}
                style={[ styles.flex_1 ]}
                underlayColor="#FFF"
                onPress={this.props.touchEvent ? this.props.touchEvent.bind(this, dateStr) : null}>
                <View style={bk}>
                  <Text style={grayStyle}>{dayNum}</Text>
                </View>
              </TouchableHighlight>
            );
          } else {
            days.push(
              <View style={[ styles.flex_1 ]} key={dayNum}>
                <Text></Text>
              </View>
            );
          }
        }
        rows.push(
          <View style={styles.row} key={i}>{days}</View>
        );
      }
      items.push(
        <View style={[ styles.cm_bottom ]} key={n}>
          <View style={styles.month}>
            <Text style={styles.month_text}>{newDate.getFullYear()}年{newDate.getMonth() + 1}月</Text>
          </View>
          {rows}
        </View>
      );
    }

    return (
      <View style={styles.calendar_container}>

        <View style={[ styles.row, styles.row_header, this.props.headerBGStyle ]}>
          <View style={[ styles.flex_1 ]}>
            <Text style={this.props.headerStyle}>一</Text>
          </View>
          <View style={[ styles.flex_1 ]}>
            <Text style={this.props.headerStyle}>二</Text>
          </View>
          <View style={[ styles.flex_1 ]}>
            <Text style={this.props.headerStyle}>三</Text>
          </View>
          <View style={[ styles.flex_1 ]}>
            <Text style={this.props.headerStyle}>四</Text>
          </View>
          <View style={[ styles.flex_1 ]}>
            <Text style={this.props.headerStyle}>五</Text>
          </View>
          <View style={[ styles.flex_1 ]}>
            <Text style={[ styles.week_highlight, this.props.headerStyle ]}>六</Text>
          </View>
          <View style={[ styles.flex_1 ]}>
            <Text style={[ styles.week_highlight, this.props.headerStyle ]}>日</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {items}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  flex_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar_container: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#CCC',
  },
  row_header: {
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CCC',
  },
  row: {
    flexDirection: 'row',
    height: 35,
  },
  month: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  month_text: {
    fontSize: 18,
    fontWeight: '400',
  },
  week_highlight: {
    color: '#23B8FC',
  },
  cm_bottom: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CCC',
  },
});
