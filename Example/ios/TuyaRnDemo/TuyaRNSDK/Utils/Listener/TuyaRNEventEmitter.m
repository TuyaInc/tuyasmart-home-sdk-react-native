//
//  TuyaRNEventEmitter.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/4.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNEventEmitter.h"

NSString *const kTYEventEmitterDeviceInfoEvent = @"devListener";
//NSString *const kTYEventEmitterFirmwareUpdateEvent = @"hardwareUpgradeListener";
NSString *const kTYEventEmitterGroupInfoEvent = @"groupListener";
NSString *const kTYEventEmitterHomeChangeEvent = @"homeChange";
NSString *const kTYEventEmitterHomeStatusEvent = @"homeStatus";



@interface TuyaRNEventEmitter()

@property (nonatomic) BOOL hasListeners;

@property (nonatomic, strong) NSMutableArray<NSString *> *supportedEvents;

@end

@implementation TuyaRNEventEmitter


RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
  return _supportedEvents;
}

- (void)addListener:(NSString *)eventName {
  [_supportedEvents addObject:eventName];
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(deviceInfoNotification:)
                                               name:eventName
                                             object:nil];
  [super addListener:eventName];
}

- (void)startObserving {

}

- (void)stopObserving {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - Native
- (instancetype)init {
  if (self = [super init]) {
    _supportedEvents = [NSMutableArray array];
  }
  return self;
}

- (void)deviceInfoNotification:(NSNotification *)notification {
  NSDictionary *body = notification.object;
  [self sendEventWithName:notification.name body:body];
}

+ (void)ty_sendEvent:(NSString *)event withBody:(id)body  {
  [[NSNotificationCenter defaultCenter] postNotificationName:event object:body];
//  [[TuyaRNEventEmitter sharedInstance] sendEventWithName:event body:body];
}

@end
