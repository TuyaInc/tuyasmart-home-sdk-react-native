//
//  TuyaCoreApi.m
//  TuyaSdkTest
//
//  Created by 浩天 on 2019/2/27.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaCoreModule.h"
#import <TuyaSmartBaseKit/TuyaSmartBaseKit.h>
#import <CoreGraphics/CoreGraphics.h>
#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>

#define kTuyaCoreApiAppkey @"appKey"
#define kTuyaCoreApiAppSecret @"appSecret"

#define kTuyaCoreApiLocation_lat @"ty_rn_lat"
#define kTuyaCoreApiLocation_lon @"ty_rn_lon"


@interface TuyaCoreApi()<CLLocationManagerDelegate>

@property (nonatomic, strong) CLLocationManager *locationManager;

@end


@implementation TuyaCoreModule

RCT_EXPORT_MODULE(TuyaCoreModule)

RCT_EXPORT_METHOD(initWithOptions:(NSDictionary *)params) {
  
  NSString *appKey = params[kTuyaCoreApiAppkey];
  NSString *appSecret = params[kTuyaCoreApiAppSecret];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [[TuyaSmartSDK sharedInstance] startWithAppKey:appKey secretKey:appSecret];
#ifdef DEBUG
    [TuyaSmartSDK sharedInstance].debugMode = YES;
#endif
    
    if (!self.locationManager) {
      self.locationManager = [CLLocationManager new];
      self.locationManager.delegate = self;
    }
    if ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedWhenInUse || [CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedAlways) {
      [self.locationManager startUpdatingLocation];
    } else {
      if ([self.locationManager respondsToSelector:@selector(requestWhenInUseAuthorization)]) {
        [self.locationManager requestWhenInUseAuthorization];
      }
    }
  });
}

//通用api
RCT_REMAP_METHOD(apiRequest,
                 postData:(NSDictionary *)parameters
                 resolver:(RCTPromiseResolveBlock)resolver
                 rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *apiName       = [parameters objectForKey:@"apiName"];
  NSDictionary *postData  = [parameters objectForKey:@"postData"];
  NSString *version       = [parameters objectForKey:@"version"];
  
  TuyaSmartRequest *request = [TuyaSmartRequest new];
  
  [request requestWithApiName:apiName postData:postData version:version success:^(id result) {
    if ([result isKindOfClass:[NSDictionary class]] || [result isKindOfClass:[NSArray class]]) {
      if (resolver) {
        resolver([result ty_JSONString]);
      }
    } else {
      if (resolver) {
        resolver([result description]);
      }
    }
  } failure:^(NSError *error) {
    if (rejecter) {
      rejecter([NSString stringWithFormat:@"%ld", error.code], error.userInfo[NSLocalizedDescriptionKey], error);
    }
  }];
}


#pragma mark - delegate
#pragma mark - <CLLocationManagerDelegate>

- (void)locationManager:(CLLocationManager *)manager
     didUpdateLocations:(NSArray<CLLocation *> *)locations {
  if (!([locations isKindOfClass:[NSArray class]] && locations.count > 0)) {
    return;
  }
  CLLocation *location = locations[0];
  
  [self.locationManager stopUpdatingLocation];
  
  NSString *latitude = [NSString stringWithFormat:@"%f", location.coordinate.latitude];
  NSString *longitude = [NSString stringWithFormat:@"%f", location.coordinate.longitude];
  
  [[NSUserDefaults standardUserDefaults] setObject:latitude forKey:kTuyaCoreApiLocation_lat];
  [[NSUserDefaults standardUserDefaults] setObject:longitude forKey:kTuyaCoreApiLocation_lon];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status {
  if ([CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedWhenInUse || [CLLocationManager authorizationStatus] == kCLAuthorizationStatusAuthorizedAlways) {
    [self.locationManager startUpdatingLocation];
  }
}


@end
