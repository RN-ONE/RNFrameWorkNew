/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Navigation} from "react-native-navigation";
import React from 'react';
import NavigationUtil from "./app/util/NavigationUtil";
import Index from "./app/Index";
import Main from "./app/scene/Main";
import Main2 from "./app/scene/Main2";
import {LoginIndex, AppStyle, AppIndex} from "./app/RNNConfig";
import Main3 from "./app/scene/Main3";
import * as Const from './app/config/Const';
import ChangeTheme from "./app/scene/ChangeTheme";
import FlatListScene from "./app/scene/FlatListScene";
import LoadingModal from "./app/modal/LoadingModal";
import SelectModal from "./app/modal/SelectModal";
import ImagePickerModal from "./app/modal/ImagePickerModal";
import ImageShowModal from "./app/modal/ImageShowModal";
import CheckCodePushUpdateUtil from "./app/util/CheckCodePushUpdateUtil";
import MessageDialogModal from "./app/modal/MessageDialogModal";
import Table1 from "./app/scene/Table1";
import Table2 from "./app/scene/Table2";
import Table3 from "./app/scene/Table3";

/*************************************************************************/
NavigationUtil.registerComponentWithRedux(Const.RNN_INDEX, Index);
NavigationUtil.registerComponentWithRedux(Const.RNN_MAIN, Main);
NavigationUtil.registerComponentWithRedux(Const.RNN_MAIN2, Main2);
NavigationUtil.registerComponentWithRedux(Const.RNN_MAIN3, Main3);
NavigationUtil.registerComponentWithRedux(Const.RNN_CHANG_THEME, ChangeTheme);
NavigationUtil.registerComponentWithRedux(Const.RNN_FLAT_LIST_SCENE, FlatListScene);
NavigationUtil.registerComponentWithRedux(Const.RNN_LOADING_OVER_LAY, LoadingModal);
NavigationUtil.registerComponentWithRedux(Const.RNN_SELECT_OVER_LAY, SelectModal);
NavigationUtil.registerComponentWithRedux(Const.RNN_IMAGE_PICKER_OVER_LAY, ImagePickerModal);
NavigationUtil.registerComponentWithRedux(Const.RNN_IMAGE_SHOW_OVER_LAY, ImageShowModal);
NavigationUtil.registerComponentWithRedux(Const.RNN_MESSAGE_DIALOG_OVER_LAY, MessageDialogModal);
NavigationUtil.registerComponentWithRedux(Const.RNN_TABLE1, Table1);
NavigationUtil.registerComponentWithRedux(Const.RNN_TABLE2, Table2);
NavigationUtil.registerComponentWithRedux(Const.RNN_TABLE3, Table3);
/*************************************************************************/


Navigation.events().registerAppLaunchedListener(() => {

    Navigation.setDefaultOptions(AppStyle);

    Navigation.setRoot({
        root: LoginIndex
    });
    //测试不需要热更新
    //CheckCodePushUpdateUtil.checkUpdate();
});


console.disableYellowBox = true;


