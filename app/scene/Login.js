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
    NativeModules, BackHandler
} from 'react-native';
import * as AppConfig from "../config/AppConfig";
import {connect} from "react-redux";
import ThemeButton from "../component/ThemeButton";
import IphoneXUtil from "../util/IphoneXUtil";
import IphoneXView from "../component/IphoneXView";
import ToastAI from "../component/ToastAI";
import {AppTableHome} from "../RNNConfig";
import CommonUtil from "../util/CommonUtil";
import BaseComponent from "../component/BaseComponent";

class Login extends BaseComponent {
    mExitTime = 0;

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        // Navigation.mergeOptions(this.props.componentId, {
        //     topBar: {
        //         title: {
        //             text: "登录"
        //         }
        //     }
        // });
    }


    componentDidMount(): void {
        super.componentDidMount();
    }


    componentWillUnmount(): void {
        super.componentWillUnmount();
    }


    componentDidAppear() {
        super.componentDidAppear();
        this.backHandler = BackHandler.addEventListener('LoginHardwareBackPress', () => {
            if ((new Date()).getTime() - this.mExitTime > 2000) {
                ToastAI.showShortBottom("再按一次退出本软件");
                this.mExitTime = (new Date()).getTime();
            } else {
                BackHandler.exitApp();
            }
            //表示消费了这个事件
            return true;
        });
    }

    componentDidDisappear() {
        super.componentDidDisappear();
        this.backHandler.remove();
    }

    render() {
        return (
            <IphoneXView
                bottomColor={AppConfig.COLOR_THEME}
                style={{
                    flex: 1,
                }}>


                <ThemeButton
                    backgroundColor={'white'}
                    onPress={() => {
                        Navigation.setRoot({root: AppTableHome()}).then();
                    }}
                    text={'登录'}
                    textColor={'black'}/>

            </IphoneXView>
        );
    }
}

export default connect(state => ({}), dispatch => ({}))(Login);
