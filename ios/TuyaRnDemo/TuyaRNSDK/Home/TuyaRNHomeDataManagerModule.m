//
//  TuyaRNHomeDataManagerModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/2.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNHomeDataManagerModule.h"
#import <TuyaSmartDeviceKit/TuyaSmartDeviceKit.h>
#import "TuyaRNUtils+Cache.h"
#import "TuyaRNUtils+DeviceParser.h"

#define kTuyaRNHomeDataManagerModuleHomeId @"homeId"
#define kTuyaRNHomeDataManagerModuleRoomId @"roomId"

@interface TuyaRNHomeDataManagerModule()

@property (strong, nonatomic) TuyaSmartRoom *smartRoom;
@property (strong, nonatomic) TuyaSmartDevice *device;

@end

@implementation TuyaRNHomeDataManagerModule

RCT_EXPORT_MODULE(TuyaHomeDataManagerModule)

RCT_EXPORT_METHOD(getHomeRoomList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartHome *home = [TuyaSmartHome homeWithHomeId:[params[@"homeId"] longLongValue]];
  resolver([home.roomList yy_modelToJSONObject]);
}

RCT_EXPORT_METHOD(getHomeDeviceList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartHome *home = [TuyaSmartHome homeWithHomeId:[params[@"homeId"] longLongValue]];
  resolver([home.deviceList yy_modelToJSONObject]);
}

RCT_EXPORT_METHOD(getHomeGroupList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartHome *home = [TuyaSmartHome homeWithHomeId:[params[@"homeId"] longLongValue]];
  resolver([home.groupList yy_modelToJSONObject]);
}


RCT_EXPORT_METHOD(getGroupBean:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  double groupId = [params[@"groupId"] doubleValue];
  TuyaSmartGroup *group = [TuyaSmartGroup groupWithGroupId:[NSString stringWithFormat:@"%f", groupId]];
  resolver([group yy_modelToJSONObject]);
}

RCT_EXPORT_METHOD(getDeviceBean:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  resolver([device yy_modelToJSONObject]);
}

RCT_EXPORT_METHOD(getGroupRoomBean:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartGroup *group = [TuyaSmartGroup groupWithGroupId:params[@"groupId"]];
  TuyaSmartRoom *room = [TuyaSmartRoom roomWithRoomId:group.groupModel.roomId homeId:group.groupModel.homeId];
  resolver([room yy_modelToJSONObject]);
}


RCT_EXPORT_METHOD(getRoomBean:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartRoom *room = [TuyaSmartRoom roomWithRoomId:[params[@"roomId"] longLongValue] homeId:[params[@"homeId"] longLongValue]];
  resolver([room yy_modelToJSONObject]);
}


RCT_EXPORT_METHOD(getDeviceRoomBean:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  
  TuyaSmartRoom *room = [TuyaSmartRoom roomWithRoomId:device.deviceModel.roomId homeId:device.deviceModel.homeId];
  
  resolver([room yy_modelToJSONObject]);
}

RCT_EXPORT_METHOD(getGroupDeviceList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
//  [TuyaSmartGroup getDevListWithProductId:<#(nonnull NSString *)#> gwId:<#(nonnull NSString *)#> homeId:<#(long long)#> success:<#^(NSArray<TuyaSmartGroupDevListModel *> * _Nonnull)success#> failure:<#^(NSError *error)failure#>];
  

}


RCT_EXPORT_METHOD(getMeshGroupList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartRoom *room = [TuyaSmartRoom roomWithRoomId:[params[@"roomId"] longLongValue] homeId:[params[@"homeId"] longLongValue]];
  NSMutableArray *res = [NSMutableArray array];
  for(TuyaSmartGroupModel *model in room.groupList) {
    if(model.type == TuyaSmartGroupTypeMesh) {
      [res addObject:model];
    }
  }
  resolver([res yy_modelToJSONObject]);
}

