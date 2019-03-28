//
//  TuyaRNUtils.h
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


NS_ASSUME_NONNULL_BEGIN

@interface TuyaRNUtils : NSObject

+ (void)rejecterWithError:(NSError *)error
                  handler:(RCTPromiseRejectBlock)rejecter;

+ (void)resolverWithHandler:(RCTPromiseResolveBlock)resolver;

@end

NS_ASSUME_NONNULL_END
