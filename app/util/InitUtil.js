import {Navigation} from "react-native-navigation";
import NavigationUtil from "./NavigationUtil";
import * as Const from "../config/Const";
import Index from "../Index";
import Main from "../scene/Main";
import Main2 from "../scene/Main2";
import Main3 from "../scene/Main3";
import ChangeTheme from "../scene/ChangeTheme";
import FlatListScene from "../scene/FlatListScene";
import LoadingOverlay from "../overlay/LoadingOverlay";
import SelectModal from "../overlay/SelectOverlay";
import ImagePickerOverlay from "../overlay/ImagePickerOverlay";
import ImageShowModal from "../overlay/ImageShowOverlay";
import MessageDialogModal from "../overlay/MessageDialogOverlay";
import Table1 from "../scene/Table1";
import Table2 from "../scene/Table2";
import Table3 from "../scene/Table3";
import {Platform} from "react-native";
import CommonUtil from "./CommonUtil";

/**
 *
 * 初始化最开始需要调用的
 *
 * @Author: JACK-GU
 * @Date: 2019-05-10 13:32
 * @E-Mail: 528489389@qq.com
 */

export default class InitUtil {
    //注册组件的类
    static registerComponent;

    /**
     *
     * 初始化，一开始调用
     *
     * @Author: JACK-GU
     * @Date: 2019-05-10 13:38
     * @E-Mail: 528489389@qq.com
     */
    static init() {
        //初始化常用工具类
        CommonUtil.init();

        //初始化注册组件的类
        InitUtil.registerComponent = new RegisterComponent();
        InitUtil.registerComponent.registerComponentWithRedux();
        InitUtil.registerComponent.registerComponentWithNotRedux();
    }


}

/**
 *注册组件的，所有的需要注册的组件写在里面，会在初始化的时候调用
 *
 * @Author: JACK-GU
 * @Date: 2019-05-10 13:42
 * @E-Mail: 528489389@qq.com
 */
class RegisterComponent {

    /**
     *需要注册的组件，用redux，建议使用这个
     *
     * @Author: JACK-GU
     * @Date: 2019-05-10 13:47
     * @E-Mail: 528489389@qq.com
     */
    registerComponentWithRedux() {
        NavigationUtil.registerComponentWithRedux(Const.RNN_INDEX, Index);
        NavigationUtil.registerComponentWithRedux(Const.RNN_MAIN, Main);
        NavigationUtil.registerComponentWithRedux(Const.RNN_MAIN2, Main2);
        NavigationUtil.registerComponentWithRedux(Const.RNN_MAIN3, Main3);
        NavigationUtil.registerComponentWithRedux(Const.RNN_CHANG_THEME, ChangeTheme);
        NavigationUtil.registerComponentWithRedux(Const.RNN_FLAT_LIST_SCENE, FlatListScene);
        NavigationUtil.registerComponentWithRedux(Const.RNN_LOADING_OVER_LAY, LoadingOverlay);
        NavigationUtil.registerComponentWithRedux(Const.RNN_SELECT_OVER_LAY, SelectModal);
        NavigationUtil.registerComponentWithRedux(Const.RNN_IMAGE_PICKER_OVER_LAY, ImagePickerOverlay);
        NavigationUtil.registerComponentWithRedux(Const.RNN_IMAGE_SHOW_OVER_LAY, ImageShowModal);
        NavigationUtil.registerComponentWithRedux(Const.RNN_MESSAGE_DIALOG_OVER_LAY, MessageDialogModal);
        NavigationUtil.registerComponentWithRedux(Const.RNN_TABLE1, Table1);
        NavigationUtil.registerComponentWithRedux(Const.RNN_TABLE2, Table2);
        NavigationUtil.registerComponentWithRedux(Const.RNN_TABLE3, Table3);
    }

    /**
     *需要注册的主键不喊redux
     *
     * @Author: JACK-GU
     * @Date: 2019-05-10 13:47
     * @E-Mail: 528489389@qq.com
     */
    registerComponentWithNotRedux() {

    }
}
