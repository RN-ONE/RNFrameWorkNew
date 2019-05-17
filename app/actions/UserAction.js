/**
 * 用户相关的action
 *
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe:
 */

import HttpUtil from "../util/HttpUtil";
import * as ActionTypes from '../actions/ActionTypes';

//用户登陆
export const userLogin = (params, loginCallBack) => {
    return (dispatch, getState) => {
        HttpUtil.connectPost(params, "json.action", (data) => {
            dispatch({
                type: ActionTypes.ACTION_USER_LOGIN,
                payload: {
                    data,
                    loginCallBack
                }
            });
        });
    }
};
