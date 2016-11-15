'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Navigator,
  NavigatorIOS,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';


const Model = [
  {
    id: '1',
    title: '佳沛新西兰进口猕猴桃',
    desc: '12个装',
    price: 99,
    url: 'https://vczero.github.io/ctrip/guo_1.jpg',
  },
  {
    id: '2',
    title: '墨西哥进口牛油果',
    desc: '6个装',
    price: 59,
    url: 'https://vczero.github.io/ctrip/guo_2.jpg',
  },
  {
    id: '3',
    title: '美国加州进口车厘子',
    desc: '1000g',
    price: 91.5,
    url: 'https://vczero.github.io/ctrip/guo_3.jpg',
  },
  {
    id: '4',
    title: '新疆特产西梅',
    desc: '1000g',
    price: 69,
    url: 'https://vczero.github.io/ctrip/guo_4.jpg',
  },
  {
    id: '5',
    title: '陕西大荔冬枣',
    desc: '2000g',
    price: 59.9,
    url: 'https://vczero.github.io/ctrip/guo_5.jpg',
  },
  {
    id: '6',
    title: '南非红心西柚',
    desc: '2500g',
    price: 29.9,
    url: 'https://vczero.github.io/ctrip/guo_6.jpg',
  },
];

class Item extends Component {
  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={this.props.press}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={{ uri: this.props.url }}>
            <Text numberOfLines={1} style={styles.item_text}>{this.props.title}</Text>
          </Image>
        </TouchableOpacity>
      </View>
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    AsyncStorage.getAllKeys().then((keys) => {
      this.setState({
        count: keys.length,
      });
    }).catch(alert);
  }

  render() {
    const list = [];
    for(const i in Model) {
      if (i % 2 === 0) {
        const row = (
          <View style={styles.row} key={i}>
            <Item url={Model[i].url}
                  title={Model[i].title}
                  press={this.press.bind(this, Model[i])}/>
            <Item url={Model[parseInt(i, 10) + 1].url}
                  title={Model[parseInt(i, 10) + 1].title}
                  press={this.press.bind(this, Model[parseInt(i, 10) + 1])}/>
          </View>);
        list.push(row);
      }
    }

    const count = this.state.count;
    let str = null;
    if (count) {
      str = '，共' + count + '件商品';
    }

    return (
      <ScrollView style={{ marginTop: 10 }}>
        {list}
        <Text onPress={this.goGouWu.bind(this)} style={styles.btn}>去结算{str}</Text>
      </ScrollView>
    );
  }

  goGouWu() {
    this.props.navigator.push({
      component: GouWu,
      title: '购物车',
    });
  }

  press(data){
    let count = this.state.count;
    count ++;
    // 改变数字状态
    this.setState({
      count,
    });
    // AsyncStorage存储
    AsyncStorage.setItem('SP-' + this.genId() + '-SP', JSON.stringify(data)).then().catch(alert);
  }

  // 生成随机ID：GUID
  genId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
  }
}

class GouWu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      price: 0,
    };
  }

  render() {
    const data = this.state.data;
    let price = this.state.price;
    const list = [];
    for (const i in data) {
      price += parseFloat(data[i].price);
      list.push(
        <View style={[ styles.row, styles.list_item ]} key={i}>
          <Text style={styles.list_item_desc}>
            {data[i].title}
            {data[i].desc}
          </Text>
          <Text style={styles.list_item_price}>¥{data[i].price}</Text>
        </View>
      );
    }

    let str = null;
    if (price) {
      str = '，共' + price.toFixed(1) + '元';
    }

    return (
      <ScrollView style={{ marginTop: 10 }}>
        {list}
        <Text style={styles.btn}>支付{str}</Text>
        <Text style={styles.clear} onPress={this.clearStorage.bind(this)}>清空购物车</Text>
      </ScrollView>
    );
  }

  componentDidMount() {
    AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiGet(keys).then((result) => {
        const arr = [];
        for (const i in result) {
          arr.push(JSON.parse(result[i][1]));
        }
        this.setState({
          data: arr,
        });
      });
    }).catch(alert);

  }

  clearStorage() {
    AsyncStorage.clear().then(() => {
      this.setState({
        data: [],
        price: 0,
      });
      alert('购物车已经清空');
    }).catch(alert);
  }
}

export default class AsyncStorageDemo extends Component {
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
            <Text style={styles.nav_buttonText}>{route.title ? route.title : '水果列表'}</Text>
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
    if (Platform.OS === 'ios') {
      return (
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          initialRoute={
          { component: List, title: '水果列表' }}/>
      );
    }
    return (
        <Navigator
          initialRoute={{ component: List, title: '水果列表' }}
          renderScene={this._renderScene}
          sceneStyle={{ paddingTop: 66, backgroundColor: '#FFF' }}
          navigationBar={this._renderNavBar()} />
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  item: {
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 5,
    height: 100,
  },
  img: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  item_text: {
    backgroundColor: '#000',
    opacity: 0.7,
    color: '#fff',
    height: 25,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 74,
  },
  btn: {
    backgroundColor: '#FF7200',
    height: 33,
    textAlign: 'center',
    color: '#FFF',
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 24,
    marginTop: 40,
    fontSize: 18,
  },
  list_item: {
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    borderWidth: 1,
    height: 30,
    borderRadius: 3,
    borderColor: '#DDD',
  },
  list_item_desc: {
    flex: 2,
    fontSize: 15,
  },
  list_item_price: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
  },
  clear: {
    marginTop: 10,
    backgroundColor: '#FFF',
    color: '#000',
    borderWidth: 1,
    borderColor: '#DDD',
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 24,
    height: 33,
    fontSize: 18,
    textAlign: 'center',
  },
  nav_bar: {
    alignItems: 'center',
    backgroundColor: '#FF7200',
    shadowOffset: {
      width: 1,
      height: 0.5,
    },
    shadowColor: '#FF7200',
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
