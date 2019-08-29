//
//  TuyaRNGroupModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNGroupModule.h"
#import <TuyaSmartDeviceKit/TuyaSmartDeviceKit.h>
#import "TuyaRNUtils.h"
#import <YYModel.h>

@interface TuyaRNGroupModule()<TuyaSmartGroupDelegate>
@property (nonatomic, strong) TuyaSmartGroup *group;
@property (nonatomic, strong) NSMutableArray<TuyaSmartGroup *> *groupList;
@end

@implementation TuyaRNGroupModule

RCT_EXPORT_MODULE(TuyaGroupModule)

RCT_EXPORT_METHOD(initWithOptions:(NSDictionary *)params) {
  
}

RCT_EXPORT_METHOD(onDestory:(NSDictionary *)params) {
  
}


// 增加监听:
RCT_EXPORT_METHOD(registerGroupListener:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
    smartGroup.delegate = self;
  
  if(!self.groupList) {
    self.groupList = [NSMutableArray array];
  }
  [self.groupList addObject:smartGroup];
}

// 移除监听:
RCT_EXPORT_METHOD(unregisterGroupListener:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  for(TuyaSmartGroup *group in self.groupList) {
    if([group.groupModel.groupId isEqualToString:params[@"groupID"]]) {
      group.delegate = nil;
      [self.groupList removeObject:group];
    }
  }
}

// 创建群组：
RCT_EXPORT_METHOD(createGroup:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
      [TuyaSmartGroup createGroupWithName:params[@"name"] productId:params[@"productId"] homeId:[params[@"homeId"] integerValue] devIdList:params[@"devIds"] success:^(TuyaSmartGroup *group) {
          if (resolver) {
            resolver([group yy_modelToJSONObject]);
          }
      } failure:^(NSError *error) {
          [TuyaRNUtils rejecterWithError:error handler:rejecter];
      }];
}


// 群组列表获取：
RCT_EXPORT_METHOD(queryDeviceListToAddGroup:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    [TuyaSmartGroup getDevList:params[@"productId"] homeId:[params[@"homeId"] integerValue] success:^(NSArray<TuyaSmartGroupDevListModel *> *list) {
      NSMutableArray *res = [NSMutableArray array];
      for (TuyaSmartGroupDevListModel *item in list) {
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

// 群组修改名称：
RCT_EXPORT_METHOD(updateGroupName:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
  self.group = smartGroup;
    [smartGroup updateGroupName:params[@"name"] success:^{
        if (resolver) {
          resolver(@"success");
        }
    } failure:^(NSError *error) {
        [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}


// renameGroup：
RCT_EXPORT_METHOD(renameGroup:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
  self.group = smartGroup;
  [smartGroup updateGroupName:params[@"groupName"] success:^{
    if (resolver) {
      resolver(@"success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


// 解散群组：
RCT_EXPORT_METHOD(dismissGroup:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
    self.group = smartGroup;
    [smartGroup dismissGroup:^{
        if (resolver) {
          resolver(@"success");
        }
    } failure:^(NSError *error) {
        [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}


// 发送群组控制命令：
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


RCT_EXPORT_METHOD(addDevice:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
  self.group = smartGroup;
  [smartGroup addZigbeeDeviceWithNodeList:@[params[@"devId"]] success:^{
    if (resolver) {
      resolver(@"success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}


RCT_EXPORT_METHOD(removeDevice:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
  self.group = smartGroup;
  [smartGroup removeZigbeeDeviceWithNodeList:@[params[@"devId"]] success:^{
    if (resolver) {
      resolver(@"success");
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(updateDeviceList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
  self.group = smartGroup;
  [smartGroup updateGroupRelations:params[@"devIds"] success:^{
    resolver(@"success");
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}



RCT_EXPORT_METHOD(test:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartGroup *smartGroup = [TuyaSmartGroup groupWithGroupId:params[@"groupID"]];
  self.group = smartGroup;
  [smartGroup updateGroupRelations:params[@"devIds"] success:^{
    resolver(@"success");
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}






@end
