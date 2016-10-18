/**
 * Created by jmptpanjm on 16/10/13.
 */

import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

var Find = React.createClass({
    render(){
        return(
            <View style={styles.container}>
                <Text>
                    发现
                </Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

});
module.exports = Find;