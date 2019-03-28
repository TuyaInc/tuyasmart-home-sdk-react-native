//
//  TuyaRNDeviceListener.h
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@class TuyaSmartDevice;

typedef NS_OPTIONS(NSUInteger, TuyaRNDeviceListenType) {
  TuyaRNDeviceListenType_None = 1<<0,
  TuyaRNDeviceListenType_DeviceInfo = 1 << 1,
};

NS_ASSUME_NONNULL_BEGIN

@interface TuyaRNDeviceListener : NSObject

@property (nonatomic, copy, readonly) NSArray<TuyaSmartDevice *> *listenDevices;

+ (instancetype)shareInstance;

/**
 添加设备监听, 当设备状态变更时，会自动发送 kTYEventEmitterDeviceListenerEvent
 */
+ (void)registerDevice:(TuyaSmartDevice *)device type:(TuyaRNDeviceListenType)type;

/*
 * 移除设备监听
 */
+ (void)removeDevice:(TuyaSmartDevice *)device type:(TuyaRNDeviceListenType)type;


@end

NS_ASSUME_NONNULL_END
