//
//  TuyaRNUtils+Cache.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/2.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNUtils+Cache.h"

#define kTuyaRNSDKCurrentHomeId @"TuyaRNSDKCurrentHomeId"

@implementation TuyaRNUtils (Cache)

+ (NSNumber *)currentHomeId {
  return [[NSUserDefaults standardUserDefaults] objectForKey:kTuyaRNSDKCurrentHomeId];
}

+ (void)setCurrentHomeId:(NSNumber *)homeId {
  if (!homeId) {
    return;
  }
  [[NSUserDefaults standardUserDefaults] setObject:homeId forKey:kTuyaRNSDKCurrentHomeId];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

@end
