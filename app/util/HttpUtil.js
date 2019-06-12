/**
 * @Author:JACK-GU
 * @Date:2017-08-10
 * @E-Mail:528489389@qq.com
 * @Describe: 网络请求的工具类
 */
import {Axios} from 'axios';
import JSSHA from 'jssha';
import ToastAI from "../component/ToastAI";
import * as Const from "../config/Const";
import UserUtil from "./UserUtil";

const TIMEOUT = 60 * 1000;
const responseType = "json";

/**
 * 添加对应的状态码和消息就可以了，0比较特殊，表示网络没连接
 * */
const CodeMessages = [
    {code: 400, message: "错误请求"},
    {code: 401, message: "未授权"},
    {code: 403, message: "禁止访问"},
    {code: 404, message: "未找到的请求"},
    {code: 408, message: "请求超时，请检查网络"},
    {code: 500, message: "服务器内部错误"},
    {code: 0, message: "网络错误"}
];

export default class HttpUtil {
    static BASE = "http://117.187.64.6:8090/scdp";
    static BASE_URL = HttpUtil.BASE + "/controller/";
    static instance = new Axios({
        baseURL: HttpUtil.BASE_URL,
        timeout: TIMEOUT,
        responseType: responseType,
        headers: {'Accept': 'application/json;charset=utf-8', 'Content-Type': 'application/json;charset=utf-8',}
    });


    /**
     * get请求
     * @param params 请求的参数
     * @param url 请求地址
     * @param callBack 回调，{success: true, response: response}
     * */
    static connectGet(params, url, callBack) {
        HttpUtil.connectHttp(params, url, "get", callBack, null, null);
    }

    /**
     * post
     * @param params 请求的参数
     * @param url 请求地址
     * param callBack 回调,{success: true, response: response}
     * */
    static connectPost(params, url, callBack) {
        HttpUtil.connectHttp(params, url, "post", callBack, null, null);
    }

    /**
     * @param params 请求的参数
     * @param url 请求地址
     * @param method 请求的方式，post，get
     * @param onUploadProgress 上传进度，一般不用传null
     * @param onDownloadProgress 下载进度，一般不用传null
     * param callBack 回调,{success: true, response: response}
     * */
    static connectHttp(params, url, method, callBack, onUploadProgress, onDownloadProgress) {
        params.network = 0;
        params.timestamp = Date.parse(new Date());
        params.timeZone = "Asia/Shanghai";
        params.userLocaleId = "zh_CN";
        if (UserUtil.getUser()) {
            params.userId = UserUtil.getUser().userId;
            params.userName = UserUtil.getUser().userName;
        }

        let postData = JSON.stringify(params);
        let map = {
            "actionName": params.actionName,
            "postData": postData,
            "limit": params.limit ? params.limit : 15,
            "start": params.start ? params.start : 1
        };


        console.log({map});
        HttpUtil.instance.request({
            url: url,
            method: method,
            params: map,
            onUploadProgress: onUploadProgress,
            onDownloadProgress: onDownloadProgress,
        }).then(function (response) {
            HttpUtil.doResponse(response, callBack);
        }).catch(function (error) {
            HttpUtil.doError(error, callBack);
        });
    }

    static showMessage(code) {
        for (let i = 0; i < CodeMessages.length; i++) {
            if (CodeMessages[i].code === code) {
                ToastAI.showShortBottom(CodeMessages[i].message);
                break;
            }
        }
    }

