/**
 *输入车牌的弹框
 *
 * @Author: JACK-GU
 * @Date: 2019-05-15 15:04
 * @E-Mail: 528489389@qq.com
 */
import {BackHandler, View, FlatList, Text, Dimensions, TouchableWithoutFeedback} from "react-native";
import React, {Component} from 'react';
import {Navigation} from "react-native-navigation";
import * as AppConfig from '../config/AppConfig';
import * as AppStyles from '../config/AppStyles';
import * as Const from '../config/Const';
import TouchableButton from "../component/TouchableButton";
import ToastAI from "../component/ToastAI";
import NavigationUtil from "../util/NavigationUtil";
import IphoneXView from "../component/IphoneXView";
import IphoneXUtil from "../util/IphoneXUtil";
import BaseOverlay from "./BaseOverlay";

let {width} = Dimensions.get("window");

const dataList = [
    ["贵", "川", "渝", "云", "鄂", "湘", "晋", "辽"],
    ["黑", "沪", "吉", "苏", "皖", "赣", "鲁", "豫"],
    ["粤", "桂", "琼", "京", "津", "冀", "浙", "藏"],
    ["陕", "甘", "青", "蒙", "宁", "新", "闽", "警"],
    ["A", "B", "C", "D", "E", "1", "2", "3"],
    ["F", "G", "H", "J", "K", "4", "5", "6"],
    ["L", "M", "N", "O", "P", "7", "8", "9"],
    ["Q", "R", "S", "T", "U", "0", "删", "确"],
    ["V", "W", "X", "Y", "Z", "清除"]];
const distance = 3;

export default class InputPlateOverlay extends BaseOverlay {

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <TouchableWithoutFeedback onPress={() => {
                    this.dismissOverlay();
                }}>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            <View style={{backgroundColor: AppConfig.COLOR_WHITE}}>

                                <HeadView
                                    defaultPlateText={this.props.plateText}
                                    callBack={(plate) => {
                                        this.dismissOverlay();
                                        if (this.props.callBackPlate) {
                                            this.props.callBackPlate(plate);
                                        }
                                    }}
                                    ref={(ref) => {
                                        this.headView = ref;
                                    }}/>

                                <View style={{paddingBottom: distance}}>
                                    {dataList.map((itemColumn, indexColumn) => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    marginHorizontal: distance,
                                                    marginTop: distance,
                                                    justifyContent: 'space-between'
                                                }}>
                                                {
                                                    itemColumn.map((itemRow, indexRow) => {
                                                        return (
                                                            <Item text={itemRow} callBack={(text) => {
                                                                if (this.headView) {
                                                                    this.headView.setText(text);
                                                                }
                                                            }}/>
                                                        );
                                                    })
                                                }
                                            </View>
                                        );
                                    })}
                                </View>

                                {
                                    IphoneXUtil.isIphoneX() ?
                                        <View style={{
                                            width: width,
                                            height: IphoneXUtil.iphoneXBottom(),
                                        }}>
                                            <View style={{
                                                height: 2,
                                                width: width,
                                                backgroundColor: AppConfig.COLOR_BG
                                            }}/>
                                            <View style={{
                                                width: width,
                                                height: IphoneXUtil.iphoneXBottom() - 2,
                                                backgroundColor: this.props.bottomColor ? this.props.bottomColor : 'white',
                                            }}/>
                                        </View>
                                        : null
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}


class HeadView extends Component {
    // 构造
    constructor(props) {
        super(props);


        // 初始状态
        this.state = {selectIndex: 0};
    }

    componentDidMount(): void {
        let defaultPlate: string = this.props.defaultPlateText;

        if (defaultPlate && defaultPlate.length > 0) {
            //分解，然后设置，不用校验这些了，直接设置
            for (let i = 0; i < defaultPlate.length; i++) {
                let headItem = this.getHeadItemFromIndex(i);
                if (headItem) {
                    headItem.setPlate(defaultPlate.charAt(i));
                }
            }
            //设置index
            this.setState({selectIndex: defaultPlate.length < 7 ? defaultPlate.length : 7});
        }
    }

    /**
     *键盘输入的文字设置
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:41
     * @E-Mail: 528489389@qq.com
     */
    setText(text) {
        if (!text) {
            return;
        }

        let index = this.state.selectIndex;

        switch (text) {
            case '删': {
                this.deleteOne(index);
                break;
            }
            case '确': {
                let plate = this.getPlateText();
                if (plate.length >= 7) {
                    if (this.props.callBack) {
                        this.props.callBack(plate)
                    }
                } else {
                    ToastAI.showShortBottom("请输入正确的车牌位数");
                }
                break;
            }
            case '清除': {
                this.clearAll();
                break;
            }
            default:
                this.setPlate(index, text);
                break;
        }
    }

