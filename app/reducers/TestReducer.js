/**
 * Created by naiyu_wang on 16/10/14.
 */
import {handleActions} from 'redux-actions';
import * as ActionTypes from '../actions/ActionTypes';
import {Navigation} from "react-native-navigation";
import NavigationUtil from "../util/NavigationUtil";


const userState = {
    text: '点击进行网络请求'
}

export default handleActions({
    [ActionTypes.ACTION_TEST]: (state, action) => {
       NavigationUtil.dismissLoadingOverLay();
        let response = action.payload.data;
        if (response.success) {
            var movie = response.response.data.movies[0];
            return {
                text: '电影列表中的第一个信息《' + movie.title + "-" + movie.releaseYear + '》',
            }
        } else {
            return {
                text: "失败"
            }
        }
    }
}, userState);

