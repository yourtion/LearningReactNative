'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
} from 'react-native';

import Header from './TextDemo_Header';

class List extends Component {
  render() {
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_font}>{this.props.title}</Text>
      </View>
    );
  }
}

class ImportantNews extends Component {
  show(title) {
    alert(title);
  }

  render() {
    const news = [];
    let i = 0;
    for (const news_item of this.props.news) {
      const text = (
        <Text
          onPress={this.show.bind(this, news_item)}
          numberOfLines={2}
          style={styles.news_item}
          key={i}>
          {news_item}
        </Text>
      );
      news.push(text);
      i++;
    }

    return (
      <View style={styles.flex}>
        <Text style={styles.news_title}>今日要闻</Text>
        {news}
      </View>
    );
  }
}

export default class TextDemo extends Component {
  render() {
    const news = [
      '1、刘慈欣《三体》获“雨果奖”为中国作家首次',
      '2、京津冀协同发展定位明确：北京无经济中心表述',
      '3、好奇宝宝第一次淋雨，父亲用镜头记录了下来',
      '4、京津冀协同发展定位明确：:北京无经济中心表述+好奇宝宝第一次淋雨，父亲用镜头记录了下来',
    ];

    return (
      <View style={styles.flex}>
        <Header />
        <List title='宇航员在太空宣布“三体”获奖' />
        <List title='NASA发短片纪念火星征程50年' />
        <List title='男生连续做一周苦瓜吃吐女友' />
        <List title='女童遭鲨鱼袭击又下海救伙伴' />
        <ImportantNews news={news} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  list_item: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    justifyContent: 'center',
  },
  list_item_font: {
    fontSize: 16,
  },
  news_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CD1D1C',
    marginLeft: 10,
    marginTop: 15,
  },
  news_item: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    lineHeight: 20,
  },
});
