//
//  TuyaSmartDevice+DevId.h
//  TuyaRnDemo
//
//  Created by Gino on 2020/5/11.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <TuyaSmartDeviceKit/TuyaSmartDeviceKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface TuyaSmartDevice (DevId)
@property (nonatomic, strong, readonly) NSString *devId;
@end

NS_ASSUME_NONNULL_END
