/**
 *用户登陆的
 *
 * @Author: JACK-GU
 * @Date: 2019-05-17 13:52
 * @E-Mail: 528489389@qq.com
 */
import {handleActions} from 'redux-actions';
import * as ActionTypes from '../actions/ActionTypes';
import {Navigation} from "react-native-navigation";
import NavigationUtil from "../util/NavigationUtil";
import User from "../entity/User";
import * as Const from "../config/Const";
import UserUtil from "../util/UserUtil";
import ToastAI from "../component/ToastAI";


const userState = {
    user: null,
};

export default handleActions({
    [ActionTypes.ACTION_USER_LOGIN]: (state, action) => {
        NavigationUtil.dismissLoadingOverLayOrModal();
        let {data, loginCallBack} = action.payload;

        if (loginCallBack) {
            loginCallBack(data.success);
        }

        let user: User;
        if (data.success) {
            //成功了
            user = {...data.response};
            UserUtil.loginSuccess(user);
        }

        return {
            user: user ? user : state.user,
        }
    }
}, userState);

