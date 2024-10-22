/**
 * @Author:JACK-GU
 * @Date:2017/12/28
 * @E-Mail:528489389@qq.com
 * @Describe: 图片选择的modal
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    ProgressViewIOS,
    TouchableWithoutFeedback,
    Modal,
    ActivityIndicator, BackHandler
} from "react-native";
import ProgressView from '../native/ProgressView';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import {connect} from "react-redux";
import SaveLocalUtil from "../util/SaveLoaclUtil";
import TouchableButton from "../component/TouchableButton";
import ToastAI from "../component/ToastAI";
import NavigationUtil from "../util/NavigationUtil";
import {Navigation} from "react-native-navigation";
import * as Const from "../config/Const";

import {PermissionsAndroid} from 'react-native';
import CommonUtil from "../util/CommonUtil";
import BaseOverlay from "./BaseOverlay";

let {width, height} = Dimensions.get('window');


var ImagePicker = require('react-native-image-picker');


var styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
});
/**
 * {
            uri: response.uri,
                fileSize: response.fileSize,
            fileName: response.fileName,
            width: response.width,
            height: response.height,
            path:response.path,
        }
 * */

export default class ImagePickerOverlay extends BaseOverlay {
    static propTypes = {
        callback: PropTypes.func,
        titleColor: PropTypes.color
    };

    constructor(props) {
        super(props);

        this.state = {
            options: props.options,
            visible: false,
            show: false,
        };
    }



    componentWillReceiveProps(next) {
        console.log({next});
        if (next.options) {
            this.setState({
                options: next.options,
                firstIndex: 0,
                secondIndex: 0,
            });
        }
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.8)'}]}>
                <TouchableWithoutFeedback onPress={() => {
                    this.dismissOverlay();
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {
                            this.state.show ?
                                <View>
                                    {
                                        Platform.OS === 'android' ?
                                            <ProgressView color={AppConfig.COLOR_WHITE}
                                                          style={{width: 30, height: 30}}/>
                                            :
                                            <ActivityIndicator
                                                size="small"
                                                color={AppConfig.COLOR_WHITE}/>
                                    }
                                </View>
                                :
                                <TouchableWithoutFeedback onPress={() => {
                                }}>
                                    <View style={{
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: AppConfig.COLOR_BLACK,
                                        width: width - 50,
                                    }}>
                                        <Text style={{
                                            fontSize: AppConfig.TEXT_SIZE_BIG,
                                            fontWeight: 'bold',
                                            padding: AppConfig.DISTANCE_SAFE,
                                            color: this.props.titleColor ? this.props.titleColor : AppConfig.COLOR_THEME,
                                            backgroundColor: '#00000000',
                                        }}>{"请选择获取方式"}</Text>

                                        <View style={{
                                            flexGrow: 1,
                                            height: AppConfig.LINE_HEIGHT,
                                            backgroundColor: AppConfig.COLOR_LINE
                                        }}/>

                                        <Item text={'相机'} onPress={() => {
                                            this.setState({show: true});

                                            CommonUtil.checkAndRequestPermissions([PermissionsAndroid.PERMISSIONS.CAMERA,
                                                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
                                                () => {
                                                    //启动相机拍照
                                                    ImagePicker.launchCamera(AppConfig.IMAGE_PICKER_OPTIONS, (response) => {
                                                        console.log({response});
                                                        this.dismissOverlay();
                                                        if (!response.error && response.uri && this.props.callback) {
                                                            this.props.callback({
                                                                uri: response.uri,
                                                                path: response.path,
                                                                fileSize: response.fileSize,
                                                                fileName: response.fileName,
                                                                width: response.width,
                                                                height: response.height,
                                                            });
                                                        } else {
                                                            ToastAI.showShortBottom("不能打开照相机！");
                                                        }
                                                    });
                                                }, () => {
                                                    this.dismissOverlay();
                                                });
                                        }}/>

                                        <View style={{
                                            flexGrow: 1,
                                            height: AppConfig.LINE_HEIGHT,
                                            backgroundColor: AppConfig.COLOR_LINE
                                        }}/>

                                        <Item text={'图库'} onPress={() => {
                                            this.setState({show: true});

                                            CommonUtil.checkAndRequestPermissions([PermissionsAndroid.PERMISSIONS.CAMERA,
                                                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE], () => {
                                                //打开系统相册
                                                ImagePicker.launchImageLibrary(AppConfig.IMAGE_PICKER_OPTIONS, (response) => {
                                                    this.dismissOverlay();
                                                    //响应结果处理参考上面样例
                                                    console.log(response);
                                                    if (!response.error && response.uri && this.props.callback) {
                                                        this.props.callback({
                                                            uri: response.uri,
                                                            path: response.path,
                                                            fileSize: response.fileSize,
                                                            fileName: response.fileName,
                                                            width: response.width,
                                                            height: response.height,
                                                        });
                                                    } else {
                                                        ToastAI.showShortBottom("打开图库失败");
                                                    }
                                                });
                                            }, () => {
                                                this.dismissOverlay();
                                            });
                                        }}/>
                                    </View>
                                </TouchableWithoutFeedback>
                        }

                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

class Item extends Component {
    render() {
        return (
            <TouchableButton onPress={this.props.onPress ? this.props.onPress : () => {
            }}>
                <View style={{paddingVertical: AppConfig.DISTANCE_SAFE}}>
                    <Text style={{
                        fontSize: AppConfig.TEXT_SIZE_NORMAL,
                        color: AppConfig.TEXT_COLOR_GRAY,
                        textAlign: 'center'
                    }}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableButton>
        );
    }
}
