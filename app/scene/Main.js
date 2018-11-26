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
    Dimensions,
    NativeModules
} from 'react-native';
import DialogMessage from "../component/DialogMessage";
import * as AppConfig from "../config/AppConfig";
import {connect} from "react-redux";
import * as TestAction from "../actions/TestAction";
import ThemeButton from "../component/ThemeButton";
import ToastAI from "../component/ToastAI";
import PhotoGallery from "../component/photoGallery/PhotoGallery";
import {Navigation} from "react-native-navigation";
import NavigationUtil from "../util/NavigationUtil";
import * as Const from "../config/Const";

let {height, width} = Dimensions.get('window');


class Main extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={{backgroundColor: AppConfig.COLOR_BG, flex: 1}}>

                <ThemeButton
                    backgroundColor={AppConfig.COLOR_THEME}
                    radius={5}
                    text={this.props.text} onPress={() => {
                    NavigationUtil.showLoadingOverLay();
                    this.props.getMoveList({});
                }}/>

                <ThemeButton
                    textColor={AppConfig.COLOR_BLACK}
                    backgroundColor={AppConfig.TEXT_COLOR_GRAY}
                    radius={5}
                    text="跳转页面"
                    onPress={() => {
                        ToastAI.showShortBottom("自定义的Toast，支持Android和iOS！");
                        Navigation.push(this.props.componentId,
                            NavigationUtil.getRNNComponent(Const.RNN_CHANG_THEME, "修改主题"));
                    }}/>

                <ThemeButton
                    textColor={AppConfig.COLOR_WHITE}
                    backgroundColor={AppConfig.COLOR_THEME}
                    radius={5}
                    style={{paddingVertical: 10}}
                    text="测试按钮"
                    onPress={() => {
                        NavigationUtil.showSelectOverLay({
                            items: [
                                {
                                    text: '按钮1',
                                    textAlign: 'left',
                                    color: AppConfig.COLOR_THEME,
                                },
                                {
                                    text: '按钮2',
                                    textAlign: 'right',
                                }
                                ,
                                {
                                    text: '按钮3',
                                    color: 'red',
                                }
                                ,
                                {
                                    textAlign: 'left',
                                    text: '按钮4',
                                    color: 'red',
                                    res: require('../img/dog1.jpg'),
                                }
                            ],
                            tips: "*测试的提示类容",
                            tipsColor: 'red',
                            title: "测试标题",
                            onPress: (index) => {
                                ToastAI.showShortBottom("点击了" + index);
                                NavigationUtil.dismissSelectOverLay();
                            }
                        });
                    }}/>

                <PhotoGallery
                    ref={(photoGallery) => {
                        this.photoGallery = photoGallery;
                    }}
                    layoutWidth={width}
                    widthSeparator={5}
                    maxImageNum={8}
                    perRowNum={4}/>

                <ThemeButton
                    textColor={AppConfig.COLOR_BLACK}
                    backgroundColor={AppConfig.TEXT_COLOR_GRAY}
                    radius={5}
                    text="获得图片数据"
                    onPress={() => {
                        console.log({
                            dataS: this.photoGallery.getDataS()
                        });
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
