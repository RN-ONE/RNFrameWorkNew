/**
 *
 * 热更新检查更新
 *
 * @Author:JACK-GU
 * @Date:2018-10-22
 * @E-Mail:528489389@qq.com
 */
import codePush from "react-native-code-push";
import ToastAI from "../component/ToastAI";
import NavigationUtil from "./NavigationUtil";
import * as AppConfig from "../config/AppConfig";
import {
    DeviceEventEmitter
} from "react-native";
import LoadingOverlay from "../overlay/LoadingOverlay";

export default class CheckCodePushUpdateUtil {
    /**
     *
     * 开始检查更新
     *
     * @Author: JACK-GU
     * @Date: 2018-10-22 14:42
     * @E-Mail: 528489389@qq.com
     */
    static checkUpdate() {
        codePush.checkForUpdate(codePush.CheckFrequency.ON_APP_START)
            .then((update) => {
                if (update) {
                    //有更新，提示用户
                    NavigationUtil.showMessageDialogOverLay({
                        title: '检查到新版本',//标题
                        titleColor: AppConfig.COLOR_THEME,
                        contentColor: AppConfig.TEXT_COLOR_GRAY,//内容颜色
                        content: [update.description],//内容
                        ok: {
                            text: '立即更新',
                            callback: () => {
                                NavigationUtil.dismissMessageDialogOverLay();
                                //立即更新
                                CheckCodePushUpdateUtil.deal(update);
                            },
                        },
                        cancel: {
                            text: '在看看',
                            callback: () => {
                                NavigationUtil.dismissMessageDialogOverLay();
                            },
                            color: AppConfig.TEXT_COLOR_GRAY,
                        }
                    }, true);
                } else {
                }
            }).catch((error) => {
            console.log({error});
        });
    }


    static error() {
        NavigationUtil.showMessageDialogOverLay({
            title: '温馨提示',//标题
            titleColor: AppConfig.COLOR_THEME,
            contentColor: AppConfig.TEXT_COLOR_GRAY,//内容颜色
            content: ['更新出错，请联系管理员！'],//内容
            ok: {
                text: '我知道了',
                callback: () => {
                    NavigationUtil.dismissMessageDialogOverLay();
                },
            }
        }, true);
    }


    static deal(update) {
        NavigationUtil.showLoadingOverLay("0%");
        codePush.disallowRestart();
        //确定之后，开始下载
        update.download(CheckCodePushUpdateUtil.down).then(instance => {
            //下载完成了，调用这个方法
            console.log("开始安装");
            instance.install(codePush.InstallMode.IMMEDIATE).then(() => {
                console.log("安装完成");
                codePush.notifyAppReady();
                codePush.allowRestart();
                codePush.restartApp(true);
            }).catch(reason => {
                CheckCodePushUpdateUtil.error();
            });
        }).catch((reason) => {
            CheckCodePushUpdateUtil.error();
        });
    }

    static down(downloadProgress) {
        let n = (downloadProgress.receivedBytes / downloadProgress.totalBytes) * 100;
        DeviceEventEmitter.emit(LoadingOverlay.LOADING_REFRESH, n.toFixed(2) + "%");
    }
}
