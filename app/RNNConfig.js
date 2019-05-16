/**
 * RNN的配置文件
 *
 *
 * @Author:JACK-GU
 * @Date:2018-11-22
 * @E-Mail:528489389@qq.com
 * @Describe:
 */
import * as AppConfig from './config/AppConfig';
import * as Const from "./config/Const";
import {Dimensions, PixelRatio, StatusBar, Platform} from "react-native";
import NavigationUtil from "./util/NavigationUtil";
import {OptionsModalTransitionStyle, OptionsModalPresentationStyle} from "react-native-navigation";
import CommonUtil from "./util/CommonUtil";

let {width, height} = Dimensions.get("window");

//定义APP的样式的样式，动画效果只对android有效果，firstSetRoot是整对android是不是启动动画而言的
export const AppDefaultOptions = {
    topBar: {
        animate: true,
        hideOnScroll: false,
        buttonColor: 'black',
        drawBehind: false,
        title: {
            text: 'title',
            fontSize: 20,
            color: AppConfig.COLOR_WHITE,
            alignment: 'center',
        },
        subtitle: {
            fontSize: AppConfig.TEXT_SIZE_SMALL,
            color: AppConfig.TEXT_COLOR_GRAY,
        },
        background: {
            color: AppConfig.COLOR_THEME,
        },
        backButton: {
            color: AppConfig.COLOR_WHITE,
        },
    },
    layout: {
        backgroundColor: AppConfig.COLOR_BG,
        orientation: ['portrait'],
    },
    bottomTabs: {
        backgroundColor: AppConfig.COLOR_WHITE,
        titleDisplayMode: 'alwaysShow',
        drawBehind: true,
    },
    bottomTab: {
        fontSize: AppConfig.TEXT_SIZE_SMALL,
        iconColor: AppConfig.TEXT_COLOR_GRAY,
        selectedIconColor: AppConfig.COLOR_THEME,
        textColor: AppConfig.TEXT_COLOR_GRAY,
        selectedTextColor: AppConfig.COLOR_THEME,
        selectedFontSize: AppConfig.TEXT_SIZE_SMALL,
    },
    overlay: {
        interceptTouchOutside: true
    },
    topTabs: {
        selectedTabColor: AppConfig.COLOR_THEME,
        unselectedTabColor: AppConfig.TEXT_COLOR_GRAY,
        height: 70,
    },
    modalPresentationStyle: CommonUtil.isAndroid() ? OptionsModalPresentationStyle.overCurrentContext : OptionsModalPresentationStyle.overFullScreen,
    modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
    animations: {
        setRoot: {
            x: {
                from: width * PixelRatio.get(),
                to: 0,
                duration: 300,
                interpolation: 'default'
            }
        },
        showModal: {
            y: {
                from: height * PixelRatio.get(),
                to: 0,
                duration: 300,
                interpolation: 'default'
            }
        },
        dismissModal: {
            y: {
                from: 0,
                to: height * PixelRatio.get(),
                duration: 300,
                interpolation: 'default'
            }
        }
    }
};

/**
 *登录的组件
 *
 * @Author: JACK-GU
 * @Date: 2019-05-10 14:02
 * @E-Mail: 528489389@qq.com
 */
export const LoginComponent = () => {
    let component = NavigationUtil.getStackScene(Const.RNN_INDEX, "登录");
    let topBar = component.stack.children[0].component.options.topBar;
    topBar.visible = false;
    topBar.drawBehind = true;

    return component;
};


//这个APP的配置，我们建议先登录在充值为这个
export const AppTableHome = () => {
    return NavigationUtil.getBottomTabsComponent([
        NavigationUtil.getBottomTabComponent(Const.RNN_MAIN, "首页", require('./img/tab_one.png')),
        NavigationUtil.getBottomTabComponent(Const.RNN_MAIN2, "通讯录", require('./img/tab_two.png')),
        NavigationUtil.getBottomTabComponent(Const.RNN_MAIN3, "设置", require('./img/tab_three.png')),
    ]);
};

