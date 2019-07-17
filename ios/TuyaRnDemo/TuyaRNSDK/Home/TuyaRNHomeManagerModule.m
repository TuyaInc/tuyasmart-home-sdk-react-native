//
//  TuyaRNHomeManagerModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNHomeManagerModule.h"
#import <TuyaSmartDeviceKit/TuyaSmartHome.h>
#import <TuyaSmartDeviceKit/TuyaSmartHomeManager.h>
#import <TuyaSmartBaseKit/TuyaSmartRequest.h>
#import "YYModel.h"
#import "TuyaRNUtils.h"
#import "TuyaRNHomeManagerListener.h"
#import "TuyaRNHomeListener.h"

#define kTuyaHomeManagerModuleName @"name"
#define kTuyaHomeManagerModuleLon @"lon"
#define kTuyaHomeManagerModuleLat @"lat"
#define kTuyaHomeManagerModuleGeoName @"geoName"
#define kTuyaHomeManagerModuleRooms @"rooms"
#define kTuyaHomeManagerModuleHomeId @"homeId"


@interface TuyaRNHomeManagerModule()

@property (nonatomic, strong) TuyaSmartHomeManager *homeManager;
@property (nonatomic, strong) TuyaSmartRequest *request;

@end

@implementation TuyaRNHomeManagerModule

RCT_EXPORT_MODULE(TuyaHomeManagerModule)

/**
 * 获取家庭列表
 *
 * @param listener
 */
RCT_EXPORT_METHOD(queryHomeList:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  [self.homeManager getHomeListWithSuccess:^(NSArray<TuyaSmartHomeModel *> *homes) {
    
    if (homes.count == 0) {
      if (resolver) {
        resolver(@[]);
      }
      return;
    }
    
    NSMutableArray *list = [NSMutableArray array];
    for (TuyaSmartHomeModel *homeModel in homes) {
      NSDictionary *dic = [homeModel yy_modelToJSONObject];
      NSMutableDictionary *homeDic = [NSMutableDictionary dictionaryWithDictionary:dic];
      [homeDic setObject:[NSNumber numberWithLongLong:homeModel.homeId] forKey:@"homeId"];
      [list addObject:homeDic];
    }
    
    if (resolver) {
      resolver(list);
    }
  } failure:^(NSError *error) {
    
  }];
}

/**
 * 创建家庭
 * @param name     家庭名称
 * @param lon      经度
 * @param lat      纬度
 * @param geoName  家庭地理位置名称
 * @param rooms    房间列表
 * @param callback
 */
RCT_EXPORT_METHOD(createHome:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *name = params[kTuyaHomeManagerModuleName];
  NSString *geoName = params[kTuyaHomeManagerModuleGeoName];
  NSNumber *lat = params[kTuyaHomeManagerModuleLat];
  NSNumber *lon = params[kTuyaHomeManagerModuleLon];
  NSArray *rooms = params[kTuyaHomeManagerModuleRooms];
  
  double latValue = lat.doubleValue;
  double lonValue = lon.doubleValue;
  
  [self.homeManager addHomeWithName:name geoName:geoName rooms:rooms latitude:latValue longitude:lonValue success:^(long long result) {
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

/**
 * 注册家庭信息的变更
 * 有：家庭的增加、删除、信息变更、分享列表的变更和服务器连接成功的监听
 *
 * @param listener
 */
RCT_EXPORT_METHOD(registerTuyaHomeChangeListener:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSNumber *homeIdNum = params[kTuyaHomeManagerModuleHomeId];
  if (!homeIdNum || homeIdNum.longLongValue <= 0) {
    return;
  }
  //开始监听家庭的情况
  [[TuyaRNHomeManagerListener sharedInstance] registerSmartHomeManager:[TuyaSmartHomeManager new]];
  [[TuyaRNHomeListener shareInstance] registerHomeChangeWithSmartHome:[TuyaSmartHome homeWithHomeId:homeIdNum.longLongValue]];
}

/**
 * 注销家庭信息的变更
 *
 * @param listener
 */
RCT_EXPORT_METHOD(unregisterTuyaHomeChangeListener:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  //结束家庭的监听情况
  [[TuyaRNHomeManagerListener sharedInstance] removeSmartHomeManager];
  [[TuyaRNHomeListener shareInstance] removeHomeChangeSmartHome];
  
}

RCT_EXPORT_METHOD(onDestory:(NSDictionary *)params) {
  
}

#pragma mark -
#pragma mark - init
- (TuyaSmartHomeManager *)homeManager {
  if (!_homeManager) {
    _homeManager = [[TuyaSmartHomeManager alloc] init];
  }
  return _homeManager;
}

- (TuyaSmartRequest *)request {
  if (!_request) {
    _request = [TuyaSmartRequest new];
  }
  return _request;
}

@end
