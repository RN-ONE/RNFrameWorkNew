/**
 *
 * 提示用户有更新
 *
 *@Author: JACK-GU
 *@Date: 2018/2/28 10:54
 *@E-Mail: 528489389@qq.com
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    ProgressViewIOS,
    ActivityIndicator, BackHandler, TouchableWithoutFeedback
} from "react-native";
import ProgressView from '../native/ProgressView';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import DialogMessage from "../component/DialogMessage";
import {connect} from "react-redux";
import NavigationUtil from "../util/NavigationUtil";
import ToastAI from "../component/ToastAI";

let {height, width} = Dimensions.get('window');
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

class MessageDialogOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.backHandler = BackHandler.addEventListener('TipMessageModalHardwareBackPress',
            () => {
                //表示消费了这个事件
                if (props.canCancel) {
                    NavigationUtil.dismissMessageDialogOverLay();
                }
                return true;
            });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    componentDidMount() {
        this.dialogBox.confirm(this.props.confirm);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                if (this.props.canCancel) {
                    NavigationUtil.dismissMessageDialogOverLay();
                }
            }}>
                <View style={[
                    styles.container,
                    {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }]}>

                    <DialogMessage
                        dismissCallBack={() => {
                            NavigationUtil.dismissMessageDialogOverLay();
                        }}
                        ref={(dialogBox) => {
                            this.dialogBox = dialogBox;
                        }}/>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default connect(state => ({
    text: state.TestReducer.text,
}), dispatch => ({}))(MessageDialogOverlay);
