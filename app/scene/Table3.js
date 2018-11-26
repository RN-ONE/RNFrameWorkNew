/**
 * @Author:JACK-GU
 * @Date:2018-11-26
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import React, {Component} from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import {connect} from "react-redux";
import {Navigation} from "react-native-navigation";

let {height, width} = Dimensions.get('window');


class Table3 extends Component {
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

    //页面显示的时候会调用这个方法
    componentDidAppear() {
        console.log("NavigationTest显示出来了")
    }

    //页面隐藏不可以见的时候调用这个方法
    componentDidDisappear() {
        console.log("NavigationTest被隐藏了")
    }

    //添加在页面顶部的按钮被点击了会调用
    navigationButtonPressed({buttonId}) {
        console.log(`点击了id为${buttonId}的按钮`);
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'orange'}}>

            </View>
        );
    }
}

export default connect(state => ({}), dispatch => ({}))(Table3);
