package com.framework.module;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.framework.MainActivity;
import com.reactnativenavigation.NavigationActivity;

/**
 * @Author: JACK-GU
 * @Date: 2017-08-14
 * @E-Mail: 528489389@qq.com
 */
public class BarHeightModule extends ReactContextBaseJavaModule {
    private final static String NAME = "BarHeightModule";

    public BarHeightModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }


    @ReactMethod
    public void setNeedFitsSysWindows(boolean isNeed) {
        ((MainActivity) getCurrentActivity()).setNeedFitsSysWindows(isNeed);
    }

    @ReactMethod
    public void exit() {
        System.exit(0);
    }
}
