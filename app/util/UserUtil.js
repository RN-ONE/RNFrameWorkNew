/**
 * 用户工具类
 *
 * @Author:JACK-GU
 * @Date:2019-05-17 14:15
 * @E-Mail:528489389@qq.com
 */
import User from "../entity/User";

export default class UserUtil {
    static user: User;

    /**
     *返回登陆的user
     *
     * @Author: JACK-GU
     * @Date: 2019-05-17 14:18
     * @E-Mail: 528489389@qq.com
     */
    static getUser(): User {
        return UserUtil.user;
    }

    /**
     *登陆成功调用
     *
     * @Author: JACK-GU
     * @Date: 2019-05-17 14:16
     * @E-Mail: 528489389@qq.com
     */
    static loginSuccess(user: User) {
        UserUtil.user = user;
    }

    /**
     *退出登录
     *
     * @Author: JACK-GU
     * @Date: 2019-05-17 14:17
     * @E-Mail: 528489389@qq.com
     */
    static loginOut() {
        UserUtil.user = null;
    }
}
