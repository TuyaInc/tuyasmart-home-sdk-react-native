//
//  TuyaPushModule.m
//  TuyaRnDemo
//
//  Created by Elon on 2019/8/15.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "TuyaPushModule.h"
#import <TuyaSmartBaseKit/TuyaSmartBaseKit.h>


@implementation TuyaPushModule
RCT_EXPORT_MODULE(TuyaPushModule)

RCT_EXPORT_METHOD(registerDevice:(NSDictionary *)params) {
  [[TuyaSmartSDK sharedInstance] setValue:@"" forKey:@"deviceToken"];
}

RCT_EXPORT_METHOD(registerMQPushListener:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
}

RCT_EXPORT_METHOD(onDestory) {
  
}


@end
