# RNFrameWork
------
### 为了实现setRoot的时候有动画效果并且没有白屏，请修改Android原生代码react-native-navigation中Navigator类中的setRoot方法如下
<pre>
    <code>
         public void setRoot(final ViewController viewController, CommandListener commandListener) {
                final ViewController rootOld = root;
        
                if (isRootNotCreated()) {
                    removePreviousContentView();
                    getView();
                }
        
                root = viewController;
                rootPresenter.setRoot(root, defaultOptions, new CommandListener() {
                    @Override
                    public void onSuccess(String childId) {
                        commandListener.onSuccess(childId);
                        //销毁之前的root
                        if (rootOld != null)
                            rootOld.destroy();
                    }
        
                    @Override
                    public void onError(String message) {
                        commandListener.onError(message);
                    }
                });
            }
    </code>
</pre>