import {Navigation} from "react-native-navigation";
import {NativeModules, Platform} from "react-native";
import ToastAI from "../component/ToastAI";
import {PermissionsAndroid} from 'react-native';

/**
 * 常用的工具类
 *
 * @Author:JACK-GU
 * @Date:2019-05-10 15:35
 * @E-Mail:528489389@qq.com
 */

export default class CommonUtil {
    static topBarHeight = 0;
    static bottomTabsHeight = 0;
    static statusBarHeight = 0;
    static isDebug = false;

    static init() {
        CommonUtil.getConstFromNavigation().then();


        //获取是不是debug模式
        if (Platform.OS === 'android') {
            NativeModules.NativeUtilsModule.isDebug((isDebug) => {
                CommonUtil.isDebug = isDebug;
            });
        } else {
            var Utils = NativeModules.Utils;
            Utils.addEventIsDebug((isDebug) => {
                CommonUtil.isDebug = isDebug;
            });
        }
    }

    /**
     *
     * 获取高度，这个方法不需要外部调用，启动的时候会在init里面调用
     *
     * @Author: JACK-GU
     * @Date: 2019-05-10 13:36
     * @E-Mail: 528489389@qq.com
     */
    static async getConstFromNavigation() {
        if (Platform.OS === 'android') {
            let constants = await Navigation.constants();
            CommonUtil.topBarHeight = constants.topBarHeight;
            CommonUtil.bottomTabsHeight = constants.bottomTabsHeight;
            CommonUtil.statusBarHeight = constants.statusBarHeight;
        } else {
            //自己写的才可以
            let constants = await NativeModules.Utils.addEventRNNConst();
            console.log({constants});
            CommonUtil.topBarHeight = constants.topBarHeight;
            CommonUtil.bottomTabsHeight = constants.bottomTabsHeight;
            CommonUtil.statusBarHeight = constants.statusBarHeight;
        }
    }

    /**
     *请求或者检查权限是异步的，不用区分平台，苹果的直接返回成功
     *@param permission 权限在PermissionsAndroid.PERMISSIONS，数组
     * @param granted 用户同意了所有权限，如果有没有同意的就会调用denied
     * @param denied 用户拒绝，返回权限的名字
     * @Author: JACK-GU
     * @Date: 2019-05-14 11:18
     * @E-Mail: 528489389@qq.com
     */
    static checkAndRequestPermissions(permission: Array<string>, granted, denied) {
        if (Platform.OS === 'android') {
            PermissionsAndroid.requestMultiple(permission).then((value) => {
                    let deniedPermission = [];
                    for (const string of permission) {
                        if (value[string] === PermissionsAndroid.RESULTS.GRANTED) {
                        } else {
                            deniedPermission.push(string);
                        }
                    }

                    //成功
                    if (deniedPermission.length === 0) {
                        granted();
                    } else {
                        //拒绝了
                        if (denied) {
                            denied(deniedPermission);
                        }
                    }
                }
            );
        } else {
            if (granted) {
                granted();
            }
        }
    }

    static isAndroid() {
        return Platform.OS === 'android';
    }


}
