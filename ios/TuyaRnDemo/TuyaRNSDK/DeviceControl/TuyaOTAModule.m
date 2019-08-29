//
//  TuyaOTAModule.m
//  TuyaRnDemo
//
//  Created by Elon on 2019/8/28.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "TuyaOTAModule.h"
#import "TuyaRNDeviceListener.h"
#import <TuyaSmartDeviceKit/TuyaSmartDevice.h>
#import <TuyaSmartDeviceKit/TuyaSmartDeviceKit.h>
#import "TuyaRNUtils.h"
#import "YYModel.h"
#import "TuyaRNEventEmitter.h"

#define kTuyaDeviceModuleDevId @"devId"
#define kTuyaDeviceModuleCommand @"dps"
#define kTuyaDeviceModuleDpId @"dpId"
#define kTuyaDeviceModuleDeviceName @"name"

@interface TuyaOTAModule()

@property (strong, nonatomic) TuyaSmartDevice *smartDevice;

@end

@implementation TuyaOTAModule


RCT_EXPORT_MODULE(TuyaOTAModule)

// 下发升级指令：
RCT_EXPORT_METHOD(startOta:(NSDictionary *)params {
  TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  [device upgradeFirmware:[params[@"type"] integerValue] success:^{
//    if (resolver) {
//      resolver(@"success");
//    }
  } failure:^(NSError *error) {
  }];
})

// 查询固件升级信息：
RCT_EXPORT_METHOD(getOtaInfo:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  [device getFirmwareUpgradeInfo:^(NSArray<TuyaSmartFirmwareUpgradeModel *> *upgradeModelList) {
    
    NSMutableArray *res = [NSMutableArray array];
    for (TuyaSmartFirmwareUpgradeModel *item in upgradeModelList) {
      NSDictionary *dic = [item yy_modelToJSONObject];
      [res addObject:dic];
    }
    if (resolver) {
      resolver(res);
    }
    
    NSLog(@"getFirmwareUpgradeInfo success");
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

RCT_EXPORT_METHOD(onDestory:(NSDictionary *)params) {
  
}




/**
 *  Device firmware upgrade success
 *  固件升级成功代理回调
 *
 *  @param device instance
 *  @param type   device type
 */
- (void)deviceFirmwareUpgradeSuccess:(TuyaSmartDevice *)device type:(NSInteger)type {
  NSDictionary *dic = @{
                        @"otaType": @(type),
                        @"type": @"onSuccess"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[self getEventName:@"otaListener" ID:device.deviceModel.devId] withBody:dic];
}

- (NSString *)getEventName:(NSString *)event ID:(NSString *)ID {
  return [NSString stringWithFormat:@"%@//%@", event, ID];
}


/**
 *  Device firmware upgrade failure
 *  固件升级失败代理回调
 *
 *  @param device instance
 *  @param type   device type
 */
- (void)deviceFirmwareUpgradeFailure:(TuyaSmartDevice *)device type:(NSInteger)type {
  NSDictionary *dic = @{
                        @"otaType": @(type),
                        @"type": @"onFailure"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[self getEventName:@"otaListener" ID:device.deviceModel.devId] withBody:dic];
}

/**
 *  Firmware upgrade progress.
 *  固件升级进度
 *
 *  @param device   instance
 *  @param type     device type
 *  @param progress upgrade progress
 */
- (void)device:(TuyaSmartDevice *)device firmwareUpgradeProgress:(NSInteger)type progress:(double)progress {
  NSDictionary *dic = @{
                        @"otaType": @(type),
                        @"type": @"onProgress"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[self getEventName:@"otaListener" ID:device.deviceModel.devId] withBody:dic];
}




@end
