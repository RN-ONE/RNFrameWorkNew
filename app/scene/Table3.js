/**
 * @Author:JACK-GU
 * @Date:2018-11-26
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import React, {Component} from 'react';
import {
    View,
    Dimensions, Text
} from 'react-native';
import {connect} from "react-redux";
import {Navigation} from "react-native-navigation";
import BaseComponent from "../component/BaseComponent";

let {height, width} = Dimensions.get('window');


class Table3 extends BaseComponent {
    /**
     *@param passProps 传递过来的参数
     *
     *这个方法是可以配置页面的参数，按钮
     */
    static options(passProps) {
        return {};
    }


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'orange'}}>
                <Text>3</Text>
            </View>
        );
    }
}

export default connect(state => ({}), dispatch => ({}))(Table3);
