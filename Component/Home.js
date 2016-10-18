/**
 * Created by jmptpanjm on 16/10/13.
 */

//noinspection JSUnresolvedVariable
import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';

// 导入json数据
var LocalData = require('../LocalData.json');
// 导入头部滚动组件
var ScrollImage = require('./ScrollImage');
// 获取屏幕宽度
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

// 新闻详情页
var NewsDetail = require('./NewsDetail');

var Home = React.createClass({

    // 固定不变的量
    getDefaultProps()
    {
        return {
            url_api:"http:www.baidu.com",
            key_word:'T1348647853363',
        }
    },
    // ListView数据源
    getInitialState()
    {
        return {
            headerDataArr:[],
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1,r2) => r1 !== r2
            }),
        }
    },
    // 加载网络请求
    componentDidMount()
    {
        this.loadDataFromNet();
    },
    // 网络请求
    loadDataFromNet()
    {
        fetch(this.props.url_api)
            .then((response)=>response.json)
            .then((responseData)=>{
                // 拿到所有的数据
                var jsonData = responseData[this.props.key_word];
                // 处理数据
                this.dealWithData(jsonData);
            })
            .catch((error)=>{
                if(error){
                    //  加载本地json数据
                    var jsonData = LocalData[this.props.key_word];
                    this.dealWithData(jsonData);
                }
            })
    },
    dealWithData(jsonData)
    {
        // 定义临时变量
        var heardAry=[],listDataAry = [];
        // 遍历
        for(var i = 0; i<jsonData.length; i++)
        {
            // 取出单个数据
            var data = jsonData[i];
            if(data.hasAD == 1)
            {
                heardAry = data.ads;  // 取出广告数据
            }else
            {
                // 取出剩余的cell数据
                listDataAry.push(data);
            }
        }
        // 更新状态机
        this.setState({
            headerDataArr:heardAry,
            dataSource:this.state.dataSource.cloneWithRows(listDataAry),
        });
    },
    // 渲染界面
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderHeader={this.renderHeader}
            />
        )
    },
    // 单个cell
    renderRow(rowData)
    {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.pushToNewsDetail(rowData)}}>
            <View style={styles.cellViewStyle}>
                <Image source={{uri:rowData.imgsrc}} style={styles.leftImageStyle} />
                <View style={styles.rightViewStyle}>
                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                    <Text style={styles.subTitleStyle}>{rowData.digest}</Text>
                    <Text style={styles.flowTitleStyle}>{rowData.replyCount}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    },
    // 跳到新闻详情页
    pushToNewsDetail(rowData)
    {
        this.props.navigator.push({
            component:NewsDetail,
            title:rowData.title,
            passProps:{rowData}
        })
    },
    // 头部滚动广告
    renderHeader()
    {
        if(this.state.headerDataArr.length == 0) return;
        return (
            <ScrollImage
                imageDataArr = {this.state.headerDataArr}
            />
        )
    }
});

const styles = StyleSheet.create({
    cellViewStyle: {
        // 主轴方向
        flexDirection:'row',

        // 设置下边框
        borderBottomWidth:0.5,
        borderBottomColor:'#e8e8e8',
        padding:10,
    },
    leftImageStyle: {
        width:80,
        height:80,
    },
    rightViewStyle: {
        width:width-100,
        marginLeft:8,
    },
    titleStyle: {
        fontSize:15,
        marginBottom:5,
    },
    subTitleStyle: {
        color:'gray'
    },
    flowTitleStyle:{
        // 绝对定位
        position:'absolute',
        right:10,
        bottom:0,

        // 边框
        borderWidth:0.5,
        borderColor:'gray',
        borderRadius:5,
        padding:3,

        color:'gray'
    }




});
module.exports = Home;