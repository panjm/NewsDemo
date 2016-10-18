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

} from 'react-native';

// 导入json数据
var LocalData = require('../LocalData.json');
// 导入头部滚动组件
var ScrollImage = require('./ScrollImage');
// 获取屏幕宽度
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var Home = React.createClass({

    // 不变的变量
    getDefaultProps()
    {
        return {
            url_api:"http:wwww.baidu.com",
            key_word:'T1348647853363'
        }
    },
    // 初始化方法
    getInitialState(){
        return{
            // 头部数据源
            headerDataArr:[],
            // cell的数据源
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1,r2) => r1 !== r2
            })
        }
    },
    // 处理网络请求
    componentDidMount()
    {
        this.loadDataFromNet();
    },
    // 加载网络数据
    loadDataFromNet()
    {
        fetch(this.props.url_api)
            .then((response) => response.json)
            .then((responseData)=>{
                // 拿到所有的数据
                var jsonData = responseData[this.props.key_word];
                // 处理网络数据
                this.dealWithData(jsonData);
            })
            .catch((error)=>{   // 异常处理
                if(error)
                {
                    // 拿到所有的数据
                    var jsonData = LocalData[this.props.key_word];
                    // 特殊处理
                    this.dealWithData(jsonData);
                    // console.log(jsonData);
                }
            })
    },
    // 处理网络数据
    dealWithData(jsonData)
    {
        // 定义临时变量
        var headerAry = [],listDataAry = [];
        for(var i=0; i < jsonData.length; i++)
        {
            // 取出单独的对象
            var data = jsonData[i];
            if(data.hasAD ==1)   // 取出广告数据
            {
                headerAry = data.ads;
            }else
            {    // 剩余的行数据
                listDataAry.push(data);
            }
        }
        // 更新状态机
        this.setState({
            // 头部数据源
            headerDataArr:headerAry,
            dataSource: this.state.dataSource.cloneWithRows(listDataAry)
        });
    },
    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderHeader={this.renderHeader}
            />
        );
    },
    // 单独一个cell
    renderRow(rowData)
    {
        return(
            <View style={styles.cellViewStyle}>
                <Image source={{uri:rowData.imgsrc}} style={styles.leftImageStyle}/>
                <View style={styles.rightViewStyle}>
                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                    <Text style={styles.subTitleStyle}>{rowData.digest}</Text>
                    <Text style={styles.flowTitleStyle}>{rowData.replyCount}</Text>
                </View>
            </View>
        );
    },
    // 头部
    renderHeader()
    {
        if (this.state.headerDataArr.length == 0) return;
        return (
            <ScrollImage
                imageDataArr={this.state.headerDataArr}
            />
        );
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