//
//  RNNConstant.m
//  FrameWork
//
//  Created by 古智勇 on 2019/5/10.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RNNConstant.h"

@implementation RNNConstant

+ (NSDictionary *)getConstants {
  return @{@"topBarHeight": @([self topBarHeight]), @"statusBarHeight": @([self statusBarHeight]), @"bottomTabsHeight": @([self bottomTabsHeight])};
}

+ (CGFloat)topBarHeight {
  return UIApplication.sharedApplication.delegate.window.rootViewController.navigationController.navigationBar.frame.size.height;
}

+ (CGFloat)statusBarHeight {
  return [UIApplication sharedApplication].statusBarFrame.size.height;
}

+ (CGFloat)bottomTabsHeight {
  UIViewController*  uc= ((UIWindow *)(UIApplication.sharedApplication.windows[0])).rootViewController;
  if ([uc isKindOfClass:[UITabBarController class]]){
    return CGRectGetHeight(((UITabBarController *)uc).tabBar.frame);
  }else{
    return 0;
  }
}
@end
