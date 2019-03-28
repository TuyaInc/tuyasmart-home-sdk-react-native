//
//  TuyaRNUtils+DeviceParser.h
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNUtils.h"
#import <TuyaSmartDeviceKit/TuyaSmartDeviceModel.h>
#import <TuyaSmartDeviceKit/TuyaSmartGroupModel.h>
#import <YYModel/YYModel.h>

static inline NSArray *getValidDataForDeviceModel(NSArray <TuyaSmartDeviceModel *> *deviceModelList) {
  if(!deviceModelList || [deviceModelList count] == 0) {
    return @[];
  }
  NSMutableArray *list = [NSMutableArray array];
  for (TuyaSmartDeviceModel *tempModel in deviceModelList) {
    
    NSDictionary *dic = [tempModel yy_modelToJSONObject];
    [list addObject:dic];
  }
  return list;
}

static inline NSArray *getValidDataForGroupModel(NSArray <TuyaSmartGroupModel *> *groupModelList) {
  if(!groupModelList || [groupModelList count] == 0) {
    return @[];
  }
  
  NSMutableArray *list = [NSMutableArray array];
  for (TuyaSmartGroupModel *tempModel in groupModelList) {
    NSDictionary *dic = [tempModel yy_modelToJSONObject];
    [list addObject:dic];
  }
  return list;
}


NS_ASSUME_NONNULL_BEGIN

@interface TuyaRNUtils (DeviceParser)

@end

NS_ASSUME_NONNULL_END
