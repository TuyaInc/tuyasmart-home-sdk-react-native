//
//  TuyaRNGroupListener.m
//  TuyaRnDemo
//
//  Created by Elon on 2019/3/7.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "TuyaRNGroupListener.h"
#import <TuyaSmartDeviceKit/TuyaSmartDevice.h>
#import <TuyaSmartDeviceKit/TuyaSmartGroup.h>
#import <YYModel/YYModel.h>
#import "TuyaRNEventEmitter.h"

@interface TuyaRNGroupListener()<TuyaSmartGroupDelegate>

@property (nonatomic, strong) NSMutableArray<TuyaSmartGroup *> *listenGroupArr;
@end

@implementation TuyaRNGroupListener

+ (instancetype)shareInstance {
  static TuyaRNGroupListener *listenerInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    listenerInstance = [TuyaRNGroupListener new];
  });
  return listenerInstance;
}


- (instancetype)init {
  if (self = [super init]) {
    _listenGroupArr = [NSMutableArray new];
  }
  return self;
}

+ (void)registerGroup:(TuyaSmartGroup *)group {
  
  __block BOOL exist = NO;
  [[TuyaRNGroupListener shareInstance].listenGroupArr enumerateObjectsUsingBlock:^(TuyaSmartGroup * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    if ([obj.groupModel.groupId isEqualToString:group.groupModel.groupId]) {
      exist = YES;
      *stop = YES;
    }
  }];
  
  group.delegate = [TuyaRNGroupListener shareInstance];
  
  if (!exist) {
    if ([TuyaRNGroupListener shareInstance].listenGroupArr.count == 0) {
    }
    [[TuyaRNGroupListener shareInstance].listenGroupArr addObject:group];
  }
}

+ (void)removeDevice:(TuyaSmartGroup *)group {
  [[[TuyaRNGroupListener shareInstance].listenGroupArr mutableCopy] enumerateObjectsUsingBlock:^(TuyaSmartGroup * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    if ([obj.groupModel.groupId isEqualToString:group.groupModel.groupId]) {
      obj.delegate = nil;
      [[TuyaRNGroupListener shareInstance].listenGroupArr removeObject:obj];
      *stop = YES;
    }
  }];
}


#pragma mark -
#pragma mark - TuyaSmartGroupDelegate
/// 群组dp数据更新
- (void)group:(TuyaSmartGroup *)group dpsUpdate:(NSDictionary *)dps {
  NSDictionary *dic = @{
                        @"devId": group.groupModel.groupId,
                        @"dps": dps,
                        @"type": @"onDpUpdate"
                        };
  
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterGroupInfoEvent stringByAppendingFormat:@"//%@", group.groupModel.groupId] withBody:dic];
}

/// 群组信息更新
- (void)groupInfoUpdate:(TuyaSmartGroup *)group {
  
    NSDictionary *dic = @{
                        @"id": group.groupModel.groupId,
                        @"type": @"onGroupInfoUpdate"
                        };
  
    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterGroupInfoEvent stringByAppendingFormat:@"//%@", group.groupModel.groupId] withBody:dic];
}

/// 群组移除
- (void)groupRemove:(TuyaSmartGroup *)group {
  NSDictionary *dic = @{
                        @"id": group.groupModel.groupId,
                        @"type": @"onGroupRemoved"
                        };

  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterGroupInfoEvent stringByAppendingFormat:@"//%@", group.groupModel.groupId] withBody:dic];
}

///// zigbee 设备加入到网关群组响应
///// 1:超过场景数上限 2:子设备超时 3:设置值超出范围 4:写文件错误 5:其他错误
//- (void)group:(TuyaSmartGroup *)group addResponseCode:(NSArray <NSNumber *>*)responseCode {
//  NSDictionary *dic = @{
//                        @"id": group.groupModel.groupId,
//                        @"type": @"onGroupRemoved"
//                        };
//    [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterGroupInfoEvent stringByAppendingFormat:@"//%@", group.groupModel.groupId] withBody:dic];
//}
//
///// zigbee 设备从网关群组移除响应
///// 1:超过场景数上限 2:子设备超时 3:设置值超出范围 4:写文件错误 5:其他错误
//- (void)group:(TuyaSmartGroup *)group removeResponseCode:(NSArray <NSNumber *>*)responseCode {
//  NSDictionary *dic = @{
//                        @"id": group.groupModel.groupId,
//                        @"type": @"onGroupRemoved"
//                        };
//  [TuyaRNEventEmitter ty_sendEvent:[kTYEventEmitterGroupInfoEvent stringByAppendingFormat:@"//%@", group.groupModel.groupId] withBody:dic];
//}


@end
