/**
 *
 * 注意，如果需要跳转回退页面也显示，可以所以用setTimeout来延迟一下
 *  setTimeout(() => {
                        ToastAI.showShortBottom("登录成功");
                    }, 100);
 * @Author:JACK-GU
 * @Date:2017-08-14
 * @E-Mail:528489389@qq.com
 * @Describe: toast,适用于android和ios
 */
import Toast from 'react-native-root-toast';
import * as AppConfig from '../config/AppConfig';
import IphoneXUtil from "../util/IphoneXUtil";

const BC = "#242424";
export default class ToastAI {

    static showShortTop(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            backgroundColor: BC,
            hideOnPress: true,
            delay: 0,
            textStyle: {
                fontSize: AppConfig.TEXT_SIZE_SMALL
            },
            containerStyle: {
                paddingVertical: AppConfig.DISTANCE_SAFE / 2,
                paddingHorizontal: AppConfig.DISTANCE_SAFE,
                marginTop: 80,
            }
        });
    }

    static showShortBottom(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: BC,
            textStyle: {
                fontSize: AppConfig.TEXT_SIZE_SMALL
            },
            containerStyle: {
                marginBottom: IphoneXUtil.isIphoneX() ? 50 + IphoneXUtil.iphoneXBottom() : 50,
                paddingVertical: AppConfig.DISTANCE_SAFE / 2,
                paddingHorizontal: AppConfig.DISTANCE_SAFE,
            },
            delay: 0,
        });
    }


    static showShortCenter(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            backgroundColor: BC,
            hideOnPress: true,
            delay: 0,
            textStyle: {
                fontSize: AppConfig.TEXT_SIZE_SMALL
            },
            containerStyle: {
                paddingVertical: AppConfig.DISTANCE_SAFE / 2,
                paddingHorizontal: AppConfig.DISTANCE_SAFE,
            }
        });
    }

    static showLongTop(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            backgroundColor: BC,
            hideOnPress: true,
            textStyle: {
                fontSize: AppConfig.TEXT_SIZE_SMALL
            },
            delay: 0,
            containerStyle: {
                marginTop: 80,
                paddingVertical: AppConfig.DISTANCE_SAFE / 2,
                paddingHorizontal: AppConfig.DISTANCE_SAFE,
            }
        });
    }

    static showLongBottom(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            textStyle: {
                fontSize: AppConfig.TEXT_SIZE_SMALL
            },
            hideOnPress: true,
            backgroundColor: BC,
            delay: 0,
            containerStyle: {
                paddingVertical: AppConfig.DISTANCE_SAFE / 2,
                paddingHorizontal: AppConfig.DISTANCE_SAFE,
                marginBottom: IphoneXUtil.isIphoneX() ? 50 + IphoneXUtil.iphoneXBottom() : 50,
            }
        });
    }


    static showLongCenter(message) {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            backgroundColor: BC,
            textStyle: {
                fontSize: AppConfig.TEXT_SIZE_SMALL
            },
            hideOnPress: true,
            delay: 0,
            containerStyle: {
                paddingVertical: AppConfig.DISTANCE_SAFE / 2,
                paddingHorizontal: AppConfig.DISTANCE_SAFE,
            }
        });
    }

}
