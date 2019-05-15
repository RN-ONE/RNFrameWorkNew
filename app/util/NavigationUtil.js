/**
 * @Author:JACK-GU
 * @Date:2018-11-08
 * @E-Mail:528489389@qq.com
 * @Describe: 配置Navigation
 */

import {Provider} from 'react-redux';
import CreateStore from '../CreateStore';
import {Navigation} from "react-native-navigation";
import * as Const from "../config/Const";
import {ImageRequireSource} from 'react-native';
import * as AppConfig from '../config/AppConfig'
import InitUtil from "./InitUtil";
import CommonUtil from "./CommonUtil";

const store = CreateStore();

export default class NavigationUtil {
    /**
     *
     * 这个是注册Redux
     *
     *@param componentName 场景名字，字符串
     *@param name 场景
     *
     * @Author: JACK-GU
     * @Date: 2018-11-08 15:42
     * @E-Mail: 528489389@qq.com
     */
    static registerComponentWithRedux(componentName, name) {
        Navigation.registerComponentWithRedux(componentName, () => name, Provider, store);
    }

    /**
     *@param componentName 场景名字，字符串
     * @param name 场景
     *
     * @Author: JACK-GU
     * @Date: 2018-11-08 15:42
     * @E-Mail: 528489389@qq.com
     */
    static registerComponent(componentName, name) {
        Navigation.registerComponent(componentName, () => name);
    }

    /**
     *可以在Navigation直接使用的Component,会隐藏掉bottomTabs
     *
     * @param newComponentName push进来的页面的名字
     * @param showBottomTabs 是否显示底部选择
     * @param title 需要显示的标题
     * @param param 需要传递过去的参数，没有就不传
     *
     * @Author: JACK-GU
     * @Date: 2018-11-22 15:29
     * @E-Mail: 528489389@qq.com
     */
    static getRNNComponent(newComponentName, title, param, showBottomTabs) {
        return {
            component: {
                id: newComponentName,
                name: newComponentName,
                passProps: param ? param : {},
                options: {
                    topBar: {
                        title: {
                            text: title,
                        }
                    },
                    bottomTabs: {
                        visible: showBottomTabs ? true : false,
                    }
                }
            }
        }
    }

    /**
     *
     * @param currentComponentId 当前页面的ID，不传的时候就不会有转场动画
     * @param newComponentName push进来的页面的名字
     * @param title 目标页面的标题
     * @param param 参数
     * @Author: JACK-GU
     * @Date: 2019-05-09 14:40
     * @E-Mail: 528489389@qq.com
     */
    static push(currentComponentId, newComponentName, title, param) {
        Navigation.push(currentComponentId, this.getRNNComponent(newComponentName, title, param))
            .then((result) => {
                console.log({result});
            }).catch((error) => {
            console.log({error});
        });
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
                        backgroundColor: "transparent"
                    },
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
        Navigation.showOverlay(NavigationUtil.getRNNOverlay(Const.RNN_LOADING_OVER_LAY, {message}))
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

    /**
     *创建一个顶部title使用的按钮
     *
     * @param id 按钮的ID
     * @param icon 注意icon需要是require的
     *
     * @Author: JACK-GU
     * @Date: 2018-11-26 14:05
     * @E-Mail: 528489389@qq.com
     */
    static createTopBarButton(id: string, icon: ImageRequireSource): any {
        return {id: id, icon: icon};
    }

    /**
     *获取底部含有tabs的组件
     * @param children 需要展示的页面的数组
     *
     * @Author: JACK-GU
     * @Date: 2019-05-10 13:52
     * @E-Mail: 528489389@qq.com
     */
    static getBottomTabsComponent(children) {
        return {
            bottomTabs: {
                children: children
            }
        };
    }

    /**
     *获取底部tab的组件，可以直接作为getBottomTabsComponent的参数
     *
     * @param newComponentName 栈底页面的名字
     * @param title 需要显示的标题
     * @param param 需要传递过去的参数，没有就不传
     * @param icon 图标
     * @Author: JACK-GU
     * @Date: 2019-05-10 13:54
     * @E-Mail: 528489389@qq.com
     */
    static getBottomTabComponent(newComponentName, title, icon, param) {
        let component = NavigationUtil.getStackScene(newComponentName, title, param, true);
        //配置底部的参数，需要text和icon
        let options = component.stack.children[0].component.options;
        component.stack.children[0].component.options.bottomTab = {...options.bottomTab, text: title, icon};

        return component;
    }


    /**
     *
     * IOS暂时不能用，Android可以用
     *
     * @param children 需要展示的页面的数组
     * @param showBottomTabs 是否显示底部选择
     * @return 拿到一个页面的配置，这个页面的顶部有选择栏
     * @Author: JACK-GU
     * @Date: 2019-05-09 15:08
     * @E-Mail: 528489389@qq.com
     */
    static getTopTabsScene(children, showBottomTabs) {
        return {
            topTabs: {
                children: children,
                options: {
                    topTabs: {
                        selectedTabColor: 'white',
                        unselectedTabColor: AppConfig.TEXT_COLOR_GRAY,
                        fontSize: AppConfig.TEXT_SIZE_SMALL,
                        height: AppConfig.TEXT_SIZE_SMALL + AppConfig.DISTANCE_SAFE * 2
                    },
                    topBar: {
                        height: AppConfig.TEXT_SIZE_SMALL + AppConfig.DISTANCE_SAFE * 2 + CommonUtil.topBarHeight,
                    },
                    bottomTabs: {
                        visible: showBottomTabs,
                    },
                }
            }
        };
    }

    /**
     * @param newComponentName 栈底页面的名字
     * @param title 需要显示的标题
     * @param param 需要传递过去的参数，没有就不传
     * @param showBottomTabs 是否显示底部选择
     * @return 拿到一个页面的配置，在一个栈底部，一般的
     * @Author: JACK-GU
     * @Date: 2019-05-09 15:12
     * @E-Mail: 528489389@qq.com
     */
    static getStackScene(newComponentName, title, param, showBottomTabs) {
        return {
            stack: {
                children: [
                    NavigationUtil.getRNNComponent(newComponentName, title, param, showBottomTabs)
                ]
            }
        };
    }

    /**
     * @param newComponentName 页面的名字
     * @param title 需要显示的标题
     * @param showBottomTabs 是否显示底部选择
     * @param param 需要传递过去的参数，没有就不传
     * @return 拿到一个页面的配置，可以放在getTopTabsScene的children参数里面
     * @Author: JACK-GU
     * @Date: 2019-05-09 15:12
     * @E-Mail: 528489389@qq.com
     */
    static getTopTab(newComponentName, title, param, showBottomTabs) {
        let component = NavigationUtil.getRNNComponent(newComponentName, title, param, showBottomTabs); //拿到含栈的页面
        component.component.options = {
            ...component.component.options,
            topTab: {title: title},
        };

        return component;
    }


}
