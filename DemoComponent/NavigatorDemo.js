'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Navigator,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';

class List extends Component {
  _pressButton() {
    this.props.navigator.push({
      title: '邮轮详情',
      component: Detail,
      rightButton: {
        title: '购物车',
        press: () => { alert('进入我的购物车'); },
      },
    });
  }

  render() {
    return (
      <ScrollView style={styles.flex}>
        <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>☆ 豪华邮轮济州岛3日游</Text>
        <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>☆ 豪华邮轮台湾3日游</Text>
        <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>☆ 豪华邮轮地中海8日游</Text>
      </ScrollView>
    );
  }
}

class Detail extends Component {
  render() {
    return (
      <ScrollView style={styles.flex}>
        <Text>详情页</Text>
        <Text>尽管信息很少，但这就是详情页</Text>
      </ScrollView>
    );
  }
}

export default class NavigatorDemo extends Component {
  _renderScene(route, navigator) {
    const Component = route.component;
    return (
      <Component {...route.params} navigator={navigator} />
    );
  }
  _renderNavBar() {
    const routeMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.nav_button}>
              <Text style={styles.nav_buttonText}>Back</Text>
            </TouchableOpacity>
          );
        }
        return null;
      },
      RightButton(route, navigator, index, navState) {
        if(index > 0 && route.rightButton) {
          return (
            <TouchableOpacity
              onPress={route.rightButton.press}
              style={styles.nav_button}>
              <Text style={styles.nav_buttonText}>{route.rightButton.title}</Text>
            </TouchableOpacity>
          );
        }
        return null;
      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.nav_title}>
            <Text style={styles.nav_buttonText}>{route.title ? route.title : '邮轮'}</Text>
          </View>
        );
      },
    };

    return (
      <Navigator.NavigationBar
        style={styles.nav_bar}
        routeMapper={routeMapper}
      />
    );
  }
  render() {
    return (
      <Navigator
        initialRoute={{ component: List }}
        renderScene={this._renderScene}
        sceneStyle={{ paddingTop: (Platform.OS === 'android' ? 66 : 74) }}
        navigationBar={this._renderNavBar()} />
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    padding: 10,
  },
  list_item: {
    lineHeight: 25,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  nav_bar: {
    alignItems: 'center',
    backgroundColor: '#55ACEE',
    shadowOffset: {
      width: 1,
      height: 0.5,
    },
    shadowColor: '#55ACEE',
    shadowOpacity: 0.8,
  },
  nav_title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav_button: {
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav_buttonText: {
    fontSize: 18, color: '#FFFFFF', fontWeight: '400',
  },
});
