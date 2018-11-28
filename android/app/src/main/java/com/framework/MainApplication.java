package com.framework;

import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.framework.viewpackage.BarColorPackage;
import com.framework.viewpackage.BarHeightPackage;
import com.framework.viewpackage.CatchJSPackage;
import com.framework.viewpackage.NativeUtilPackage;
import com.framework.viewpackage.ProgressViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.tencent.bugly.crashreport.CrashReport;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    private static MainApplication instance;

    public static MainApplication getInstance() {
        return instance;
    }

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {

        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new VectorIconsPackage(),
                new ProgressViewPackage(),
                new BarHeightPackage(),
                new BarColorPackage(),
                new ReactNativeExceptionHandlerPackage(),
                new CatchJSPackage(),
                new ReactNativeRestartPackage(),
                new ImagePickerPackage(),
                new NativeUtilPackage(),
                new CodePush("w70qnt1Hq1I84m9A_F0zSYCQ8TNA0d30a50d-b6d3-4073-89be" +
                        "-a3fd7bb5b1bd", MainApplication.this, BuildConfig.DEBUG)
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        SoLoader.init(this, /* native exopackage */ false);

        if (!BuildConfig.DEBUG) {
            CrashReport.initCrashReport(getApplicationContext(), "5a9639836b", false);
        }
    }
}