    /**
     *获取车牌，不会是空
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:40
     * @E-Mail: 528489389@qq.com
     */
    getPlateText() {
        return this.headItem0.getPlate() +
            this.headItem1.getPlate() +
            this.headItem2.getPlate() +
            this.headItem3.getPlate() +
            this.headItem4.getPlate() +
            this.headItem5.getPlate() +
            this.headItem6.getPlate() +
            this.headItem7.getPlate();
    }

    /**
     *删除一位
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:40
     * @E-Mail: 528489389@qq.com
     */
    deleteOne(index) {
        let deleteItem = index === 0 ? 0 :
            (index === 7 && this.getHeadItemFromIndex(7).getPlate().length > 0) ? index : index - 1;
        let headItem = this.getHeadItemFromIndex(deleteItem);
        if (headItem) {
            headItem.setPlate("");
        }
        this.setState({selectIndex: deleteItem});
    }

    /**
     *清除
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:40
     * @E-Mail: 528489389@qq.com
     */
    clearAll() {
        //删除全部
        this.headItem0.setPlate("");
        this.headItem1.setPlate("");
        this.headItem2.setPlate("");
        this.headItem3.setPlate("");
        this.headItem4.setPlate("");
        this.headItem5.setPlate("");
        this.headItem6.setPlate("");
        this.headItem7.setPlate("");
        this.setState({selectIndex: 0});
    }

    /**
     *设置车牌，并且判断当前输入的文字能不能在这个位上
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:40
     * @E-Mail: 528489389@qq.com
     */
    setPlate(index, text) {
        if (index === 0) {
            //第一位不许是省份
            if (this.isNumber(text) || this.isABC(text)) {
                ToastAI.showShortBottom("请输入省份");
                return;
            }
            this.headItem0.setPlate(text);
        } else if (index === 6 || index === 7) {
            if (this.isNumber(text) || this.isABC(text) || text === '警') {
                let item = this.getHeadItemFromIndex(index);
                if (item) {
                    item.setPlate(text);
                }
            } else {
                ToastAI.showShortBottom("请输入数字或者字母或者警");
                return;
            }
        } else {
            if (this.isNumber(text) || this.isABC(text)) {
                let item = this.getHeadItemFromIndex(index);
                if (item) {
                    item.setPlate(text);
                }
            } else {
                ToastAI.showShortBottom("请输入数字或者字母");
                return;
            }
        }
        this.setState({selectIndex: this.state.selectIndex + 1 > 7 ? 7 : this.state.selectIndex + 1})
    }

    /**
     *通过index获取当前待输入的item
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:41
     * @E-Mail: 528489389@qq.com
     */
    getHeadItemFromIndex(index): HeadItem {
        let item;
        switch (index) {
            case 0: {
                item = this.headItem0;
                break;
            }
            case 1: {
                item = this.headItem1;
                break;
            }
            case 2: {
                item = this.headItem2;
                break;
            }
            case 3: {
                item = this.headItem3;
                break;
            }
            case 4: {
                item = this.headItem4;
                break;
            }
            case 5: {
                item = this.headItem5;
                break;
            }
            case 6: {
                item = this.headItem6;
                break;
            }
            case 7: {
                item = this.headItem7;
                break;
            }
            default:
                item = this.headItem0;
                break;
        }

        return item;
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                marginHorizontal: distance,
                marginTop: AppConfig.DISTANCE_SAFE,
                paddingBottom: AppConfig.DISTANCE_SAFE - distance,
                justifyContent: 'space-between'
            }}>
                <HeadItem
                    selected={this.state.selectIndex === 0}
                    ref={(ref) => {
                        this.headItem0 = ref;
                    }}
                    callBack={() => {
                        this.setState({selectIndex: 0});
                    }}/>
                <HeadItem
                    selected={this.state.selectIndex === 1}
                    ref={(ref) => {
                        this.headItem1 = ref;
                    }}
                    callBack={() => {
                        this.setState({selectIndex: 1});
                    }}/>
                <HeadItem
                    selected={this.state.selectIndex === 2}
                    ref={(ref) => {
                        this.headItem2 = ref;
                    }}
                    callBack={() => {
                        this.setState({selectIndex: 2});
                    }}/>
                <HeadItem
                    selected={this.state.selectIndex === 3}
                    ref={(ref) => {
                        this.headItem3 = ref;
                    }}
                    callBack={() => {
                        this.setState({selectIndex: 3});
                    }}/>
                <HeadItem
                    selected={this.state.selectIndex === 4}
                    ref={(ref) => {
                        this.headItem4 = ref;
                    }}
                    callBack={() => {
                        this.setState({selectIndex: 4});
                    }}/>
                <HeadItem
                    selected={this.state.selectIndex === 5}
                    ref={(ref) => {
                        this.headItem5 = ref;
                    }}
                    callBack={() => {
                        this.setState({selectIndex: 5});
                    }}/>
                <HeadItem
                    selected={this.state.selectIndex === 6}
                    ref={(ref) => {
                        this.headItem6 = ref;
                    }}
                    callBack={() => {
                        this.setState({selectIndex: 6});
                    }}/>
                <HeadItem
                    selected={this.state.selectIndex === 7}
                    ref={(ref) => {
                        this.headItem7 = ref;
                    }}
                    placeholder={"+新能源"}
                    callBack={() => {
                        this.setState({selectIndex: 7});
                    }}/>
            </View>
        );
    }


    isNumber(text) {
        return '0123456789'.indexOf(text) >= 0;
    }

    isABC(text) {
        return 'QWERTYUIOPASDFGHJKLZXCVBNM'.indexOf(text) >= 0;
    }
}


