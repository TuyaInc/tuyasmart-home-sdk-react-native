//
//  TuyaRNEventEmitter.h
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>

extern NSString *const kTYEventEmitterDeviceInfoEvent;
//extern NSString *const kTYEventEmitterFirmwareUpdateEvent;
extern NSString *const kTYEventEmitterGroupInfoEvent;
extern NSString *const kTYEventEmitterHomeChangeEvent;
extern NSString *const kTYEventEmitterHomeStatusEvent;

NS_ASSUME_NONNULL_BEGIN

@interface TuyaRNEventEmitter : RCTEventEmitter <RCTBridgeModule>

+ (void)ty_sendEvent:(NSString *)event withBody:(id)body;

@end

NS_ASSUME_NONNULL_END
