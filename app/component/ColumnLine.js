/**
 * 竖直的线
 *
 * @Author:JACK-GU
 * @Date:2019-05-20 16:23
 * @E-Mail:528489389@qq.com
 */
import React, {Component} from 'react';
import {
    View, Text
} from 'react-native';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import * as Const from '../config/Const';
import TouchableButton from "./TouchableButton";
import NavigationUtil from "../util/NavigationUtil";
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputPlateComponent from "./InputPlateComponent";

export default class ColumnLine extends Component {
    propTypes = {
        color: PropTypes.color, //背景色
    };

    render() {
        return (
            <View style={{flexDirection: 'column'}}>
                <View style={{flex: 1, width: AppConfig.LINE_HEIGHT, backgroundColor: this.props.color ? this.props.color : AppConfig.COLOR_LINE}}/>
            </View>
        );
    }
}
