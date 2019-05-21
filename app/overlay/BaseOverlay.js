import {BackHandler} from "react-native";
import NavigationUtil from "../util/NavigationUtil";
import React, {Component} from 'react';

/**
 * 基本的类
 *
 *
 * @Author:JACK-GU
 * @Date:2019-05-21 08:40
 * @E-Mail:528489389@qq.com
 */
export default class BaseOverlay extends Component {
    componentDidMount(): void {
        this.backHandler = BackHandler.addEventListener(new Date().getTime().toString(), () => {
            //表示消费了这个事件
            if (this.canCancel())
            this.dismissOverlay();
            return true;
        });
    }

    componentWillUnmount(): void {
        this.backHandler.remove();
    }

    /**
     *返回是不是可以取消
     *
     * @Author: JACK-GU
     * @Date: 2019-05-21 10:20
     * @E-Mail: 528489389@qq.com
     */
    canCancel() {
        return true;
    }


    /**
     *消失
     *
     * @Author: JACK-GU
     * @Date: 2019-05-21 08:40
     * @E-Mail: 528489389@qq.com
     */
    dismissOverlay() {
        NavigationUtil.disMissOverLayOrModal(this.props.componentId);
    }
}
