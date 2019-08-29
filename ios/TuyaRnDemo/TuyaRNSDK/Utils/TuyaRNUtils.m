//
//  TuyaRNUtils.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNUtils.h"


@implementation TuyaRNUtils

+ (void)rejecterWithError:(NSError *)error
                  handler:(RCTPromiseRejectBlock)rejecter {
  if (rejecter) {
    rejecter([NSString stringWithFormat:@"%ld", error.code], error.userInfo[NSLocalizedDescriptionKey], error);
  }
}

+ (void)resolverWithHandler:(RCTPromiseResolveBlock)resolver {
  if (resolver) {
    resolver(@"success");
  }
}

@end
