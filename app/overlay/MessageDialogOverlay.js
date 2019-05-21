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
import DialogMessage from "../component/DialogMessage";
import {connect} from "react-redux";
import BaseOverlay from "./BaseOverlay";

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

class MessageDialogOverlay extends BaseOverlay {
    constructor(props) {
        super(props);
    }

    canCancel(): boolean {
        return this.props.canCancel;
    }

    componentDidMount() {
        super.componentDidMount();
        this.dialogBox.confirm(this.props.confirm);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                if (this.props.canCancel) {
                    this.dismissOverlay();
                }
            }}>
                <View style={[
                    styles.container,
                    {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }]}>

                    <DialogMessage
                        dismissCallBack={() => {
                            this.dismissOverlay();
                        }}
                        ref={(dialogBox) => {
                            this.dialogBox = dialogBox;
                        }}/>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default connect(state => ({}), dispatch => ({}))(MessageDialogOverlay);
