/**
 * @Author:JACK-GU
 * @Date:2017/12/28
 * @E-Mail:528489389@qq.com
 * @Describe: 查看大图的modal
 */
import React from 'react';
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
    ActivityIndicator, BackHandler
} from "react-native";
import {connect} from "react-redux";
import * as AppConfig from '../config/AppConfig';
import TouchableButton from "../component/TouchableButton";
import ToastAI from "../component/ToastAI";
import IphoneXUtil from "../util/IphoneXUtil";
import Gallery from '../component/swipe/Gallery';
import NavigationUtil from "../util/NavigationUtil";
import CommonUtil from "../util/CommonUtil";
import BaseOverlay from "./BaseOverlay";

let {width, height} = Dimensions.get('window');

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

class ImageShowOverlay extends BaseOverlay {
    constructor(props) {
        super(props);

        let uris = [];
        for (let item of props.items) {
            uris.push(item.uri);
        }

        this.state = {
            uris: uris,
            index: 0,
            images: uris.length,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.setState({index: this.props.index});
    }

    componentWillReceiveProps(next) {
    }


    render() {
        return (
            <View style={[
                styles.container,
                {
                    backgroundColor: "rgba(0,0,0,1)"
                }]}>
                <View style={{alignItems: 'center'}}>
                    <View style={{
                        width: width,
                        height: height,
                    }}>
                        <Gallery
                            onPageSelected={(page) => {
                                this.setState({index: page});
                            }}
                            initialPage={this.state.index}
                            style={{flex: 1, backgroundColor: 'black'}}
                            images={this.state.uris}
                        />

                        {this.galleryCount}
                    </View>
                </View>
            </View>
        );
    }

    renderItem({itemIndex, currentIndex, item, animatedValue}) {
        console.log({itemIndex, currentIndex, item, animatedValue});
        return (
            <Image
                source={item.source}
                resizeMode={'contain'}
                style={{height: height, width: width, resizeMode: 'contain'}}/>
        );
    }

    get galleryCount() {
        return (
            <View style={{
                top: 10,
                paddingTop: Platform.OS === 'android' ? CommonUtil.statusBarHeight / PixelRatio.get() :
                    IphoneXUtil.isIphoneX() ? 44 : 20,
                width: '100%',
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableButton onPress={() => {
                    this.dismissOverlay();
                }}>
                    <Image
                        style={{
                            marginLeft: 20,
                            height: 30,
                            width: 30
                        }}
                        source={require('../img/view_image_pop.png')}/>
                </TouchableButton>

                <Text style={{
                    textAlign: 'right',
                    flex: 1,
                    color: 'white',
                    fontSize: 25,
                    fontStyle: 'italic',
                    paddingRight: 20
                }}>
                    {this.state.index + 1}

                    <Text style={{
                        textAlign: 'right',
                        color: 'white',
                        fontSize: AppConfig.TEXT_SIZE_BIG,
                        fontStyle: 'normal',
                        paddingRight: 20
                    }}> / {this.state.uris.length}
                    </Text>
                </Text>
            </View>
        );
    }
}


export default connect(state => ({}), dispatch => ({}))(ImageShowOverlay);
