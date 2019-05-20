/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Navigation} from "react-native-navigation";
import React from 'react';
import {LoginComponent, AppDefaultOptions, AppTableHome} from "./app/RNNConfig";
import InitUtil from "./app/util/InitUtil";
import CommonUtil from "./app/util/CommonUtil";
import SaveLocalUtil from "./app/util/SaveLoaclUtil";
import * as Const from './app/config/Const';
import User from "./app/entity/User";
import UserUtil from "./app/util/UserUtil";
import CheckCodePushUpdateUtil from "./app/util/CheckCodePushUpdateUtil";

//初始化
InitUtil.init();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions(AppDefaultOptions);

    //先看看是不是登陆了的
    SaveLocalUtil.load(Const.SAVE_LOCAL_LOGINED_USER_DATA, (data: User) => {
        if (data && !CommonUtil.isEmpty(data.userId) && !CommonUtil.isEmpty(data.userName) && !CommonUtil.isEmpty(data.userToken)) {
            //进入主页
            gotoHome(data);
        } else {
            //进入登陆页面
            gotoLogin();
        }
    });

    if (!CommonUtil.isDebug) {
        CheckCodePushUpdateUtil.checkUpdate();
    }

});


let gotoLogin = () => {
    Navigation.setRoot({
        root: LoginComponent()
    }).then(() => {
        CommonUtil.getConstFromNavigation().then();//IOS在获取一下，不然拿不到值有的
    });
};

let gotoHome = (data: User) => {
    //设置成功
    UserUtil.loginSuccess(data);
    Navigation.setRoot({
        root: AppTableHome()
    }).then(() => {
        CommonUtil.getConstFromNavigation().then();//IOS在获取一下，不然拿不到值有的
    });
};


console.disableYellowBox = true;

