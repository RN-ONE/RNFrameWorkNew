package com.framework.viewpackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.framework.module.CatchJSModule;
import com.framework.module.SetBarColorModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @Author: JACK-GU
 * @Date: 2017-08-14
 * @E-Mail: 528489389@qq.com
 */
public class CatchJSPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new CatchJSModule(reactContext));
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
