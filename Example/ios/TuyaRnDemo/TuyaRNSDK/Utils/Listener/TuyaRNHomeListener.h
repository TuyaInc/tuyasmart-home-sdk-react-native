//
//  TuyaRNHomeListener.h
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/6.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <TuyaSmartDeviceKit/TuyaSmartHome.h>
#import <TuyaSmartDeviceKit/TuyaSmartHomeManager.h>
#import <TuyaSmartBaseKit/TuyaSmartRequest.h>


NS_ASSUME_NONNULL_BEGIN

@interface TuyaRNHomeListener : NSObject

+ (instancetype)shareInstance;

//注册新的SmartHome
- (void)registerHomeChangeWithSmartHome:(TuyaSmartHome *)smartHome;

//取消注册
- (void)removeHomeChangeSmartHome;

//注册新的 监听status
- (void)registerHomeStatusWithSmartHome:(TuyaSmartHome *)smartHome;

//取消 监听
- (void)removeHomeStatusSmartHome;

@end

NS_ASSUME_NONNULL_END