    /**
     * @Author: JACK-GU
     * @Date: ${DATE}
     * @E-Mail: 528489389@qq.com
     * @Describe: 上传文件到服务器
     * @param map 是一个数组，里面存放对象{path:"",fileName:"",key:""}
     * @param params 参数
     * @param url 请求的地址
     */
    static uploadFilePost(url, map, params, callBack) {
        // 创建一个formData（虚拟表单）
        let formData = new FormData();
        map.forEach((item) => {
            formData = HttpUtil.appendToFormData(formData, item.path, item.fileName, item.key);
        });

        // 请求头文件
        const config = {
            Accept: 'Application/json',
            'Content-Type': 'multipart/form-data',
            params: params ? params : {},
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent);
            },
        };

        HttpUtil.uploadFile(url, formData, config, callBack);
    }

    /**
     *
     * 上传文件到服务器,文件是一个数组
     *
     * @param map 是一个数组，里面存放对象{files:[path:"",fileName:""],key:""}
     * @param params 参数
     * @param url 请求的地址
     * @param callBack 回调
     *
     * @Author: JACK-GU
     * @Date: 2018/3/21 11:01
     * @E-Mail: 528489389@qq.com
     */
    static uploadFileArrayPost(url, map, params, callBack) {
        params.network = 0;
        params.timestamp = Date.parse(new Date());
        params.timeZone = "Asia/Shanghai";
        params.userLocaleId = "zh_CN";
        if (UserUtil.getUser()) {
            params.userId = UserUtil.getUser().userId;
            params.userName = UserUtil.getUser().userName;
        }

        let postData = JSON.stringify(params);
        let mapParams = {
            "actionName": params.actionName,
            "postData": postData,
            "limit": params.limit ? params.limit : 15,
            "start": params.start ? params.start : 1
        };


        // 创建一个formData（虚拟表单）
        let formData = new FormData();
        map.forEach((item) => {
            formData = HttpUtil.appendArrayToFromData(formData, item.files, item.key);
        });

        // 请求头文件
        const config = {
            Accept: 'Application/json;charset=utf-8',
            'Content-Type': 'multipart/form-data;charset=utf-8',
            params: mapParams ? mapParams : {},
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent);
            },
        };

        HttpUtil.uploadFile(url, formData, config, callBack);
    }


    /**
     *
     * 上传文件
     * @param url 地址
     * @param formData 传文件的虚拟表单
     * @param config 配置
     * @param callBack 回调
     *
     * @Author: JACK-GU
     * @Date: 2018/3/21 10:55
     * @E-Mail: 528489389@qq.com
     */
    static uploadFile(url, formData, config, callBack) {
        //然后开始上传
        HttpUtil.instance.post(url, formData, config)
            .then(function (response) {
                HttpUtil.doResponse(response, callBack);
            }).catch(function (error) {
            HttpUtil.doError(error, callBack);
        });
    }


    /**
     * @Author: JACK-GU
     * @Date: ${DATE}
     * @E-Mail: 528489389@qq.com
     * @Describe: 将文件拼接成formData
     * @param formData 需要的
     * @param fileUri 文件的路径
     * @param fileName 文件的名字
     * @param key 关键字
     * @return formData 返回拼接后的
     */
    static appendToFormData(formData, fileUri, fileName, key) {
        // 需要上传的文件
        let name;
        if (fileName && fileName.length > 0) {
            name = fileName;
        } else {
            let strS = fileUri.split("/");
            name = strS[strS.length - 1];
        }

        const file = {uri: fileUri, type: 'multipart/form-data', name};   // 这里的key(uri和type和name)不能改变,
        formData.append(key, file);   // 这里的files就是后台需要的key

        return formData;
    }

    /**
     *
     * 放入一个数组
     * @param formData 需要的
     * @param files 文件的路径的数组[path:"",fileName:""]
     * @param key 关键字
     * @return formData 返回拼接后的
     *
     * @Author: JACK-GU
     * @Date: 2018/3/21 10:50
     * @E-Mail: 528489389@qq.com
     */
    static appendArrayToFromData(formData, files, key) {
        for (const fileItem of files) {
            let name;
            if (fileItem.fileName && fileItem.fileName.length > 0) {
                name = fileItem.fileName;
            } else {
                let strS = fileItem.path.split("/");
                name = strS[strS.length - 1];
            }
            const file = {uri: fileItem.path, type: 'multipart/form-data', name};   // 这里的key(uri和type和name)不能改变,

            //数组：key如果是files，那么可以就应该是files[]
            formData.append(key, file);
        }

        return formData;
    }


    /**
     *
     * 获取加密过后的密码
     *
     * @Author: JACK-GU
     * @Date: 2018/3/6 15:05
     * @E-Mail: 528489389@qq.com
     */
    static getEncryptedPassword(userPwd) {
        let psw1 = HttpUtil.SHA1(userPwd);
        return HttpUtil.SHA1(psw1 + "sMarT cLOud dEveLoPmEnT plAtForM");
    }


    static SHA1(input) {
        let hash = new JSSHA('SHA-1', 'TEXT');
        hash.update(input);
        return hash.getHash('HEX');
    }

    /**
     *处理结果，请求成功的
     *
     * @Author: JACK-GU
     * @Date: 2019-06-12 17:11
     * @E-Mail: 528489389@qq.com
     */
    static doResponse(response, callBack) {
        if (callBack) {
            if (response.status === 200) {
                if (!response.data) {
                    ToastAI.showShortBottom("未知错误");
                    callBack({success: false, response: {}});
                } else if (response.data.errorcode) {
                    //框架的错误，直接提示
                    ToastAI.showShortBottom(response.data.error);
                    callBack({success: false, response: response.data});
                } else {
                    if (response.data.resultCode === Const.CODE.success) {
                        callBack({success: true, response: response.data});
                    } else {
                        ToastAI.showShortBottom(response.data.resultInfo);
                        callBack({success: false, response: response.data});
                    }
                }
            } else {
                callBack({success: false, response: response});
                HttpUtil.showMessage(response.status);
            }
        }
    }

    /**
     *请求出错的时候
     *
     * @Author: JACK-GU
     * @Date: 2019-06-12 17:14
     * @E-Mail: 528489389@qq.com
     */
    static doError(error, callBack) {
        console.log({error});
        if (callBack) {
            callBack({success: false, response: error});
        }
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            HttpUtil.showMessage(error.response.status);
        } else {
            //显示错误消息
            HttpUtil.showMessage(0);
        }
    }

}
