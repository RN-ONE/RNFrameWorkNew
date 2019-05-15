/**
 * 测试的flatList
 *
 * @Author:JACK-GU
 * @Date:2018-09-17
 * @E-Mail:528489389@qq.com
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Dimensions, Text, StyleSheet, FlatList} from "react-native";
import IphoneXView from "../component/IphoneXView";
import MyFlatList from "../component/MyFlatList";
import BaseComponent from "../component/BaseComponent";


const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
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

class FlatListScene extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        let data = [];
        for (let i = 0; i < 12; i++) {
            data.push("" + i)
        }

        this.state = {data: data, total: 0};
    }


    render() {
        return (
            <IphoneXView style={styles.container}>
                <MyFlatList
                    ref={"flatList"}
                    data={this.state.data}
                    removeClippedSubviews={false}
                    ItemSeparatorComponent={() => {
                        return <View style={{height: 3}}/>
                    }}
                    total={13}
                    keyExtractor={(item, index) => index.toString()}
                    onLoadMore={() => {
                        console.log("onEndReached");
                    }}
                    renderItem={this._renderItem}
                />
            </IphoneXView>
        );
    }


    _renderItem = ({item}) => {
        return <View style={{height: 62, backgroundColor: 'yellow'}}>
            <Text>{item}</Text>
        </View>
    };


    _onRefresh = () => {
        setTimeout(() => {
            this._scrollView.endRefresh();
        }, 3000);
    };

    _onLoading = () => {
        setTimeout(() => {
            this._scrollView.endLoading();
        }, 3000);
    };

}


export default connect(state => ({}), dispatch => ({}))(FlatListScene);
