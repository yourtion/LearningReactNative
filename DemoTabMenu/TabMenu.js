'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// 设定内置的属性
// 选中项，例如：_type_0_2 表示第一个Tab选中，并且第二个Tab中的第三项选中
const prefixType = '_type_';

// 选中项样式，例如：_style_0_2 表示第一个Tab选中，并且第二个Tab中的第三项选中时的样式
const prefixStyle = '_style_';

// 默认左侧选中的背景颜色
const defaultBackgroundColor = { backgroundColor: '#FFF' };

export default class TabMenu extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    // 左侧选择的index
    const nSelected = this.props.nSelected;
    // 头部选择的index
    const tabSelected = this.props.tabSelected;
    const obj = {};
    let kIndex = 0;
    for (const k in data) {
      const childData = data[k];
      let cIndex = 0;
      for (const c in childData) {
        const type = prefixType + k + '_' + c;
        const style = prefixStyle + k + '_' + c;
        obj[type] = false;
        obj[style] = {};
        // 设定默认选中项
        if (nSelected === cIndex && tabSelected === kIndex) {
          obj[type] = true;
          obj[style] = defaultBackgroundColor;
        }
        cIndex++;
      }
      kIndex++;
    }
    obj.tabSelected = tabSelected;
    obj.nSelected = nSelected;
    this.state = obj;
  }

  render() {
    const header = this.renderHeader();
    const left = this.renderLeft();
    const right = this.renderRight();
    return (
      <View style={styles.container}>
        <View style={[ styles.row, styles.header ]}>
          {header}
        </View>
        <View style={[ styles.row, styles.flex_1 ]}>
          <ScrollView style={[ styles.flex_1, styles.left_pannel ]}>
            {left}
          </ScrollView>
          <ScrollView style={[ styles.flex_1, styles.right_pannel ]}>
            {right}
          </ScrollView>

        </View>
      </View>
    );
  }

  // 渲染头部TabBar
  renderHeader() {
    const data = this.props.data;
    const tabSelected = this.state.tabSelected;
    const header = [];
    let tabIndex = 0;
    for (const i in data) {
      let tabStyle = null;
      if (tabIndex === tabSelected) {
        tabStyle = [ styles.header_text, styles.active_blue ];
      } else {
        tabStyle = [ styles.header_text ];
      }
      header.push(
        <TouchableOpacity key={i} style={[ styles.flex_1, styles.center ]}
                          onPress={this.headerPress.bind(this, i)}>
          <Text style={tabStyle}>{i}</Text>
        </TouchableOpacity>
      );
      tabIndex++;
    }
    return header;
  }

  // 渲染左侧
  renderLeft() {
    const data = this.props.data;
    const tabSelected = this.state.tabSelected;
    const leftPannel = [];
    let index = 0;
    for (const i in data) {
      if (index === tabSelected) {
        for (const k in data[i]) {
          const style = this.state[prefixStyle + i + '_' + k];
          leftPannel.push(
            <Text key={i + '_' + k} onPress={this.leftPress.bind(this, i, k)}
                  style={[ styles.left_row, style ]}>{k}</Text>);
        }
        break;
      }
      index++;
    }
    return leftPannel;
  }

  // 渲染右边，二级菜单
  renderRight() {
    const data = this.props.data;
    const tabSelected = this.state.tabSelected;
    const nSelected = this.state.nSelected;
    let index = 0;
    const rightPannel = [];
    for (const i in data) {
      if (tabSelected === index) {
        for (const k in data[i]) {
          if (this.state[prefixType + i + '_' + k]) {
            for (const j in data[i][k]) {
              rightPannel.push(
                <Text key={i + '_' + k + '_' + j} onPress={this.props.click.bind(this, data[i][k][j])} style={styles.left_row}>{data[i][k][j]}</Text>);
            }
            break;
          }
        }
      }
      index++;
    }
    return rightPannel;
  }

  // 点击左侧，展示右侧二级菜单
  leftPress(tabIndex, nIndex) {
    const obj = {};
    for (const k in this.state) {
      // 将prefixType或者prefixStyle类型全部置false
      if (k.indexOf(prefixType) > -1) {
        obj[k] = false;
        this.setState(obj);
      }
      if (k.indexOf(prefixStyle) > -1) {
        obj[k] = {};
        this.setState(obj);
      }
    }
    obj[prefixType + tabIndex + '_' + nIndex] = true;
    obj[prefixStyle + tabIndex + '_' + nIndex] = defaultBackgroundColor;
    this.setState(obj);
  }

  // 头部点击事件即Tab切换事件
  headerPress(title) {
    const data = this.props.data;
    let index = 0;
    for (const i in data) {
      if (i === title) {
        this.setState({
          tabSelected: index,
        });
        const obj = {};
        let n = 0;
        for (const k in data[i]) {
          if (n !== 0) {
            obj[prefixType + i + '_' + k] = false;
            obj[prefixStyle + i + '_' + k] = {};
          } else {
            obj[prefixType + i + '_' + k] = true;
            obj[prefixStyle + i + '_' + k] = defaultBackgroundColor;
          }
          n++;
        }
        this.setState(obj);
      }
      index++;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  row: {
    flexDirection: 'row',
  },
  flex_1: {
    flex: 1,
  },
  header: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
    backgroundColor: '#F5F5F5',
  },
  header_text: {
    color: '#7B7B7B',
    fontSize: 15,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  left_pannel: {
    backgroundColor: '#F2F2F2',
  },
  left_row: {
    height: 30,
    lineHeight: 20,
    fontSize: 14,
    color: '#7C7C7C',
  },
  right_pannel: {
    marginLeft: 10,
  },
  active_blue: {
    color: '#00B7EB',
  },
  active_fff: {
    backgroundColor: '#FFF',
  },
});
