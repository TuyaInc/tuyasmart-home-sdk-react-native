//
//  TuyaRNSceneModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNSceneModule.h"
#import <TuyaSmartSceneKit/TuyaSmartSceneKit.h>
#import <TuyaSmartSceneKit/TuyaSmartSceneManager.h>
#import "TuyaRNUtils.h"
#import "YYModel.h"

@interface TuyaRNSceneModule()
@property (nonatomic, strong) TuyaSmartScene *smartScene;
@end

@implementation TuyaRNSceneModule

RCT_EXPORT_MODULE(TuyaSceneModule)

RCT_EXPORT_METHOD(initWithOptions:(NSDictionary *)params) {
  
}

RCT_EXPORT_METHOD(onDestory:(NSDictionary *)params) {
  
}

//
RCT_EXPORT_METHOD(getDeviceTaskOperationList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  [[TuyaSmartSceneManager sharedInstance] getSceneListWithHomeId:[params[@"homeId"] integerValue] success:^(NSArray<TuyaSmartSceneModel *> *list) {
    
    NSMutableArray *res = [NSMutableArray array];
    for (TuyaSmartSceneModel *item in list) {
      NSDictionary *dic = [item yy_modelToJSONObject];
      [res addObject:dic];
    }
    if (resolver) {
      resolver(res);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


// 获取场景列表,调试完毕：
RCT_EXPORT_METHOD(getSceneList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    [[TuyaSmartSceneManager sharedInstance] getSceneListWithHomeId:[params[@"homeId"] integerValue] success:^(NSArray<TuyaSmartSceneModel *> *list) {
      
        NSMutableArray *res = [NSMutableArray array];
        for (TuyaSmartSceneModel *item in list) {
          NSDictionary *dic = [item yy_modelToJSONObject];
          [res addObject:dic];
        }
        if (resolver) {
          resolver(res);
        }
    } failure:^(NSError *error) {
        [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}


// 获取场景列表,调试完毕：
RCT_EXPORT_METHOD(getSceneDetail:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartSceneModel *model = [TuyaSmartSceneModel new];
  model.sceneId = params[@"sceneId"];
  self.smartScene = [TuyaSmartScene sceneWithSceneModel:model];
  resolver([self.smartScene yy_modelToJSONObject]);
  
}


// 获取条件列表,调试完毕：
RCT_EXPORT_METHOD(getConditionList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    [[TuyaSmartSceneManager sharedInstance] getConditionListWithFahrenheit:YES success:^(NSArray<TuyaSmartSceneDPModel *> *list) {

      NSMutableArray *res = [NSMutableArray array];
      for (TuyaSmartSceneDPModel *item in list) {
        NSDictionary *dic = [item yy_modelToJSONObject];
        [res addObject:dic];
      }
        if (resolver) {
          resolver(res);
        }
    } failure:^(NSError *error) {
        [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}

// 获取条件设备列表， 调试完毕：
RCT_EXPORT_METHOD(getConditionDevList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    [[TuyaSmartSceneManager sharedInstance] getConditionDeviceListWithHomeId:[params[@"homeId"] integerValue] success:^(NSArray<TuyaSmartDeviceModel *> *list) {
          NSMutableArray *res = [NSMutableArray array];
          for (TuyaSmartDeviceModel *item in list) {
            NSDictionary *dic = [item yy_modelToJSONObject];
            [res addObject:dic];
          }
      
        if (resolver) {
          resolver(res);
        }
    } failure:^(NSError *error) {
        [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}


// 根据设备id获取设备任务：
RCT_EXPORT_METHOD(getDeviceConditionOperationList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
    [[TuyaSmartSceneManager sharedInstance] getActionDeviceDPListWithDevId:params[@"devId"] success:^(NSArray<TuyaSmartSceneDPModel *> *list) {
      
        NSMutableArray *res = [NSMutableArray array];
        for (TuyaSmartSceneDPModel *item in list) {
          NSMutableDictionary *dic = [item yy_modelToJSONObject];
          dic[@"name"] = item.dpModel.name;
          
          dic[@"type"] = item.dpModel.property.type;
          
          NSMutableDictionary *tmp = [NSMutableDictionary dictionary];
          for (NSArray *info in dic[@"valueRangeJson"]) {
            NSString *tt = info[0]?@"true":@"false";
            tmp[tt] = info[1];
          }
          dic[@"tasks"] = tmp;
          
          [res addObject:dic];
        }
        if (resolver) {
          resolver(res);
        }
    } failure:^(NSError *error) {
      [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}

// iOS不支持：
RCT_EXPORT_METHOD(createSceneTask:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  

}


// 创建自动化：
RCT_EXPORT_METHOD(xxx:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSMutableArray *conditionList = [NSMutableArray array];
  for(NSDictionary *item in params[@"conditionList"]) {
    TuyaSmartSceneConditionModel *actionModel = [[TuyaSmartSceneConditionModel alloc] init];
    // 天气：
    if([item[@"entityType"] integerValue] == 3) {
      //气象条件
      actionModel.entityId = item[@"cityId"];
      actionModel.entityName = item[@"cityName"];
      actionModel.entitySubIds = item[@"entitySubId"];
      actionModel.cityName = item[@"localCity"];
      actionModel.cityLatitude = [item[@"placeBean"][@"tempLatitude"] doubleValue];
      actionModel.cityLongitude = [item[@"placeBean"][@"tempLatitude"] doubleValue];
      actionModel.expr = @[@"$temp",item[@"range"], item[@"rule"]];
      [conditionList addObject:actionModel];
    }
    
    // 定时器：
    else if([item[@"entityType"] integerValue] == 6) {
      //定时条件
      actionModel.expr = @[item];
      actionModel.extraInfo = @{@"delayTime" : item[@"delayTime"]};
      [conditionList addObject:actionModel];
    }

    // 设备：
    else if([item[@"entityType"] integerValue] == 1) {
      //设备条件
      actionModel.entityId = item[@"devId"];
      TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:item[@"devId"]];
      actionModel.entityName = device.deviceModel.name;;
      actionModel.entitySubIds = [NSString stringWithFormat:@"%@", item[@"dpId"]];
      
      actionModel.expr = @[@[[NSString stringWithFormat:@"dp%@", item[@"dpId"]],@"==",item[@"rule"]]];
      [conditionList addObject:actionModel];
    }
    
  }

  NSMutableArray *actionList = [NSMutableArray array];
  for(NSDictionary *item in params[@"tasks"]) {
    TuyaSmartSceneActionModel *actionModel = [[TuyaSmartSceneActionModel alloc] init];
    actionModel.entityId = item[@"devId"];
    actionModel.executorProperty = @{[NSString stringWithFormat:@"%@", item[@"dpId"]]: item[@"value"], };
    actionModel.actionExecutor = @"dpIssue";
    [actionList addObject:actionModel];
  }
  
  
  [TuyaSmartScene addNewSceneWithName:params[@"name"] homeId:[params[@"homeId"] longLongValue] background:params[@"background"] showFirstPage:params[@"stickyOnTop"] preConditionList:params[@"preConditionList"] conditionList:conditionList actionList:actionList matchType:[params[@"matchType"] integerValue] success:^(TuyaSmartSceneModel *sceneModel) {
    if (resolver) {
      resolver([sceneModel yy_modelToJSONObject]);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

// 删除场景：
RCT_EXPORT_METHOD(deleteScene:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartSceneModel *model = [TuyaSmartSceneModel new];
  model.sceneId = params[@"sceneId"];
      self.smartScene = [TuyaSmartScene sceneWithSceneModel:model];
  [self.smartScene deleteSceneWithSuccess:^{
    if (resolver) {
      resolver(@"delete success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


// 执行场景：
RCT_EXPORT_METHOD(executeScene:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartSceneModel *model = [TuyaSmartSceneModel new];
  model.sceneId = params[@"sceneId"];
  self.smartScene = [TuyaSmartScene sceneWithSceneModel:model];
  [self.smartScene executeSceneWithSuccess:^{
    if (resolver) {
      resolver(@"execute success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

// 开启场景：
RCT_EXPORT_METHOD(enableScene:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartSceneModel *model = [TuyaSmartSceneModel new];
  model.sceneId = params[@"sceneId"];
  self.smartScene = [TuyaSmartScene sceneWithSceneModel:model];
  [self.smartScene enableSceneWithSuccess:^{
    if (resolver) {
      resolver(@"enableSmartScene success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

// 失效场景：
RCT_EXPORT_METHOD(disableScene:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartSceneModel *model = [TuyaSmartSceneModel new];
  model.sceneId = params[@"sceneId"];
  self.smartScene = [TuyaSmartScene sceneWithSceneModel:model];
  [self.smartScene disableSceneWithSuccess:^{
    if (resolver) {
      resolver(@"disableSmartScene success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


// createTimerCondition：
RCT_EXPORT_METHOD(createTimerCondition:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartSceneConditionModel *actionModel = [[TuyaSmartSceneConditionModel alloc] init];
  
  //定时条件
  actionModel.expr = @[params];
  actionModel.extraInfo = @{@"delayTime" : params[@"delayTime"]};
  
  resolver([actionModel yy_modelToJSONObject]);
}

// createTimerCondition：
RCT_EXPORT_METHOD(onDestroyScene:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  
}





// createDevCondition：
RCT_EXPORT_METHOD(createDevCondition:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartSceneConditionModel *actionModel = [[TuyaSmartSceneConditionModel alloc] init];

  //设备条件
  actionModel.entityId = params[@"deviceBean"][@"devId"];
  TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:params[@"deviceBean"][@"devId"]];
  actionModel.entityName = device.deviceModel.name;;
  actionModel.entitySubIds = [NSString stringWithFormat:@"%@", params[@"dpId"]];
  
  actionModel.expr = @[@[[NSString stringWithFormat:@"dp%@", params[@"dpId"]],params[@"range"],params[@"ruleType"]]];
  
  resolver([actionModel yy_modelToJSONObject]);
}


// createWeatherCondition：
RCT_EXPORT_METHOD(createWeatherCondition:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {

    TuyaSmartSceneConditionModel *actionModel = [[TuyaSmartSceneConditionModel alloc] init];
  
    //气象条件
    actionModel.entityId = params[@"place"][@"cityId"];
    actionModel.entityName = params[@"place"][@"city"];
//    actionModel.entitySubIds = params[@"entitySubId"];
    actionModel.cityName = params[@"place"][@"city"];
    actionModel.cityLatitude = [params[@"place"][@"tempLatitude"] doubleValue];
    actionModel.cityLongitude = [params[@"place"][@"tempLatitude"] doubleValue];
    actionModel.expr = @[[NSString stringWithFormat:@"$%@", params[@"type"]],params[@"range"], params[@"ruleType"]];

    resolver([actionModel yy_modelToJSONObject]);
}

// 创建动作对象：
RCT_EXPORT_METHOD(createDpTask:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
//  TuyaSmartSceneActionModel *actionModel = [[TuyaSmartSceneActionModel alloc] init];
//  actionModel.entityId = params[@"devId"];
//
//  actionModel.executorProperty = @[NSDictionary dictionaryWithObjectsAndKeys:
//                                  params[@"devId"], @"devId",
//                                  params[@"dpId"], @"dpId",
//                                  params[@"dpName"], @"dpName",
//                                  params[@"value"], @"value",
//                                  params[@"devName"], @"devName",
//                                  nil];
//
//  actionModel.actionExecutor = @"dpIssue";
  NSDictionary *executorProperty = @{
                                            @"devId": params[@"tasks"][@"devId"],
                                            @"dpId": params[@"tasks"][@"dpId"],
                                            @"dpName": params[@"tasks"][@"dpName"],
                                            @"value": params[@"tasks"][@"value"],
                                            @"devName": params[@"tasks"][@"devName"],
                                            };
  
  resolver(@{
              @"entityId": params[@"devId"],
              @"executorProperty": executorProperty,
              @"actionExecutor": @"dpIssue",
             });
  
}


RCT_EXPORT_METHOD(createSceneWithStickyOnTop:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSMutableArray *tasks = [NSMutableArray array];
  for(NSDictionary *item in params[@"tasks"]) {
    TuyaSmartSceneActionModel *actionModel = [[TuyaSmartSceneActionModel alloc] init];
    actionModel.entityId = item[@"entityId"];
    
    actionModel.executorProperty = item;
    
    actionModel.actionExecutor = @"dpIssue";
    [tasks addObject:actionModel];
  }
  
  
  [TuyaSmartScene addNewSceneWithName:params[@"name"] homeId:[params[@"homeId"] longLongValue] background:params[@"background"] showFirstPage:params[@"stickyOnTop"] conditionList:nil actionList:tasks matchType:[params[@"matchType"] integerValue] success:^(TuyaSmartSceneModel *sceneModel) {
    if (resolver) {
      resolver([sceneModel yy_modelToJSONObject]);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(createSceneWithStickyOnTopAndPreCondition:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSMutableArray *tasks = [NSMutableArray array];
  for(NSDictionary *item in params[@"tasks"]) {
    TuyaSmartSceneActionModel *actionModel = [[TuyaSmartSceneActionModel alloc] init];
    actionModel.entityId = item[@"entityId"];
    
    actionModel.executorProperty = item;
    
    actionModel.actionExecutor = @"dpIssue";
    [tasks addObject:actionModel];
  }
  
  
  [TuyaSmartScene addNewSceneWithName:params[@"name"] homeId:[params[@"homeId"] longLongValue] background:params[@"background"] showFirstPage:params[@"stickyOnTop"] conditionList:nil actionList:tasks matchType:[params[@"matchType"] integerValue] success:^(TuyaSmartSceneModel *sceneModel) {
    if (resolver) {
      resolver([sceneModel yy_modelToJSONObject]);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

// 创建场景：
RCT_EXPORT_METHOD(getSceneBgs:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  [[TuyaSmartSceneManager sharedInstance] getSmartSceneBackgroundCoverWithsuccess:^(NSArray *list) {
    resolver([list yy_modelToJSONObject]);
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

// 创建场景：
RCT_EXPORT_METHOD(createScene:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSMutableArray *tasks = [NSMutableArray array];
  for(NSDictionary *item in params[@"tasks"]) {
      TuyaSmartSceneActionModel *actionModel = [[TuyaSmartSceneActionModel alloc] init];
      actionModel.entityId = item[@"entityId"];
    
      actionModel.executorProperty = item;
    
      actionModel.actionExecutor = @"dpIssue";
    [tasks addObject:actionModel];
  }

  
  [TuyaSmartScene addNewSceneWithName:params[@"name"] homeId:[params[@"homeId"] longLongValue] background:params[@"background"] showFirstPage:NO conditionList:nil actionList:tasks matchType:[params[@"matchType"] integerValue] success:^(TuyaSmartSceneModel *sceneModel) {
    if (resolver) {
      resolver([sceneModel yy_modelToJSONObject]);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

// 修改场景：
RCT_EXPORT_METHOD(modifyScene:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartSceneModel *model = [TuyaSmartSceneModel yy_modelWithDictionary:params[@"sceneBean"]];
  model.sceneId = params[@"sceneId"];
  
  TuyaSmartScene *smartScene = [TuyaSmartScene sceneWithSceneModel:model];
  self.smartScene = smartScene;
  [smartScene modifySceneWithName:model.name background:model.background showFirstPage:model.stickyOnTop preConditionList:model.preConditions conditionList:model.conditions actionList:model.actions matchType:model.matchType success:^{
    if (resolver) {
      resolver(@"success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}


// 修改自动化场景, pass：
RCT_EXPORT_METHOD(modifyAutoScene:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSMutableArray *actionList = [NSMutableArray array];
  for(NSDictionary *item in params[@"tasks"]) {
    TuyaSmartSceneActionModel *actionModel = [[TuyaSmartSceneActionModel alloc] init];
    actionModel.entityId = item[@"devId"];
    actionModel.executorProperty = @{[NSString stringWithFormat:@"%@", item[@"dpId"]]: item[@"value"], };
    actionModel.actionExecutor = @"dpIssue";
    [actionList addObject:actionModel];
  }
  
  TuyaSmartSceneModel *model = [TuyaSmartSceneModel new];
  model.sceneId = params[@"sceneId"];
  model.actions = actionList;
  model.name = params[@"name"];
  
  
  NSMutableArray *conditionList = [NSMutableArray array];
  for(NSDictionary *item in params[@"conditionList"]) {
    TuyaSmartSceneConditionModel *actionModel = [[TuyaSmartSceneConditionModel alloc] init];
    // 天气：
    if([item[@"entityType"] integerValue] == 3) {
      //气象条件
      actionModel.entityId = item[@"cityId"];
      actionModel.entityName = item[@"cityName"];
      actionModel.entitySubIds = item[@"entitySubId"];
      actionModel.cityName = item[@"localCity"];
      actionModel.cityLatitude = [item[@"placeBean"][@"tempLatitude"] doubleValue];
      actionModel.cityLongitude = [item[@"placeBean"][@"tempLatitude"] doubleValue];
      actionModel.expr = @[@"$temp",item[@"range"], item[@"rule"]];
      [conditionList addObject:actionModel];
    }
    // 定时器：
    else if([item[@"entityType"] integerValue] == 6) {
      //定时条件
      actionModel.expr = @[item];
      actionModel.extraInfo = @{@"delayTime" : item[@"delayTime"]};
      [conditionList addObject:actionModel];
    }
    // 设备：
    else if([item[@"entityType"] integerValue] == 1) {
      //设备条件
      actionModel.entityId = item[@"devId"];
      TuyaSmartDevice *device = [TuyaSmartDevice deviceWithDeviceId:item[@"devId"]];
      actionModel.entityName = device.deviceModel.name;;
      actionModel.entitySubIds = [NSString stringWithFormat:@"%@", item[@"dpId"]];
      
      actionModel.expr = @[@[[NSString stringWithFormat:@"dp%@", item[@"dpId"]],@"==",item[@"rule"]]];
      [conditionList addObject:actionModel];
    }
  }
  
  TuyaSmartScene *smartScene = [TuyaSmartScene sceneWithSceneModel:model];
  self.smartScene = smartScene;
  [smartScene modifySceneWithName:params[@"name"] background:params[@"background"] showFirstPage:params[@"stickyOnTop"] preConditionList:@[] conditionList:conditionList actionList:actionList matchType:[params[@"matchType"] integerValue] success:^{
    if (resolver) {
      resolver(@"success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}


// 获取城市列表, 调试通过：
RCT_EXPORT_METHOD(getCityListByCountryCode:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  [[TuyaSmartSceneManager sharedInstance] getCityListWithCountryCode:params[@"countryCode"] success:^(NSArray<TuyaSmartCityModel *> *list) {
    
    NSMutableArray *res = [NSMutableArray array];
    for (TuyaSmartCityModel *item in list) {
      NSDictionary *dic = [item yy_modelToJSONObject];
      [res addObject:dic];
    }
    if (resolver) {
      resolver(res);
    }
    
  } failure:^(NSError *error) {
      [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


// 获取城市列表, 调试通过：
RCT_EXPORT_METHOD(getCityByLatLng:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  [[TuyaSmartSceneManager sharedInstance] getCityInfoWithLatitude:params[@"lat"] longitude:params[@"lon"] success:^(TuyaSmartCityModel *model) {
    resolver([model yy_modelToJSONObject]);
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


// 根据城市id获取城市信息：
RCT_EXPORT_METHOD(getCityByCityIndex:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
    [[TuyaSmartSceneManager sharedInstance] getCityInfoWithCityId:params[@"cityId"] success:^(TuyaSmartCityModel *model) {
        if (resolver) {
          resolver([model yy_modelToJSONObject]);
        }
    } failure:^(NSError *error) {
      [TuyaRNUtils rejecterWithError:error handler:rejecter];
      
    }];
}

// 获取执行动作支持的设备列表：
RCT_EXPORT_METHOD(getTaskDevList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {

  [[TuyaSmartSceneManager sharedInstance] getActionGroupListAndDeviceListWithHomeId:[params[@"homeId"] longLongValue] success:^(NSDictionary *dict) {
    
    
    NSMutableArray *res = [NSMutableArray array];
    for (TuyaSmartDeviceModel *item in dict[@"deviceList"]) {
      NSDictionary *dic = [item yy_modelToJSONObject];
      [res addObject:dic];
    }
  
      if (resolver) {
        resolver(res);
      }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

// 场景排序：
RCT_EXPORT_METHOD(sortSceneList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  [[TuyaSmartSceneManager sharedInstance] sortSceneWithHomeId:[params[@"homeId"] longValue] sceneIdList:params[@"sceneIds"] success:^{
    if (resolver) {
      resolver(@"sort success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}



@end
