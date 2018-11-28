/**
 * @Author:JACK-GU
 * @Date:2018/2/28 16:35
 * @E-Mail:528489389@qq.com
 */

import React, {Component} from 'react';
import {Navigation} from "react-native-navigation";
import {
    Text,
    View,
    PixelRatio,
    Platform,
    NativeModules
} from 'react-native';
import * as AppConfig from "../config/AppConfig";
import {connect} from "react-redux";
import ThemeButton from "../component/ThemeButton";
import IphoneXUtil from "../util/IphoneXUtil";
import IphoneXView from "../component/IphoneXView";
import ToastAI from "../component/ToastAI";
import {AppIndex, LoginIndex} from "../RNNConfig";

class Login extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    componentDidMount() {

    }

    render() {
        return (
            <IphoneXView
                bottomColor={AppConfig.COLOR_THEME}
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'android' ? global.BARANDROIDHEIGHT / PixelRatio.get() :
                        IphoneXUtil.isIphoneX() ? 44 : 20,
                }}>


                <ThemeButton
                    backgroundColor={'white'}
                    onPress={() => {
                        Navigation.setRoot({root: AppIndex});
                    }}
                    text={'登录'}
                    textColor={'black'}/>

            </IphoneXView>
        );
    }
}

export default connect(state => ({}), dispatch => ({}))(Login);
