//
//  TuyaRNDeviceModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNDeviceModule.h"
#import "TuyaRNDeviceListener.h"
#import <TuyaSmartDeviceKit/TuyaSmartDevice.h>
#import <TuyaSmartDeviceKit/TuyaSmartDeviceKit.h>
#import "TuyaRNEventEmitter.h"

#import "TuyaRNUtils.h"
#import "YYModel.h"


#define kTuyaDeviceModuleDevId @"devId"
#define kTuyaDeviceModuleCommand @"dps"
#define kTuyaDeviceModuleDpId @"dpId"
#define kTuyaDeviceModuleDeviceName @"name"

@interface TuyaRNDeviceModule()

@property (strong, nonatomic) TuyaSmartDevice *smartDevice;

@end

@implementation TuyaRNDeviceModule

RCT_EXPORT_MODULE(TuyaDeviceModule)

/**
 设备监听开启
 */
RCT_EXPORT_METHOD(registerDevListener:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartDevice  = [self smartDeviceWithParams:params];
  //监听设备
  [TuyaRNDeviceListener registerDevice:self.smartDevice type:TuyaRNDeviceListenType_DeviceInfo];
}

/**
 设备监听删除

 */
RCT_EXPORT_METHOD(unRegisterDevListener:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  NSString *deviceId = params[kTuyaDeviceModuleDevId];
  if(deviceId.length == 0) {
    return;
  }
  
  TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:deviceId];
  
  // 移除监听设备
  [TuyaRNDeviceListener removeDevice:device type:TuyaRNDeviceListenType_DeviceInfo];
  
  self.smartDevice  = [self smartDeviceWithParams:params];
  //取消设备监听
  [TuyaRNDeviceListener removeDevice:self.smartDevice type:TuyaRNDeviceListenType_DeviceInfo];
}


/*
 * 通过局域网或者云端这两种方式发送控制指令给设备。send(通过局域网或者云端这两种方式发送控制指令给设备。)
 command的格式应符合{key:value} 例如 {"1":true}
 */
RCT_EXPORT_METHOD(publishDps:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  //设备发送消息
  self.smartDevice  = [self smartDeviceWithParams:params];
  NSString *json = params[@"dps"];
  NSDictionary *dps = [NSJSONSerialization JSONObjectWithData:[json dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingAllowFragments error:nil];
  
  [self.smartDevice publishDps:dps success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(publishDpsWithEnum:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  // 设备发送消息
  self.smartDevice  = [self smartDeviceWithParams:params];
  NSString *json = params[@"dps"];
  NSDictionary *dps = [NSJSONSerialization JSONObjectWithData:[json dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingAllowFragments error:nil];

  [self.smartDevice publishDps:dps mode:[params[@"TYDevicePublishModeEnum"] integerValue] success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


/**
 查询单个dp数据
 */
RCT_EXPORT_METHOD(getDp:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *dpId = params[kTuyaDeviceModuleDpId];
  //读取dp点
  self.smartDevice  = [self smartDeviceWithParams:params];
  if (self.smartDevice) {
    if (resolver) {
      resolver(self.smartDevice.deviceModel.dps[dpId]?:@"");
    }
  }
}


RCT_EXPORT_METHOD(getDpList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  //读取dp点
  self.smartDevice  = [self smartDeviceWithParams:params];
  
  NSArray *list = params[@"list"];
  
  NSMutableArray *res = [NSMutableArray array];
  for(NSString *obj in list) {
    [res addObject:self.smartDevice.deviceModel.dps[obj]];
  }
  if (self.smartDevice) {
    if (resolver) {
      resolver(res);
    }
  }
}


RCT_EXPORT_METHOD(resetFactory:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartDevice  = [self smartDeviceWithParams:params];
  [self.smartDevice resetFactory:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}
/**
 设备重命名
 */
RCT_EXPORT_METHOD(renameDevice:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartDevice  = [self smartDeviceWithParams:params];
  NSString *deviceName = params[kTuyaDeviceModuleDeviceName];
  [self.smartDevice updateName:deviceName success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(getInitiativeQueryDpsInfoWithDpsArray:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartDevice  = [self smartDeviceWithParams:params];
  [self.smartDevice getInitiativeQueryDpsInfoWithDpsArray:params[@"list"] success:^{
    resolver(@"success");
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}



// 更新单个设备信息:
//RCT_EXPORT_METHOD(getDp:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
//    TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
//    [device syncWithCloud:^{
//      if (resolver) {
//        resolver(@"syncWithCloud success");
//      }
//    } failure:^(NSError *error) {
//        [TuyaRNUtils rejecterWithError:error handler:rejecter];
//    }];
//}


RCT_EXPORT_METHOD(getDataPointStat:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
 
}
  

/**
 删除设备
 */
RCT_EXPORT_METHOD(removeDevice:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartDevice  = [self smartDeviceWithParams:params];
  [self.smartDevice remove:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

// 设备重命名：已验证
//RCT_EXPORT_METHOD(renameDevice:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
//
//    TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
//    [device updateName:params[@"name"] success:^{
//      if (resolver) {
//        resolver(@"rename success");
//      }
//    } failure:^(NSError *error) {
//        [TuyaRNUtils rejecterWithError:error handler:rejecter];
//    }];
//}


RCT_EXPORT_METHOD(onDestroy:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    self.smartDevice = nil;
}

// 下发升级指令：
RCT_EXPORT_METHOD(startOta:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    self.smartDevice = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  self.smartDevice.delegate = self;
  
  
  
    [self.smartDevice upgradeFirmware:[params[@"type"] integerValue] success:^{
        if (resolver) {
          resolver(@"success");
        }
    } failure:^(NSError *error) {
        [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}

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


#pragma mark -
- (TuyaSmartDevice *)smartDeviceWithParams:(NSDictionary *)params {
  NSString *deviceId = params[kTuyaDeviceModuleDevId];
  if(deviceId.length == 0) {
    return nil;
  }
  return [TuyaSmartDevice deviceWithDeviceId:deviceId];
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
