//
//  TuyaRNHomeMemberModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/3/1.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNHomeMemberModule.h"
#import "TuyaRNUtils.h"
#import "YYModel.h"
#import <TuyaSmartDeviceKit/TuyaSmartHomeMember.h>
#import <TuyaSmartDeviceKit/TuyaSmartHome.h>

#define kTuyaRNHomeMemberModuleHomeId @"homeId"
#define kTuyaRNHomeMemberModuleCountryCode @"countryCode"
#define kTuyaRNHomeMemberModuleUserAccount @"userAccount"
#define kTuyaRNHomeMemberModuleName @"name"
#define kTuyaRNHomeMemberModuleAdmin @"admin"
#define kTuyaRNHomeMemberModuleMemberId @"id"
//#define kTuyaRNHomeMemberModule

@interface TuyaRNHomeMemberModule()

@property (nonatomic, strong) TuyaSmartHomeMember *homeMember;
@property (nonatomic, strong) TuyaSmartHome *smartHome;

@end

@implementation TuyaRNHomeMemberModule

RCT_EXPORT_MODULE(TuyaHomeMemberModule)

/**
 * 给这个Home下面添加成员
 *
 * @param countryCode 国家码
 * @param userAccount 用户名
 * @param name        昵称
 * @param admin       是否拥有管理员权限
 * @param callback
 */

RCT_EXPORT_METHOD(addMember:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  TuyaSmartHome *smartHome = [self smartHomeWithParams:params];
  
  NSString *name = params[kTuyaRNHomeMemberModuleName];
  NSString *countryCode = params[kTuyaRNHomeMemberModuleCountryCode];
  NSString *admin = params[kTuyaRNHomeMemberModuleAdmin];
  NSString *userAccount = params[kTuyaRNHomeMemberModuleUserAccount];
  
  [smartHome addHomeMemberWithName:name headPic:nil countryCode:countryCode userAccount:userAccount isAdmin:admin.boolValue success:^(NSDictionary *dict) {
    if (resolver) {
      resolver(dict);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

/**
 * 移除Home下面的成员
 *
 * @param id
 * @param callback
 */
RCT_EXPORT_METHOD(removeMember:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSNumber *memberId = params[kTuyaRNHomeMemberModuleMemberId];
  [self.homeMember removeHomeMemberWithMemberId:memberId.longLongValue success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

/**
 * 更新成员备注名和权限
 * @param name 备注名 如果不更改备注名，传入从memberBean获取的nickName
 * @param admin  是否是管理员
 * @param callback
 */
RCT_EXPORT_METHOD(updateMember:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSNumber *memberId = params[kTuyaRNHomeMemberModuleMemberId];
  NSString *name = params[kTuyaRNHomeMemberModuleName];
  NSNumber *admin = params[kTuyaRNHomeMemberModuleAdmin];
  
  [self.homeMember updateHomeMemberRemarkNameWithMemberId:memberId.longLongValue name:name isAdmin:admin.boolValue success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

/**
 * 查询Home下面的成员列表
 *
 */
RCT_EXPORT_METHOD(queryMemberList:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  self.smartHome = [self smartHomeWithParams:params];
  [self.smartHome getHomeMemberListWithSuccess:^(NSArray<TuyaSmartHomeMemberModel *> *memberList) {
    if (memberList.count == 0) {
      if (resolver) {
        resolver(@[]);
      }
      return;
    }
    NSMutableArray *memberDicList = [NSMutableArray array];
    for (TuyaSmartHomeMemberModel *memberModel in memberList) {
      NSDictionary *dic = [memberModel yy_modelToJSONObject];
      if (dic) {
        [memberDicList addObject:dic];
      }
    }
    if (resolver) {
      resolver(memberDicList);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

#pragma mark -
#pragma mark - init
- (TuyaSmartHome *)smartHomeWithParams:(NSDictionary *)params {
  long long homeId = ((NSNumber *)params[kTuyaRNHomeMemberModuleHomeId]).longLongValue;
  return [TuyaSmartHome homeWithHomeId:homeId];
}

- (TuyaSmartHomeMember *)homeMember {
  if (!_homeMember) {
    _homeMember = [[TuyaSmartHomeMember alloc] init];
  }
  return _homeMember;
}

@end
