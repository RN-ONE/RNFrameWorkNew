/**
 * 测试的flatList
 *
 * @Author:JACK-GU
 * @Date:2018-09-17
 * @E-Mail:528489389@qq.com
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Dimensions, Text, StyleSheet} from "react-native";
import ThemeButton from "../component/ThemeButton";
import IphoneXView from "../component/IphoneXView";


const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'red'
    },
    row: {
        padding: 10,
        height: 125,
        width,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        marginBottom: -1,
        borderBottomColor: '#E5EDF5',
        borderTopColor: '#E5EDF5',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: '#6da3d0'
    },
    navText: {
        color: '#6da3d0',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 30
    }
});

class FlatListScene extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {data: [],};
    }

    static options(passProps) {
        return {};
    }

    render() {
        return (
            <IphoneXView style={styles.container}>
                <View style={{flex: 1, backgroundColor: 'yellow'}}></View>
                {/*<ThemeButton text={"这是一个按钮"} textColor={'white'}/>*/}
            </IphoneXView>
        );
    }
}


export default connect(state => ({}), dispatch => ({}))(FlatListScene);
