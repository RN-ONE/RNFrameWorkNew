/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Navigation} from "react-native-navigation";
import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';
import Index from './app/Index';

export default class FrameWork extends Component {
    render() {
        return (
            <Index/>
        )
    }
}

Navigation.registerComponent(`FrameWork`, () => FrameWork);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: "FrameWork"
            }
        }
    });
});
//AppRegistry.registerComponent('FrameWork', () => FrameWork);
console.disableYellowBox = true;
