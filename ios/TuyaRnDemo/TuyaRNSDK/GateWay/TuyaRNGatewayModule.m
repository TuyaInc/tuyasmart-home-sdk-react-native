//
//  TuyaRNGatewayModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNGatewayModule.h"
#import <TuyaSmartActivatorKit/TuyaSmartActivatorKit.h>
#import "YYModel.h"
#import "TuyaRNUtils.h"

@interface TuyaRNGatewayModule()
@property (nonatomic, strong) TuyaSmartDevice *device;
@property (nonatomic, strong) TuyaSmartGroup *group;

@end

@implementation TuyaRNGatewayModule

RCT_EXPORT_MODULE(TuyaGatewayModule)

RCT_EXPORT_METHOD(publishDps:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
  self.group = smartGroup;
  
  NSString *json = params[@"dps"];
  
  NSDictionary *dps = [NSJSONSerialization JSONObjectWithData:[json dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingAllowFragments error:nil];
  
  [smartGroup publishDps:dps success:^{
    if (resolver) {
      resolver(@"success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

RCT_EXPORT_METHOD(broadcastDps:(NSDictionary *)params) {
  
}

RCT_EXPORT_METHOD(multicastDps:(NSDictionary *)params) {
  
}

RCT_EXPORT_METHOD(getSubDevList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  self.device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  [self.device getSubDeviceListFromCloudWithSuccess:^(NSArray<TuyaSmartDeviceModel *> * _Nonnull subDeviceList) {
    resolver([subDeviceList yy_modelToJSONObject]);
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

RCT_EXPORT_METHOD(registerSubDevListener:(NSDictionary *)params) {
  
}

RCT_EXPORT_METHOD(unRegisterSubDevListener:(NSDictionary *)params) {
  
}

RCT_EXPORT_METHOD(onDestroy:(NSDictionary *)params) {
  
}

@end
