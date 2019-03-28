//
//  TuyaRNHomeManagerListener.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/6.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNHomeManagerListener.h"
#import "TuyaRNEventEmitter.h"

@interface TuyaRNHomeManagerListener()<TuyaSmartHomeManagerDelegate>

@property (nonatomic, strong) TuyaSmartHomeManager *currentSmartHomeManager;

@end

@implementation TuyaRNHomeManagerListener

+ (instancetype)sharedInstance {
  static TuyaRNHomeManagerListener *_instanced = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _instanced = [[TuyaRNHomeManagerListener alloc] init];
  });
  return _instanced;
}

//注册家庭管理监听：
- (void)registerSmartHomeManager:(TuyaSmartHomeManager *)homeManager {
  if (!homeManager) {
    return;
  }
  [TuyaRNHomeManagerListener sharedInstance].currentSmartHomeManager = homeManager;
  homeManager.delegate = self;
}

- (void)removeSmartHomeManager {
  [TuyaRNHomeManagerListener sharedInstance].currentSmartHomeManager = nil;
  [TuyaRNHomeManagerListener sharedInstance].currentSmartHomeManager.delegate = nil;
}

#pragma mark -
#pragma mark - TuyaSmartHomeManagerDelegate
// 添加一个家庭
- (void)homeManager:(TuyaSmartHomeManager *)manager didAddHome:(TuyaSmartHomeModel *)home {
  
  long long homeId = home.homeId;
  if (!(homeId > 0)) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:homeId],
                        @"type": @"onHomeAdded"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeChangeEvent stringByAppendingString:@"//"] withBody:dic];
}

// 删除一个家庭
- (void)homeManager:(TuyaSmartHomeManager *)manager didRemoveHome:(long long)homeId {
  
  if (!(homeId > 0)) {
    return;
  }
  NSDictionary *dic = @{
                        @"homeId": [NSNumber numberWithLongLong:homeId],
                        @"type": @"onHomeRemoved"
                        };
  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterHomeChangeEvent stringByAppendingString:@"//"] withBody:dic];
  
}

// MQTT连接成功
- (void)serviceConnectedSuccess {
//  NSDictionary *dic = @{@"type": @"onServerConnectSuccess"};
//  [TuyaRNEventEmitter ty_sendEvent:kTYEventEmitterHomeChangeEvent withBody:dic];
}

@end
