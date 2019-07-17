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
#import "TuyaRNUtils.h"
#import "YYModel.h"


#define kTuyaDeviceModuleDevId @"devId"
#define kTuyaDeviceModuleCommand @"command"
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
RCT_EXPORT_METHOD(send:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  //设备发送消息
  self.smartDevice  = [self smartDeviceWithParams:params];
  NSDictionary *command = params[kTuyaDeviceModuleCommand];
  [self.smartDevice publishDps:command success:^{
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
  self.smartDevice  = [self smartDeviceWithParams:params];
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
  
}

// 下发升级指令：
RCT_EXPORT_METHOD(startOta:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
    [device upgradeFirmware:[params[@"type"] integerValue] success:^{
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


@end
