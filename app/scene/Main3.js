/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DialogMessage from "../component/DialogMessage";
import TouchableButton from "../component/TouchableButton";
import * as AppConfig from "../config/AppConfig";
import TitleBar from "../component/TitleBar";
import {connect} from "react-redux";
import * as TestAction from "../actions/TestAction";
import * as AppStyles from '../config/AppStyles';
import ThemeButton from "../component/ThemeButton";
import ToastAI from "../component/ToastAI";
import * as Const from "../config/Const";
import HttpUtil from "../util/HttpUtil";
import {Navigation} from "react-native-navigation";
import NavigationUtil from "../util/NavigationUtil";
import {AppIndex, LoginIndex} from "../RNNConfig";

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: "设置"
                }
            }
        });
    }


    render() {
        return (
            <View style={{backgroundColor: AppConfig.COLOR_BG, flex: 1}}>

                <ThemeButton backgroundColor={AppConfig.COLOR_THEME}
                             radius={5}
                             text={this.props.text} onPress={() => {
                    Navigation.setRoot({root: LoginIndex});
                }}/>

                <ThemeButton backgroundColor={AppConfig.COLOR_THEME}
                             radius={5}
                             text={"测试FlatList"} onPress={() => {
                    Navigation.push(this.props.componentId,
                        NavigationUtil.getRNNComponent(Const.RNN_FLAT_LIST_SCENE, "测试FlatList"))
                }}/>
            </View>
        )
    }


    show() {
        NavigationUtil.showMessageDialogOverLay({
            title: '测试',//标题
            titleColor: AppConfig.COLOR_THEME,
            contentColor: AppConfig.TEXT_COLOR_GRAY,//内容颜色
            content: ['选择Toast的位置'],//内容
            ok: {
                text: '居中',
                color: AppConfig.COLOR_THEME,
                callback: () => {
                    ToastAI.showShortCenter("居中位置的Toast");
                },
            },//右边按钮
            cancel: {
                text: '上面',
                color: AppConfig.TEXT_COLOR_GRAY,
                callback: () => {
                    ToastAI.showShortTop("上面位置的Toast");
                },
            },
            //左边按钮
        });
    }


}

export default connect(state => ({
    text: state.TestReducer.text,
}), dispatch => ({
    getMoveList: (data) => dispatch(TestAction.testGetMoves(data)),
}))(Main);
