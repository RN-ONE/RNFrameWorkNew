import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Platform,
    BackHandler,
    ProgressViewIOS,
    ActivityIndicator,
    DeviceEventEmitter
} from "react-native";
import ProgressView from '../native/ProgressView';
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import NavigationUtil from "../util/NavigationUtil";
import BaseOverlay from "./BaseOverlay";

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

export default class LoadingOverlay extends BaseOverlay {
    static LOADING_REFRESH = "LOADING_REFRESH";

    constructor(props) {
        super(props);

        this.state = {
            message: props.message,
        };

        this.deviceEventEmitter = DeviceEventEmitter.addListener(LoadingOverlay.LOADING_REFRESH,
            (message) => {
                this.setState({message})
            });
    }

    canCancel(): boolean {
        return false;
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.deviceEventEmitter.remove();
    }

    render() {
        return (
            <View style={[
                styles.container,
                {
                    backgroundColor: "rgba(0,0,0,0.5)",
                }]}>
                <View style={{
                    justifyContent: "center",
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: AppConfig.COLOR_BLACK,
                    alignItems: "center",
                    padding: AppConfig.DISTANCE_SAFE,
                    backgroundColor: AppConfig.COLOR_BLACK,
                }}>

                    <View style={{alignItems: 'center'}}>
                        {
                            Platform.OS === 'android' ?
                                <ProgressView color={AppConfig.COLOR_WHITE}
                                              style={{width: 30, height: 30}}/>
                                :
                                <ActivityIndicator
                                    size="small"
                                    color={AppConfig.COLOR_WHITE}/>
                        }

                        <Text style={
                            [AppStyles.textSmallGray,
                                {
                                    color: AppConfig.COLOR_WHITE,
                                    marginTop: AppConfig.DISTANCE_SAFE,
                                }
                            ]}>
                            {this.state.message ? this.state.message : '加载中...'}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
