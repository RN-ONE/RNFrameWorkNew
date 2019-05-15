package com.framework;

import android.annotation.TargetApi;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;

import com.facebook.react.modules.core.PermissionListener;
import com.framework.util.SystemBarTintManager;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity implements OnImagePickerPermissionsCallback {
    public static SystemBarTintManager tintManager;
    public static int height = 0;
    private PermissionListener permissionListener; //这个是图片选择做了权限的监听

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //设置状态栏
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            setTranslucentStatus(true);

            tintManager = new SystemBarTintManager(this);
            tintManager.setStatusBarAlpha(0.5f);
            tintManager.setStatusBarTintEnabled(true);
            tintManager.setStatusBarTintColor(Color.parseColor("#22000000"));
            height = tintManager.getConfig().getStatusBarHeight();
        }
    }

    @Override
    public void onPostCreate(@Nullable Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        //下面是设置沉浸式状态栏的
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            ViewGroup viewGroup = findViewById(android.R.id.content);
            viewGroup.setBackgroundColor(getResources().getColor(R.color.colorPrimary));

            FrameLayout frameLayout = navigator.getRootLayout();
            ViewGroup.LayoutParams layoutParams = frameLayout.getLayoutParams();

            if (layoutParams instanceof FrameLayout.LayoutParams) {
                FrameLayout.LayoutParams params = (FrameLayout.LayoutParams) layoutParams;
                params.topMargin = height;
                frameLayout.setLayoutParams(params);
            }
        }
    }

    @TargetApi(19)
    private void setTranslucentStatus(boolean on) {
        Window win = getWindow();
        WindowManager.LayoutParams winParams = win.getAttributes();
        final int bits = WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS;
        if (on) {
            winParams.flags |= bits;
        } else {
            winParams.flags &= ~bits;
        }
        win.setAttributes(winParams);
    }


    /**
     * 设置开屏页
     *
     * @Author: JACK-GU
     * @E-Mail: 528489389@qq.com
     */
    @Override
    protected void addDefaultSplashLayout() {
        ImageView imageView = new ImageView(this);
        imageView.setScaleType(ImageView.ScaleType.FIT_XY);
        imageView.setImageResource(R.drawable.splash);

        setContentView(imageView);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (permissionListener != null) {
            permissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
    }

    @Override
    public void setPermissionListener(@NonNull PermissionListener listener) {
        this.permissionListener = listener;
    }
}
