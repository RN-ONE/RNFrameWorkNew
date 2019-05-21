/**
 * @Author:JACK-GU
 * @Date:2017/12/28
 * @E-Mail:528489389@qq.com
 * @Describe: 显示选择的modal
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    PixelRatio,
    NativeModules,
    Modal,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    BackHandler
} from "react-native";
import {connect} from "react-redux";
import * as AppConfig from '../config/AppConfig';
import TouchableButton from "../component/TouchableButton";
import ToastAI from "../component/ToastAI";
import NavigationUtil from "../util/NavigationUtil";
import BaseOverlay from "./BaseOverlay";

let {width, height} = Dimensions.get('window');
let DISTANCE = 20;

var styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
});

/**
 *
 {
  textAlign: 'left', //文字的边
  text: '按钮4',//按钮的文字
  color: 'red',//按钮文字颜色
  res: require('../img/dog1.jpg'),//按钮的图标
 }
 * */
class SelectOverlay extends BaseOverlay {
    static propTypes = {
        items: PropTypes.array,
        tipsColor: PropTypes.color,
        tips: PropTypes.string,
        title: PropTypes.string,
        onPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {visible: true};
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.dismissOverlay();
            }}>
                <View style={[
                    styles.container,
                    {
                        width: width,
                        height: height,
                        backgroundColor: "rgba(0,0,0,0.8)"
                    }]}>
                    <View style={{alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            <View style={{
                                width: width - 2 * DISTANCE,
                                backgroundColor: 'white',
                                borderColor: 'white',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}>

                                <Text style={{
                                    padding: AppConfig.DISTANCE_SAFE,
                                    color: AppConfig.COLOR_THEME,
                                    fontSize: AppConfig.TEXT_SIZE_BIG,
                                    fontWeight: 'bold',
                                }}>{this.props.title}</Text>

                                {
                                    this.props.tips ?
                                        <Text style={{
                                            marginBottom: AppConfig.DISTANCE_SAFE,
                                            paddingHorizontal: AppConfig.DISTANCE_SAFE,
                                            color: this.props.tipsColor ? this.props.tipsColor : 'red',
                                            fontSize: AppConfig.TEXT_SIZE_SMALL
                                        }}>{this.props.tips}</Text>
                                        : null
                                }


                                {(() => {
                                    let btnContent = [];
                                    this.props.items.forEach((btn, index,) => {

                                        btnContent.push(
                                            <View style={{
                                                width: width - 2 * DISTANCE,
                                                height: AppConfig.LINE_HEIGHT,
                                                backgroundColor: AppConfig.COLOR_LINE
                                            }}/>
                                        );
                                        btnContent.push(
                                            <Item
                                                onPress={() => {
                                                    this.props.onPress ? this.props.onPress(index) : null
                                                }}
                                                color={AppConfig.COLOR_BLACK}
                                                item={btn}/>
                                        );
                                    });
                                    return btnContent;
                                })()}

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class Item extends Component {

    render() {
        return (
            <TouchableButton onPress={() => {
                this.props.onPress ? this.props.onPress() : null;
            }}>
                <View style={{
                    padding: AppConfig.DISTANCE_SAFE,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    {
                        this.props.item.res ?
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginRight: AppConfig.DISTANCE_SAFE
                                }}
                                source={this.props.item.res}/>
                            : null
                    }
                    <Text
                        style={{
                            flex: 1,
                            textAlign: this.props.item.textAlign ? this.props.item.textAlign : 'center',
                            fontSize: AppConfig.TEXT_SIZE_NORMAL,
                            color: this.props.item.color ? this.props.item.color
                                : this.props.color
                        }}>
                        {this.props.item.text}
                    </Text>
                </View>
            </TouchableButton>
        );
    }
}


export default connect(state => ({}), dispatch => ({}))(SelectOverlay);
