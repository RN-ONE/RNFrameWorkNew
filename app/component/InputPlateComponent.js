/**
 * 车牌输入
 *
 *
 * @Author:JACK-GU
 * @Date:2019-05-15 14:47
 * @E-Mail:528489389@qq.com
 */
import React, {Component} from 'react';
import {
    View, Text
} from 'react-native';
import * as AppConfig from '../config/AppConfig';
import * as Const from '../config/Const';
import TouchableButton from "./TouchableButton";
import NavigationUtil from "../util/NavigationUtil";
import {Navigation} from "react-native-navigation";
import PropTypes from 'prop-types';


export default class InputPlateComponent extends Component {
    static propTypes = {
        plate: PropTypes.string,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {plateText: props.plateText ? props.plateText : ""};
    }

    /**
     *获取当前的车牌
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:46
     * @E-Mail: 528489389@qq.com
     */
    getPlate() {
        return this.state.plateText;
    }

    render() {
        return (
            <View style={[this.props.style, {
                borderRadius: 5,
                borderWidth: 0,
                borderColor: AppConfig
            }]}>

                <TouchableButton style={{flex: 1}} onPress={() => {
                    NavigationUtil.showOverLayOrModal(Const.RNN_INPUT_PLATE_OVER_LAY, {
                        plateText: this.state.plateText,
                        callBackPlate: (plate) => {
                            this.setState({plateText: plate});
                        }
                    });
                }}>
                    <Text
                        style={{
                            fontSize: AppConfig.TEXT_SIZE_NORMAL,
                            color: this.state.plateText && this.state.plateText.length > 0 ? AppConfig.COLOR_BLACK : AppConfig.TEXT_COLOR_GRAY,
                            paddingHorizontal: AppConfig.DISTANCE_SAFE / 2,
                            paddingVertical: AppConfig.DISTANCE_SAFE
                        }}>
                        {this.state.plateText && this.state.plateText.length > 0 ? this.state.plateText : "点击输入车牌"}
                    </Text>
                </TouchableButton>

            </View>
        );
    }
}

