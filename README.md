# RNFrameWork
------
### react-native-navigation修改了原生android代码
<label style="color:red">注意：以下说明适用于升级react-native-navigation，需要将代码集成到项目才可以
#特别注意的是，没有返回按钮的时候，标题不可以太长，否则GG
</label>
# Navigator的修改
1 增加下面的方法
<pre>
<code>
    protected void closeSplash(View view) {
        AnimationSet animationSet = new AnimationSet(true);
        AlphaAnimation fadeOut = new AlphaAnimation(1, 0);
        fadeOut.setDuration(500);
        animationSet.addAnimation(fadeOut);
        ScaleAnimation scale = new ScaleAnimation(1, 1.5f, 1, 1.5f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.65f);
        scale.setDuration(500);
        animationSet.addAnimation(scale);
        view.startAnimation(animationSet);
        animationSet.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {
            }
            @Override
            public void onAnimationRepeat(Animation animation) {
            }
            @Override
            public void onAnimationEnd(Animation animation) {
                view.post(() -> {
                    contentLayout.removeView(view);
                });
            }
        });
    }
</code>
</pre>
2 修改setRoot方法的代码如下：
<pre>
<code>
public void setRoot(final ViewController viewController, CommandListener commandListener) {
        final ViewController rootOld = root;
         root = viewController;

        View viewImage = contentLayout.getChildAt(0);
        if (viewImage instanceof ImageView) {
            //如果是开屏页，就放到前面来
            contentLayout.bringChildToFront(viewImage);
        }

        //然后添加view
        rootPresenter.setRoot(root, defaultOptions, new CommandListener() {
            @Override
            public void onSuccess(String childId) {
                commandListener.onSuccess(childId);

                if (viewImage instanceof ImageView) {
                    //移除开始那个页面
                    closeSplash(viewImage);
                } else {
                    //销毁之前的root
                    if (rootOld != null)
                        rootOld.destroy();
                }
            }

            @Override
            public void onError(String message) {
                commandListener.onError(message);
            }
        });
    }

</code>
</pre>

# TopBar
1 在TopBar重写方法如下：
<pre>
<code>
@Override
    public void setBackgroundColor(int color) {
        super.setBackgroundColor(color);
        statusView.setBackgroundColor(color);
    }
</code>
</pre>
2 修改方法setTitleHeight：
<pre>
<code>
public void setTitleHeight(int height) {
        //不用设置了这里
        // titleBar.setHeight(height);
    }
</code>
</pre>

3 新加属性
<pre>
<code>
    private View statusView;
</code>
</pre>


4 修改方法createLayout：
<pre>
<code>
private void createLayout() {
        setId(CompatUtils.generateViewId());
        titleBar = createTitleBar(getContext());
        topTabs = createTopTabs();
        border = createBorder();
        LinearLayout content = createContentLayout();

        root = new FrameLayout(getContext());
        root.setId(CompatUtils.generateViewId());

        //创建一个view，和状态栏一样高的那种
        statusView = new View(getContext());
        content.addView(statusView, MATCH_PARENT,
                UiUtils.getStatusBarHeight(getContext()));

        content.addView(titleBar);

        content.addView(topTabs);
        root.addView(content);
        root.addView(border);
        addView(root, MATCH_PARENT, WRAP_CONTENT);
        if (BuildConfig.DEBUG) setContentDescription("TopBar");
    }
</code>
</pre>

# UiUtils 
修改方法getTopBarHeight：

<pre>
<code>

    public static int getTopBarHeight(Context context) {
        if (topBarHeight > 0) {
            return topBarHeight;
        }
        final Resources resources = context.getResources();
        final int resourceId = resources.getIdentifier("action_bar_size", "dimen", "android");
        topBarHeight = resourceId > 0 ?
                resources.getDimensionPixelSize(resourceId) :
                dpToPx(context, DEFAULT_TOOLBAR_HEIGHT);
        topBarHeight = topBarHeight + UiUtils.getStatusBarHeight(context);
        return topBarHeight;
    }

</code>
</pre>

# TopBarButtons
在parse方法返回之前增加下面代码
<pre>
<code>
 //保证标题是居中的
        if (result.right == null || result.right.size() == 0) {
            //没有按钮，加一个
            result.right = new ArrayList<>();
            Button button = new Button();
            button.id = "";
            button.showAsAction = new Number(MenuItem.SHOW_AS_ACTION_ALWAYS);

            result.right.add(button);
        }
</code>
</pre>

# TitleBar
这个类涉及的修改很多：新加textView作为标题，然后把以前设置的方法全部替换成自己的textView就可以了，可以参考修改的文件[TitleBar.txt]


#### ********************************************************
# 苹果在xcode10上需要做以下修改
#### 1. Check "Copy only when installing"
![Image text](https://user-images.githubusercontent.com/180773/43156813-23ab6266-8f49-11e8-811a-2642003b68bc.png)
#### 2. Go to Product > Scheme > Edit Scheme and modified it to look like this, move ReactNativeNavigation above React.
![Image text](https://user-images.githubusercontent.com/180773/43156762-ffa6f61e-8f48-11e8-83f9-2022f805653f.png)