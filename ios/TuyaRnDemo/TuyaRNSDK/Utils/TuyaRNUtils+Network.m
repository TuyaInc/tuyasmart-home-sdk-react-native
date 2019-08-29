//
//  TuyaRNUtils+Network.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/2.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNUtils+Network.h"
#import <UIKit/UIKit.h>

@implementation TuyaRNUtils (Network)

+ (void)openNetworkSettings {
  
  NSData *data = [[NSData alloc] initWithBase64EncodedString:@"QXBwLVByZWZzJTNBcm9vdCUzRFdJRkk=" options:0];
  NSString *urlStr = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  urlStr = [urlStr stringByRemovingPercentEncoding];
  NSURL *targetUrl = [NSURL URLWithString:urlStr];
  if (targetUrl && [[UIApplication sharedApplication] canOpenURL:targetUrl]) {
    if (@available(iOS 10.0, *)) {
      [[UIApplication sharedApplication] openURL:targetUrl options:@{} completionHandler:nil];
    } else {
      [[UIApplication sharedApplication] openURL:targetUrl];
    }
  }
}

@end
