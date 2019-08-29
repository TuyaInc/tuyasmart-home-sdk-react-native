//
//  TuyaRNHomeListener.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/6.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNHomeListener.h"
#import <TuyaSmartDeviceKit/TuyaSmartHome.h>
#import <TuyaSmartDeviceKit/TuyaSmartHomeManager.h>
#import "TuyaRNEventEmitter.h"
#import <TuyaSmartDeviceKit/TuyaSmartRoomModel.h>
#import <TuyaSmartDeviceKit/TuyaSmartDeviceModel.h>
#import <TuyaSmartDeviceKit/TuyaSmartGroupModel.h>

@interface TuyaRNHomeListener()<TuyaSmartHomeDelegate>

@property (strong, nonatomic) TuyaSmartHome *homeChangeSmartHome;
@property (strong, nonatomic) TuyaSmartHome *homeStatusSmartHome;

@end

@implementation TuyaRNHomeListener

+ (instancetype)shareInstance {
  static TuyaRNHomeListener *_instance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _instance = [[TuyaRNHomeListener alloc] init];
  });
  return _instance;
}

- (void)registerHomeChangeWithSmartHome:(TuyaSmartHome *)smartHome {
  
  if (!smartHome) {
    return;
  }
  [TuyaRNHomeListener shareInstance].homeChangeSmartHome = smartHome;
  [TuyaRNHomeListener shareInstance].homeChangeSmartHome.delegate = self;
}

- (void)removeHomeChangeSmartHome {
  
  [TuyaRNHomeListener shareInstance].homeChangeSmartHome = nil;
  [TuyaRNHomeListener shareInstance].homeChangeSmartHome.delegate = nil;
  
}

- (void)registerHomeStatusWithSmartHome:(TuyaSmartHome *)smartHome {
  
  if (!smartHome) {
    return;
  }
  [TuyaRNHomeListener shareInstance].homeStatusSmartHome = smartHome;
  [TuyaRNHomeListener shareInstance].homeStatusSmartHome.delegate = self;
}

- (void)removeHomeStatusSmartHome {
  
  [TuyaRNHomeListener shareInstance].homeStatusSmartHome = nil;
  [TuyaRNHomeListener shareInstance].homeStatusSmartHome.delegate = nil;
  
}


#pragma mark - TuyaSmartHomeDelegate

// 家庭的信息更新，例如name
- (void)homeDidUpdateInfo:(TuyaSmartHome *)home {
  
  if (!self.homeChangeSmartHome) {
    return;
  }
  
  if (home.homeModel.homeId <= 0) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"type": @"onHomeInfoChanged"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeChangeEvent stringByAppendingString:@"//"] withBody:dic];
}

// 家庭和房间关系变化
- (void)homeDidUpdateRoomInfo:(TuyaSmartHome *)home {
  
  if (!self.homeChangeSmartHome) {
    return;
  }
  
  if (home.homeModel.homeId <= 0) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"type": @"onHomeRoomListChange"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeChangeEvent stringByAppendingFormat:@"//%lld",home.homeModel.homeId] withBody:dic];
}

// 我收到的共享设备列表变化
- (void)homeDidUpdateSharedInfo:(TuyaSmartHome *)home {
  
  if (!self.homeChangeSmartHome) {
    return;
  }
  
  if (home.homeModel.homeId <= 0) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"type": @"onSharedDeviceList"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeChangeEvent stringByAppendingString:@"//"] withBody:dic];
}

// 房间信息变更，例如name
- (void)home:(TuyaSmartHome *)home roomInfoUpdate:(TuyaSmartRoomModel *)room {
  
  if (!self.homeChangeSmartHome) {
    return;
  }
  
  //房间的名字的变更
  if (home.homeModel.homeId <= 0) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"roomId": [NSNumber numberWithLongLong:room.roomId],
                        @"type": @"onHomeRoomInfo"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeChangeEvent stringByAppendingFormat:@"//%lld",home.homeModel.homeId] withBody:dic];
}

// 房间与设备，群组的关系变化
- (void)home:(TuyaSmartHome *)home roomRelationUpdate:(TuyaSmartRoomModel *)room {
  
}

// 添加设备
- (void)home:(TuyaSmartHome *)home didAddDeivice:(TuyaSmartDeviceModel *)device {
  
  if (!self.homeStatusSmartHome) {
    return;
  }
  
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"devId": device.devId,
                        @"type": @"onDeviceAdded"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeStatusEvent stringByAppendingFormat:@"//%lld",home.homeModel.homeId] withBody:dic];
  
}

// 删除设备
- (void)home:(TuyaSmartHome *)home didRemoveDeivice:(NSString *)devId {
  
  if (!self.homeStatusSmartHome) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"devId": devId,
                        @"type": @"onDeviceRemoved"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeStatusEvent stringByAppendingFormat:@"//%lld",home.homeModel.homeId] withBody:dic];
  
}

// 设备信息更新，例如name
- (void)home:(TuyaSmartHome *)home deviceInfoUpdate:(TuyaSmartDeviceModel *)device {
  
}

// 设备dp数据更新
- (void)home:(TuyaSmartHome *)home device:(TuyaSmartDeviceModel *)device dpsUpdate:(NSDictionary *)dps {
  
}

// 添加群组
- (void)home:(TuyaSmartHome *)home didAddGroup:(TuyaSmartGroupModel *)group {
  if (!self.homeStatusSmartHome) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"devId": group.groupId,
                        @"type": @"onGroupAdded"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeStatusEvent stringByAppendingFormat:@"//%lld",home.homeModel.homeId] withBody:dic];
}

// 群组dp数据更新
- (void)home:(TuyaSmartHome *)home group:(TuyaSmartGroupModel *)group dpsUpdate:(NSDictionary *)dps {
  if (!self.homeStatusSmartHome || !dps ||  dps.count == 0) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"groupId": group,
                        @"dps":dps,
                        @"type": @"onGroupDpsUpdate"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeStatusEvent stringByAppendingFormat:@"//%lld",home.homeModel.homeId] withBody:dic];
}

// 删除群组
- (void)home:(TuyaSmartHome *)home didRemoveGroup:(NSString *)groupId {
  if (!self.homeStatusSmartHome) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"groupId": groupId,
                        @"type": @"onGroupRemoved"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeStatusEvent stringByAppendingFormat:@"//%lld",home.homeModel.homeId] withBody:dic];
}

// 群组信息更新，例如name
- (void)home:(TuyaSmartHome *)home groupInfoUpdate:(TuyaSmartGroupModel *)group {
  if (!self.homeStatusSmartHome) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:home.homeModel.homeId],
                        @"groupId": group.groupId,
                        @"type": @"onGroupInfoUpdate"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeStatusEvent stringByAppendingFormat:@"//%lld",home.homeModel.homeId] withBody:dic];
}

@end
