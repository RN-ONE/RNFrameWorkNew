/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Navigation} from "react-native-navigation";
import React from 'react';
import {LoginComponent, AppDefaultOptions} from "./app/RNNConfig";
import InitUtil from "./app/util/InitUtil";
import CommonUtil from "./app/util/CommonUtil";

//初始化
InitUtil.init();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions(AppDefaultOptions);

    Navigation.setRoot({
        root: LoginComponent()
    }).then(() => {
        CommonUtil.getConstFromNavigation().then();//IOS在获取一下，不然拿不到值有的
    });
    //测试不需要热更新
    //CheckCodePushUpdateUtil.checkUpdate();

});

console.disableYellowBox = true;