class HeadItem extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {text: ''};
    }

    /**
     *设置车牌
     *
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:41
     * @E-Mail: 528489389@qq.com
     */
    setPlate(text) {
        this.setState({text});
    }

    /**
     *返回车牌，不会是空的
     *
     * @Author: JACK-GU
     * @Date: 2019-05-15 16:41
     * @E-Mail: 528489389@qq.com
     */
    getPlate() {
        return this.state.text ? this.state.text : '';
    }

    render() {
        return (
            <TouchableButton onPress={() => {
                if (this.props.callBack) {
                    this.props.callBack();
                }
            }}>
                <View style={{
                    height: ((width - 9 * distance) / 8),
                    width: (width - 9 * distance) / 8,
                    backgroundColor: this.props.selected ? AppConfig.COLOR_THEME : AppConfig.COLOR_BG,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0,
                    borderColor: AppConfig.COLOR_BG
                }}>
                    <Text style={{
                        fontSize: this.state.text && this.state.text.length > 0 ? AppConfig.TEXT_SIZE_SMALL : 12,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        padding: 3,
                        color: this.props.selected ? 'white' :
                            this.state.text && this.state.text.length > 0 ? AppConfig.COLOR_BLACK :
                                this.props.placeholder ? AppConfig.TEXT_COLOR_GRAY : AppConfig.COLOR_BLACK
                    }}>{this.state.text && this.state.text.length > 0 ? this.state.text :
                        this.props.placeholder ? this.props.placeholder : ''}</Text>
                </View>
            </TouchableButton>
        );
    }
}


class Item extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        let normal = (width - 9 * distance) / 8;
        let text = props.text;

        this.state = {
            bigWidthItem: (((width - 7 * distance) / 8) * 3 + distance),
            normalWidthItem: normal,
            heightItem: normal * 0.8,
            backgroundColor: this.isNumber(text) ? AppConfig.COLOR_THEME :
                this.props.text === '清除' ? 'red' : AppConfig.COLOR_BG,
            color: this.props.text === '警' ? 'red' :
                this.isNumber(text) ? 'white' :
                    this.isABC(text) ? 'green' :
                        this.props.text === '删' ? 'red' :
                            this.props.text === '清除' ? 'white' : AppConfig.COLOR_THEME
        };
    }

    render() {
        return (
            <TouchableButton onPress={() => {
                if (this.props.callBack) {
                    this.props.callBack(this.props.text);
                }
            }}>
                <View style={{
                    height: this.state.heightItem,
                    width: this.props.text === '清除' ? this.state.bigWidthItem : this.state.normalWidthItem,
                    backgroundColor: this.state.backgroundColor,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0,
                    borderColor: AppConfig.COLOR_BG
                }}>
                    <Text style={{
                        fontSize: AppConfig.TEXT_SIZE_SMALL,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color: this.state.color,
                    }}>{this.props.text}</Text>
                </View>
            </TouchableButton>
        );
    }


    isNumber(text) {
        return '0123456789'.indexOf(text) >= 0;
    }

    isABC(text) {
        return 'QWERTYUIOPASDFGHJKLZXCVBNM'.indexOf(text) >= 0;
    }
}
