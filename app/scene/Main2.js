/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native';
import {connect} from "react-redux";
import * as TestAction from "../actions/TestAction";
import * as AppConfig from '../config/AppConfig';
import {Navigation} from "react-native-navigation";
import ThemeButton from "../component/ThemeButton";
import NavigationUtil from "../util/NavigationUtil";
import {getTopBarHeight} from "../RNNConfig";
import * as Const from "../config/Const";
import BaseComponent from "../component/BaseComponent";


class Main2 extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentPosition: 0
        }


        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: "通讯录"
                }
            }
        });
    }

    render() {
        return (
            <View style={{backgroundColor: AppConfig.COLOR_BG, flex: 1}}>
                <ThemeButton backgroundColor={AppConfig.COLOR_THEME}
                             radius={5}
                             text={"顶部切换卡（IOS暂不支持，等待后续完善）"} onPress={() => {
                    let item = NavigationUtil.getTopTabsScene([
                        NavigationUtil.getTopTab(Const.RNN_TABLE1, "第一个", {}, false),
                        NavigationUtil.getTopTab(Const.RNN_TABLE2, "第二个", {}, false),
                        NavigationUtil.getTopTab(Const.RNN_TABLE3, "第三个", {}, false),
                    ], false);
                    Navigation.push(this.props.componentId, item);
                }}/>
            </View>
        )
    }

}

export default connect(state => ({
    text: state.TestReducer.text,
}), dispatch => ({
    getMoveList: (data) => dispatch(TestAction.testGetMoves(data)),
}))(Main2);
