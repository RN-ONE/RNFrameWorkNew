/**
 * @Author:JACK-GU
 * @Date:2017-08-08
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet
} from 'react-native';
import {connect} from "react-redux";
import * as TestAction from "../actions/TestAction";
import * as AppConfig from '../config/AppConfig';
import {Navigation} from "react-native-navigation";



class Main2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPosition: 0
        }

    }

    render() {
        return (
            <View style={{backgroundColor: AppConfig.COLOR_BG, flex: 1}}>
            </View>
        )
    }

}

export default connect(state => ({
    text: state.TestReducer.text,
}), dispatch => ({
    getMoveList: (data) => dispatch(TestAction.testGetMoves(data)),
}))(Main2);