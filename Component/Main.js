/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS
} from 'react-native';

// 引入外部的组件
var Home = require('../Component/Home');
var Find = require('../Component/Find');
var Message = require('../Component/Message');
var Mine = require('../Component/Mine');



var Main = React.createClass({

    // 初始化方法
    getInitialState(){
        return{
            // 设置选中标识
            selectedItem: 'Home'  // 默认首页被选中
        }
    },

    render() {
        return (
            <TabBarIOS
                tintColor = "orange"
            >
                {/*首页*/}
                <TabBarIOS.Item
                    icon= {require('image!tabbar_home')}
                    title="首页"
                    selected={this.state.selectedItem == 'Home'}
                    onPress={()=>{this.setState({selectedItem: 'Home'})}}
                >
                    <NavigatorIOS
                        style={{flex:1}}
                        tintColor= "orange"
                        initialRoute={{
                            component:Home,
                            title:'网易',
                            leftButtonIcon:require('image!navigationbar_friendattention'),
                            rightButtonIcon:require('image!navigationbar_pop')
                        }}
                    />
                </TabBarIOS.Item>
                {/*消息*/}
                <TabBarIOS.Item
                    icon= {require('image!tabbar_discover')}
                    title="发现"
                    selected={this.state.selectedItem == 'Find'}
                    onPress={()=>{this.setState({selectedItem: 'Find'})}}
                >
                    <NavigatorIOS
                        style={{flex:1}}
                        initialRoute={{
                            component:Find,
                            title:'发现'
                        }}
                    />
                </TabBarIOS.Item>
                {/*发现*/}
                <TabBarIOS.Item
                    icon= {require('image!tabbar_message_center')}
                    title="消息"
                    selected={this.state.selectedItem == 'Message'}
                    onPress={()=>{this.setState({selectedItem: 'Message'})}}
                >
                    <NavigatorIOS
                        style={{flex:1}}
                        initialRoute={{
                            component:Message,
                            title:'消息'
                        }}
                    />
                </TabBarIOS.Item>
                {/*我的*/}
                <TabBarIOS.Item
                    icon= {require('image!tabbar_profile')}
                    title="我的"
                    selected={this.state.selectedItem == 'Mine'}
                    onPress={()=>{this.setState({selectedItem: 'Mine'})}}
                >
                    <NavigatorIOS
                        style={{flex:1}}
                        initialRoute={{
                            component:Mine,
                            title:'我的'
                        }}
                    />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
});

const styles = StyleSheet.create({

});

// 输出类
module.exports = Main;
