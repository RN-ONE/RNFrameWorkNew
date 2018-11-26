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
import TitleBar from "../component/TitleBar";
import * as TestAction from "../actions/TestAction";
import TouchableButton from "../component/TouchableButton";
import ThemeButton from "../component/ThemeButton";
import * as AppConfig from '../config/AppConfig';



class Main extends Component {
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
}))(Main);