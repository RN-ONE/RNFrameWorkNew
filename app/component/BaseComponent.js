/**
 * 基础的component
 *
 * @Author:JACK-GU
 * @Date:2019-05-15 10:50
 * @E-Mail:528489389@qq.com
 */
import React, {Component} from 'react';
import {Navigation} from "react-native-navigation";
import ToastAI from "./ToastAI";
import {BackHandler} from "react-native";

export default class BaseComponent extends Component {

    componentDidMount(): void {
        //绑定页面
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    componentWillUnmount(): void {
        console.log("component lifecycle =====> componentWillUnmount");
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }
    }

    /**
     *导航按钮被点击的时候调用
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 10:54
     * @E-Mail: 528489389@qq.com
     */
    navigationButtonPressed({buttonId}) {
        console.log("navigationButtonPressed buttonId =====>" + buttonId);
    }

    /**
     *页面显示的时候调用
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 10:53
     * @E-Mail: 528489389@qq.com
     */
    componentDidAppear() {
        console.log("component lifecycle =====> componentDidAppear");
    }

    /**
     *页面影藏的时候调用
     *
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 10:52
     * @E-Mail: 528489389@qq.com
     */
    componentDidDisappear() {
        console.log("component lifecycle =====> componentDidDisappear");
    }
}
