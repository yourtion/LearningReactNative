'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const imgs = [
  'https://blog.yourtion.com/images/2016/03/backup0.png',
  'https://blog.yourtion.com/images/2016/03/backup1.png',
  'https://blog.yourtion.com/images/2016/03/backup2.png',
  'https://blog.yourtion.com/images/2016/03/backup3.png',
];

class MyImage extends Component {
  constructor(props) {
    super(props);

    const imgs = this.props.imgs;
    this.state = {
      imgs,
      count: 0,
    };
  }

  goNext() {
    let count = this.state.count;
    count++;
    if (count < this.state.imgs.length){
      this.setState({
        count,
      });
    }
  }
  goPreview() {
    let count = this.state.count;
    count--;
    if (count > 0){
      this.setState({
        count,
      });
    }
  }

  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.image}>
          <Image style={styles.img}
            source={{ uri: this.state.imgs[this.state.count] }}
            resizeMode="contain" />
        </View>
        <View style={styles.btns}>
          <TouchableOpacity onPress={this.goPreview.bind(this)}>
            <View style={styles.btn}>
              <Text>上一张</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goNext.bind(this)}>
            <View style={styles.btn}>
              <Text>下一张</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class ImageDemo extends Component {
  render() {
    return (
      <View style={[ styles.flex, styles.main ]}>
        <MyImage imgs={imgs} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    marginTop: 40,
  },
  image: {
    borderWidth: 1,
    width: 300,
    height: 200,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  img: {
    height: 200,
    width: 300,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn: {
    width: 60,
    height: 30,
    borderColor: '#0089FF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginRight: 20,
  },
});
