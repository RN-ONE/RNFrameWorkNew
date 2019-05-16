/**
 * @Author:JACK-GU
 * @Date:2018/2/28 16:35
 * @E-Mail:528489389@qq.com
 */

import React, {Component} from 'react';
import {Navigation} from "react-native-navigation";
import {
    Text, View, Image, BackHandler, Dimensions, NativeModules
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
import InputPlateComponent from "../component/InputPlateComponent";
import PropTypes from 'prop-types';
import EditText from "../component/EditText";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let {width, height} = Dimensions.get("window");

class Login extends BaseComponent {
    mExitTime = 0;

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        //Android设置一下沉浸式状态栏
        if (CommonUtil.isAndroid()) {
            NativeModules.BarHeightModule.setNeedFitsSysWindows(false);
        }
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
            <IphoneXView style={{flex: 1,}}>

                <Image style={{width: width, height: height * 0.3}} source={require('../img/login_background.jpg')}/>
                <KeyboardAwareScrollView>
                    <View>
                        <LoginItem style={{marginHorizontal: AppConfig.DISTANCE_SAFE, marginTop: 30}}
                                   placeholder={"请输入用户名"}
                                   icon={'shield-account'}/>

                        <LoginItem style={{marginHorizontal: AppConfig.DISTANCE_SAFE, marginTop: AppConfig.DISTANCE_SAFE / 2}}
                                   placeholder={"请输入密码"}
                                   password={true}
                                   icon={'shield-lock'}/>

                        <ThemeButton
                            onPress={() => {
                                Navigation.setRoot({root: AppTableHome()}).then();
                                //Android设置一下
                                if (CommonUtil.isAndroid()) {
                                    NativeModules.BarHeightModule.setNeedFitsSysWindows(true);
                                }
                            }}
                            text={'登录'}/>
                    </View>
                </KeyboardAwareScrollView>

            </IphoneXView>
        );
    }
}

class LoginItem extends Component {
    static propTypes = {
        title: PropTypes.string,
        icon: PropTypes.string,
        placeholder: PropTypes.string,
        password: PropTypes.bool,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {textValue: ''};
    }

    /**
     *获取输入的值
     *
     * @Author: JACK-GU
     * @Date: 2019-05-16 14:05
     * @E-Mail: 528489389@qq.com
     */
    getTextValue() {
        return this.state.textValue ? this.state.textValue : '';
    }

    render() {
        return (
            <View style={[this.props.style, {flexDirection: 'row'}]}>
                <View style={{
                    backgroundColor: 'white',
                    borderWidth: 0,
                    borderColor: AppConfig.COLOR_WHITE,
                    borderRadius: 5,
                    flex: 1,
                    padding: AppConfig.DISTANCE_SAFE,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <MaterialCommunityIcons name={this.props.icon} size={25} color={AppConfig.COLOR_THEME}/>

                    <EditText
                        clearButtonMode={"while-editing"}
                        numberOfLines={1}
                        onChangeText={(textValue) => {
                            this.setState({textValue});
                        }}
                        placeholder={this.props.placeholder}
                        style={{
                            fontSize: AppConfig.TEXT_SIZE_SMALL,
                            flex: 1,
                            marginLeft: AppConfig.DISTANCE_SAFE - 3,
                            padding: 0
                        }}
                        secureTextEntry={this.props.password}/>
                </View>
            </View>
        );
    }
}

export default connect(state => ({}), dispatch => ({}))(Login);
