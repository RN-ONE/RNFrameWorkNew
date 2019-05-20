/**
 * @Author:JACK-GU
 * @Date:2018/2/28 16:35
 * @E-Mail:528489389@qq.com
 */

import React, {Component} from 'react';
import {Constants, Navigation} from "react-native-navigation";
import {
    Text, View, Image, BackHandler, Dimensions, NativeModules
} from 'react-native';
import * as AppConfig from "../config/AppConfig";
import * as Const from "../config/Const";
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
import HttpUtil from "../util/HttpUtil";
import * as UserAction from '../actions/UserAction'
import NavigationUtil from "../util/NavigationUtil";
import Toast from "react-native-root-toast";
import TouchableButton from "../component/TouchableButton";
import SaveLocalUtil from "../util/SaveLoaclUtil";

let {width, height} = Dimensions.get("window");

class Login extends BaseComponent {
    mExitTime = 0;

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {checkRememberMe: false, defaultUser: '', defaultPassword: ''};
        //Android设置一下沉浸式状态栏
        if (CommonUtil.isAndroid()) {
            NativeModules.BarHeightModule.setNeedFitsSysWindows(false);
        }

        SaveLocalUtil.load(Const.SAVE_LOCAL_LOGIN_DATA, (data) => {
            this.setState({checkRememberMe: data.checkRememberMe, defaultPassword: data.password, defaultUser: data.user});
        });
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
                        <LoginItem
                            defaultValue={this.state.defaultUser}
                            ref={(ref) => {
                                this.loginUser = ref;
                            }}
                            style={{marginHorizontal: AppConfig.DISTANCE_SAFE, marginTop: 30}}
                            placeholder={"请输入用户名"}
                            icon={'shield-account'}/>

                        <LoginItem
                            defaultValue={this.state.defaultPassword}
                            ref={(ref) => {
                                this.loginPassword = ref;
                            }}
                            style={{marginHorizontal: AppConfig.DISTANCE_SAFE, marginTop: AppConfig.DISTANCE_SAFE / 2}}
                            placeholder={"请输入密码"}
                            password={true}
                            icon={'shield-lock'}/>


                        <TouchableButton style={{marginTop: AppConfig.DISTANCE_SAFE, marginLeft: AppConfig.DISTANCE_SAFE, paddingVertical: 5}}
                                         onPress={() => {
                                             this.setState({checkRememberMe: !this.state.checkRememberMe});
                                         }}>

                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <MaterialCommunityIcons name={this.state.checkRememberMe ? "checkbox-marked-outline" : 'checkbox-blank-outline'}
                                                        size={20} color={AppConfig.COLOR_THEME}/>

                                <Text style={{
                                    fontSize: AppConfig.TEXT_SIZE_NORMAL,
                                    color: AppConfig.COLOR_THEME,
                                    marginLeft: AppConfig.DISTANCE_SAFE / 2
                                }}>记住密码</Text>
                            </View>

                        </TouchableButton>

                        <ThemeButton
                            onPress={() => {
                                this.login();
                            }}
                            text={'登录'}/>
                    </View>
                </KeyboardAwareScrollView>

            </IphoneXView>
        );
    }

    /**
     *登陆
     *
     * @Author: JACK-GU
     * @Date: 2019-05-17 13:40
     * @E-Mail: 528489389@qq.com
     */
    login() {
        let user = this.loginUser.getTextValue();
        let password = this.loginPassword.getTextValue();

        if (user.length === 0) {
            ToastAI.showShortBottom("请输入用户名");
            return;
        }

        if (password.length === 0) {
            ToastAI.showShortBottom("请输入密码");
            return;
        }

        let pswHash = HttpUtil.getEncryptedPassword(password);

        let map = {
            actionName: "sys-user-login",
            userId: user,
            password: pswHash,
        };


        NavigationUtil.showLoadingOverLayOrModal('登录中...');
        let {userLogin} = this.props;
        if (userLogin) {
            userLogin(map, (success) => {
                NavigationUtil.dismissLoadingOverLayOrModal();
                if (success) {
                    let saveData = {user, checkRememberMe: this.state.checkRememberMe, password: this.state.checkRememberMe ? password : ""};
                    SaveLocalUtil.save(Const.SAVE_LOCAL_LOGIN_DATA, saveData);

                    setTimeout(() => {
                        ToastAI.showShortBottom("登录成功");
                    }, 500);
                    this.goToHome();
                }
            });
        }
    }

    /**
     *登陆到主页
     *
     * @Author: JACK-GU
     * @Date: 2019-05-17 13:40
     * @E-Mail: 528489389@qq.com
     */
    goToHome() {
        Navigation.setRoot({root: AppTableHome()}).then();
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
        this.state = {textValue: props.defaultValue && props.defaultValue.length > 0 ? props.defaultValue : '', password: props.password};
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

    componentWillReceiveProps(nextProps) {
        this.setState({textValue: nextProps.defaultValue && nextProps.defaultValue.length > 0 ? nextProps.defaultValue : this.state.textValue});
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
                        defaultValue={this.props.defaultValue}
                        placeholder={this.props.placeholder}
                        style={{
                            fontSize: AppConfig.TEXT_SIZE_SMALL,
                            flex: 1,
                            marginLeft: AppConfig.DISTANCE_SAFE - 3,
                            padding: 0,
                        }}
                        secureTextEntry={this.state.password}/>
                    {
                        this.props.password ?
                            <TouchableButton style={{marginLeft: AppConfig.DISTANCE_SAFE}} onPress={() => {
                                this.setState({password: !this.state.password});
                            }}>

                                <MaterialCommunityIcons name={this.state.password ? "eye" : "eye-off"} size={20} color={AppConfig.COLOR_THEME}/>

                            </TouchableButton>
                            : null
                    }

                </View>
            </View>
        );
    }
}

export default connect(state => ({}), dispatch => ({
    userLogin: (data, loginCallBack) => dispatch(UserAction.userLogin(data, loginCallBack))
}))(Login);
