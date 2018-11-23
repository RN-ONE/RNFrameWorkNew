/**
 * @Author:JACK-GU
 * @Date:2018-11-08
 * @E-Mail:528489389@qq.com
 * @Describe: 配置Navigation
 */

import {
    BackHandler
} from "react-native";
import {Provider} from 'react-redux';
import CreateStore from '../CreateStore';
import {Navigation} from "react-native-navigation";
import * as Const from "../config/Const";

const store = CreateStore();

export default class NavigationUtil {
    /**
     *
     * 这个是注册Redux
     *
     *@param screenID 场景ID，字符串
     *@param name 场景
     *
     * @Author: JACK-GU
     * @Date: 2018-11-08 15:42
     * @E-Mail: 528489389@qq.com
     */
    static registerComponentWithRedux(screenID, name) {
        Navigation.registerComponentWithRedux(screenID, () => name, Provider, store);
    }

    /**
     *@param screenID 场景ID，字符串
     * @param name 场景
     *
     * @Author: JACK-GU
     * @Date: 2018-11-08 15:42
     * @E-Mail: 528489389@qq.com
     */
    static registerComponent(screenID, name) {
        Navigation.registerComponent(screenID, () => name);
    }

    /**
     *可以在Navigation直接使用的Component,会隐藏掉bottomTabs
     *
     * @param name 组件名字
     * @param title 需要显示的标题
     * @param param 需要传递过去的参数，没有就不传
     *
     * @Author: JACK-GU
     * @Date: 2018-11-22 15:29
     * @E-Mail: 528489389@qq.com
     */
    static getRNNComponent(name, title, param) {
        return {
            component: {
                id: name,
                name: name,
                passProps: param ? param : {},
                options: {
                    topBar: {
                        title: {
                            text: title,
                        }
                    },
                    bottomTabs: {
                        visible: false,
                    }
                }
            }
        }
    }


    /**
     *可以在Navigation直接使用的Overlay,会隐藏掉bottomTabs,topBar
     *
     * @param name 覆盖物名字
     * @param param 需要传递过去的参数，没有就不传
     *
     * @Author: JACK-GU
     * @Date: 2018-11-22 15:29
     * @E-Mail: 528489389@qq.com
     */
    static getRNNOverlay(name, param) {
        return {
            component: {
                id: name,
                name: name,
                passProps: param ? param : {},
                options: {
                    topBar: {
                        visible: false,
                    },
                    bottomTabs: {
                        visible: false,
                    },
                    layout: {
                        backgroundColor: '#00000000'
                    }
                },
            }
        }
    }


    /**
     *显示loading
     *
     * @param message 消息
     *
     * @Author: JACK-GU
     * @Date: 2018-11-23 08:44
     * @E-Mail: 528489389@qq.com
     */
    static showLoadingOverLay(message) {
        Navigation.showOverlay(NavigationUtil.getRNNOverlay(Const.RNN_LOADING_OVER_LAY,{message}))
            .then((result) => {
                console.log({result});
            }).catch((error) => {
            console.log({error});
        });
    }

    /**
     *隐藏掉显示loading
     *
     * @Author: JACK-GU
     * @Date: 2018-11-23 08:45
     * @E-Mail: 528489389@qq.com
     */
    static dismissLoadingOverLay() {
        Navigation.dismissOverlay(Const.RNN_LOADING_OVER_LAY)
            .then((result) => {
                console.log({result});
            }).catch((error) => {
            console.log({error});
        });
    }

    /**
     *显示选择的对话框
     *
     * @param  param 参数,显示这个对话框的需要的参数
     * @see SelectModal
     *
     * @Author: JACK-GU
     * @Date: 2018-11-23 08:52
     * @E-Mail: 528489389@qq.com
     */
    static showSelectOverLay(param) {
        Navigation.showOverlay(NavigationUtil.getRNNOverlay(Const.RNN_SELECT_OVER_LAY, param))
            .then((result) => {
                console.log({result});
            }).catch((error) => {
            console.log({error});
        });
    }

    /**
     *隐藏选择的对话框
     *
     * @Author: JACK-GU
     * @Date: 2018-11-23 08:54
     * @E-Mail: 528489389@qq.com
     */
    static dismissSelectOverLay() {
        Navigation.dismissOverlay(Const.RNN_SELECT_OVER_LAY)
            .then((result) => {
                console.log({result});
            }).catch((error) => {
            console.log({error});
        });
    }


    /**
     *显示图片预览对话框
     *
     * @param param 参数
     * @see ImageShowModal
     *
     * @Author: JACK-GU
     * @Date: 2018-11-23 08:52
     * @E-Mail: 528489389@qq.com
     */
    static showImageShowOverLay(param) {
        Navigation.showOverlay(NavigationUtil.getRNNOverlay(Const.RNN_IMAGE_SHOW_OVER_LAY, param))
            .then((result) => {
                console.log({result});
            }).catch((error) => {
            console.log({error});
        });
    }

    /**
     *隐藏图片预览对话框
     *
     * @Author: JACK-GU
     * @Date: 2018-11-23 08:54
     * @E-Mail: 528489389@qq.com
     */
    static dismissImageShowOverLay() {
        Navigation.dismissOverlay(Const.RNN_IMAGE_SHOW_OVER_LAY)
            .then((result) => {
                console.log({result});
            }).catch((error) => {
            console.log({error});
        });
    }


    /**
     *显示消息提示框，可以是多个按钮的
     *
     * @param param 参数
     * @see DialogMessage
     * @param canCancel 是不是可以取消,默认是可以的
     *
     * @Author: JACK-GU
     * @Date: 2018-11-23 08:52
     * @E-Mail: 528489389@qq.com
     */
    static showMessageDialogOverLay(confirm, canCancel) {
        Navigation.showOverlay(NavigationUtil.getRNNOverlay(Const.RNN_MESSAGE_DIALOG_OVER_LAY, {
            confirm,
            canCancel: canCancel === undefined ? true : canCancel
        })).then((result) => {
            console.log({result});
        }).catch((error) => {
            console.log({error});
        });
    }

    /**
     *隐藏消息提示框，可以是多个按钮的
     *
     * @Author: JACK-GU
     * @Date: 2018-11-23 08:54
     * @E-Mail: 528489389@qq.com
     */
    static dismissMessageDialogOverLay() {
        Navigation.dismissOverlay(Const.RNN_MESSAGE_DIALOG_OVER_LAY)
            .then((result) => {
                console.log({result});
            }).catch((error) => {
            console.log({error});
        });
    }
}