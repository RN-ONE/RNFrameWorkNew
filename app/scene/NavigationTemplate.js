/**
 *模板
 *
 * @Author: JACK-GU
 * @Date: 2018-11-26 14:42
 * @E-Mail: 528489389@qq.com
 */

import React, {Component} from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import {connect} from "react-redux";
import {Navigation} from "react-native-navigation";
import BaseComponent from "../component/BaseComponent";

let {height, width} = Dimensions.get('window');


class NavigationTemplate extends BaseComponent {
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
        //绑定react-native-navigation事件
        Navigation.events().bindComponent(this);
    }

    componentDidMount(): void {
        super.componentDidMount();
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
    }


    componentDidAppear() {
        super.componentDidAppear();
    }


    componentDidDisappear() {
        super.componentDidDisappear();
    }

    navigationButtonPressed({buttonId}) {
        super.navigationButtonPressed({buttonId});
    }


    render() {

    }
}

export default connect(state => ({}), dispatch => ({}))(NavigationTemplate);
