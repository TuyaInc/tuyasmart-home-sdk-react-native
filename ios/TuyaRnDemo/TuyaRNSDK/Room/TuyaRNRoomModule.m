//
//  TuyaRNRoomModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNRoomModule.h"
#import <TuyaSmartDeviceKit/TuyaSmartRoom.h>
#import "TuyaRNUtils.h"
#import "YYModel.h"
#import "TuyaRNHomeListener.h"


#import "TuyaRNHomeModule.h"
#import "YYModel.h"
#import "TuyaRNUtils.h"
#import <TuyaSmartDeviceKit/TuyaSmartHome.h>
#import <TuyaSmartDeviceKit/TuyaSmartHomeModel.h>
#import <TuyaSmartDeviceKit/TuyaSmartDeviceModel.h>
#import <TuyaSmartDeviceKit/TuyaSmartGroupModel.h>
#import <TuyaSmartBaseKit/TuyaSmartRequest.h>
#import <TuyaSmartDeviceKit/TuyaSmartRoomModel.h>
#import "TuyaRNUtils+Cache.h"
#import "TuyaRNUtils+DeviceParser.h"
#import "TuyaRNHomeListener.h"



#define kTuyaRNRoomModuleName @"name"
#define kTuyaRNRoomModuleGroupId @"groupId"
#define kTuyaRNRoomModuleDevId @"devId"
#define kTuyaRNRoomModuleRoomId @"roomId"
#define kTuyaRNRoomModuleHomeId @"homeId"

@interface TuyaRNRoomModule()

@property (strong, nonatomic) TuyaSmartRoom *smartRoom;
@property (nonatomic, strong) TuyaSmartHome *currentHome;

@end

@implementation TuyaRNRoomModule

RCT_EXPORT_MODULE(TuyaRoomModule)

/**
 * 更新房间名称
 *
 * @param name     新房间名称
 */
RCT_EXPORT_METHOD(updateRoom:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartRoom = [self smartRoomWithParams:params];
  NSString *name = params[kTuyaRNRoomModuleName];
  
  [self.smartRoom updateRoomName:name success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

RCT_EXPORT_METHOD(addDevice:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartRoom = [self smartRoomWithParams:params];
  NSString *deviceId = params[kTuyaRNRoomModuleDevId];
  
  [self.smartRoom addDeviceWithDeviceId:deviceId success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(removeDevice:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {

  self.smartRoom = [self smartRoomWithParams:params];
  
  NSString *deviceId = params[kTuyaRNRoomModuleDevId];
  
  [self.smartRoom removeDeviceWithDeviceId:deviceId success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

RCT_EXPORT_METHOD(removeGroup:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartRoom = [self smartRoomWithParams:params];
  
  NSString *groupId = params[kTuyaRNRoomModuleGroupId];
  
  [self.smartRoom removeGroupWithGroupId:groupId success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

RCT_EXPORT_METHOD(addGroup:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartRoom = [self smartRoomWithParams:params];
  
  NSString *groupId = params[kTuyaRNRoomModuleGroupId];
  
  [self.smartRoom addGroupWithGroupId:groupId success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

// 没有找到SDK相关接口
RCT_EXPORT_METHOD(moveDevGroupListFromRoom:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
}

// 没有找到SDK相关接口
RCT_EXPORT_METHOD(sortDevInRoom:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
}

#pragma mark -
- (TuyaSmartHome *)smartHomeWithParams:(NSDictionary *)params {
  long long homeId = ((NSNumber *)params[@"homeId"]).longLongValue;
  if (homeId > 0) {
    [TuyaRNUtils setCurrentHomeId:[NSNumber numberWithLongLong:homeId]];
  }
  self.currentHome = [TuyaSmartHome homeWithHomeId:homeId];
  return self.currentHome;
}

RCT_EXPORT_METHOD(getRoomList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.currentHome = [self smartHomeWithParams:params];
  
  //获取详情获取：
  __weak typeof(self) weakSelf = self;
  [self.currentHome getHomeDetailWithSuccess:^(TuyaSmartHomeModel *homeModel) {
    
    TuyaSmartHome *detailHome =  [TuyaSmartHome homeWithHomeId:weakSelf.currentHome.homeModel.homeId];
    if (detailHome.roomList.count == 0) {
      if (resolver) {
        resolver(@[]);
      }
      return;
    }
    
    NSMutableArray *list = [NSMutableArray array];
    for (TuyaSmartRoomModel *roomModel in detailHome.roomList) {
      NSDictionary *dic = [roomModel yy_modelToJSONObject];
      //检查相关字段是否一致
      NSMutableDictionary *roomDic = [NSMutableDictionary dictionaryWithDictionary:dic];
      [roomDic setObject:[NSNumber numberWithLongLong:roomModel.roomId] forKey:@"roomId"];
      [list addObject:roomDic];
    }
    if (resolver) {
      resolver(list);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}



#pragma mark -
#pragma mark - init
- (TuyaSmartRoom *)smartRoomWithParams:(NSDictionary *)params {
  
  NSNumber *homeId = params[kTuyaRNRoomModuleHomeId];
  NSNumber *roomId = params[kTuyaRNRoomModuleRoomId];
  return [TuyaSmartRoom roomWithRoomId:roomId.longLongValue homeId:homeId.longLongValue];
}

@end
