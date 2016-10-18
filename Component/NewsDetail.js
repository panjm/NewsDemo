/**
 * Created by jmptpanjm on 16/10/18.
 */
import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    WebView,
} from 'react-native';

var NewsDetail = React.createClass({

    getDefaultProps()
    {
        return {

        }
    },
    getInitialState()
    {
        return {
            detailData:''
        }
    },
    render(){
        return(
            <WebView
                automaticallyAdjustContentInsets={true}
                style={styles.webView}
                source={{html: this.state.detailData, baseUrl: ''}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={this.state.scalesPageToFit}
            />
        )
    },
    // 网络请求
    componentDidMount()
    {
        var url_api = 'http://c.3g.163.com/nc/article/' + this.props.rowData.docid + '/full.html';
        // 发送请求
        fetch(url_api)
            .then((response) => response.json())
            .then((responseData)=>{
                // 拿到数据
                var allData = responseData[this.props.rowData.docid];
                // 取出body
                var htmlBody = allData['body'];

                // 拿到图片数据
                if(allData['img'].length > 0)
                {
                    // 遍历
                    for(var i=0; i<allData['img'].length; i++)
                    {
                        // 取出单个图片对象
                        var img = allData['img'][i];
                        // 取出src
                        var imgSrc = img['src'];
                        var imgHtml = '<img src="' + imgSrc +'"width="100%">';
                        // 替换图片中的占位符
                        htmlBody = htmlBody.replace(img['ref'],imgHtml);
                    }
                }


                // 更新状态机
                this.setState({
                   detailData:htmlBody
                });
            })
            .catch((error) => {
                alert('请求数据失败');
            })


    }
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

module.exports = NewsDetail;