RCT_EXPORT_METHOD(getMeshDeviceList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  //获取room下的Device
  NSNumber *homeId = params[kTuyaRNHomeDataManagerModuleHomeId];
  if(!homeId) {
    homeId = [TuyaRNUtils currentHomeId];
  }
  NSNumber *roomId = params[kTuyaRNHomeDataManagerModuleRoomId];
  
  //获取room下的设备
  self.smartRoom = [TuyaSmartRoom roomWithRoomId:roomId.longLongValue homeId:homeId.longLongValue];
  
  NSMutableArray *res = [NSMutableArray array];
  for(TuyaSmartDeviceModel *model in self.smartRoom.deviceList) {
    if(model.deviceType == TuyaSmartDeviceModelTypeMeshBleSubDev) {
      [res addObject:model];
    }
  }
  resolver([res yy_modelToJSONObject]);
}

RCT_EXPORT_METHOD(getRoomDeviceList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {

  //获取room下的Device
  NSNumber *homeId = params[kTuyaRNHomeDataManagerModuleHomeId];
  if(!homeId) {
    homeId = [TuyaRNUtils currentHomeId];
  }
  NSNumber *roomId = params[kTuyaRNHomeDataManagerModuleRoomId];
  
  //获取room下的设备
  self.smartRoom = [TuyaSmartRoom roomWithRoomId:roomId.longLongValue homeId:homeId.longLongValue];
  if(resolver) {
    NSMutableDictionary *roomDic = [[NSMutableDictionary alloc] initWithCapacity:2];
    [roomDic setObject:getValidDataForDeviceModel(self.smartRoom.deviceList) forKey:@"deviceList"];
    [roomDic setObject:getValidDataForGroupModel(self.smartRoom.groupList) forKey:@"groupList"];
    resolver(roomDic);
  }
}

RCT_EXPORT_METHOD(getRoomGroupList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartRoom *room = [TuyaSmartRoom roomWithRoomId:[params[@"roomId"] longLongValue] homeId:[params[@"homeId"] longLongValue]];
  resolver([room.groupList yy_modelToJSONObject]);
}

RCT_EXPORT_METHOD(getHomeBean:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartHome *home = [TuyaSmartHome homeWithHomeId:[params[@"homeId"] longLongValue]];
  resolver([home yy_modelToJSONObject]);
}


RCT_EXPORT_METHOD(getSubDeviceBean:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  self.device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  [self.device getSubDeviceListFromCloudWithSuccess:^(NSArray<TuyaSmartDeviceModel *> * _Nonnull subDeviceList) {
    resolver([subDeviceList yy_modelToJSONObject]);
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(getSubDeviceBeanByNodeId:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  self.device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  [self.device getSubDeviceListFromCloudWithSuccess:^(NSArray<TuyaSmartDeviceModel *> * _Nonnull subDeviceList) {
    NSMutableArray *res = [NSMutableArray array];
    for(TuyaSmartDeviceModel *dev in subDeviceList) {
      if(dev.nodeId == params[@"nodeId"]) {
        [res addObject:dev];
      }
    }
    resolver([res yy_modelToJSONObject]);
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


// iOS没有找到 Product model
RCT_EXPORT_METHOD(getProductBean:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
}


// iOS没有找到相关方法:
RCT_EXPORT_METHOD(getDp:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
}

// iOS没有找到相关方法:
RCT_EXPORT_METHOD(getDps:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
}


RCT_EXPORT_METHOD(getSchema:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  self.device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  resolver([self.device.deviceModel.schemaArray yy_modelToJSONObject]);
}


RCT_EXPORT_METHOD(getSubDevList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.device = [TuyaSmartDevice deviceWithDeviceId:params[@"devId"]];
  [self.device getSubDeviceListFromCloudWithSuccess:^(NSArray<TuyaSmartDeviceModel *> * _Nonnull subDeviceList) {
    resolver([subDeviceList yy_modelToJSONObject]);
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];

}


RCT_EXPORT_METHOD(addProductList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
}


@end
