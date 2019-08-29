//
//  TuyaRNUserModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNUserModule.h"
#import <TuyaSmartBaseKit/TuyaSmartBaseKit.h>
#import <TuyaSmartBaseKit/TuyaSmartUser+Region.h>
#import <React/RCTBridgeModule.h>
#import "TuyaRNUtils.h"
#import "YYModel.h"

#define kTuyaRNUserModuleCountryCode @"countryCode"
#define kTuyaRNUserModulePhoneNumber @"phoneNumber"
#define kTuyaRNUserModulePhone @"phone"
#define kTuyaRNUserModuleValidateType @"validateType"
#define kTuyaRNUserModuleValidateCode @"validateCode"
#define kTuyaRNUserModulePassword @"password"
#define kTuyaRNUserModuleNewPassword @"newPassword"
#define kTuyaRNUserModuleEmail @"email"
#define kTuyaRNUserModuleEmailCode @"emailCode"
#define kTuyaRNUserModuleUid @"uid"


#define kTuyaRNUserModuleTwitterKey @"key"
#define kTuyaRNUserModuleTwitterSecret @"secret"
#define kTuyaRNUserModuleQQUserId @"userId"
#define kTuyaRNUserModuleQQAccessToken @"accessToken"
#define kTuyaRNUserModuleWechatkCode @"code"
#define kTuyaRNUserModuleFacebookCode @"code"

#define kTuyaRNUserModuleImageFile @"file"
#define kTuyaRNUserModuleUnit @"unit"


@implementation TuyaRNUserModule

RCT_EXPORT_MODULE(TuyaUserModule)


RCT_EXPORT_METHOD(isLogin:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  bool isLogin = [[TuyaSmartUser sharedInstance] isLogin];
  if(resolver) {
    resolver(@(isLogin));
  }
}

RCT_EXPORT_METHOD(getUser:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartUser *user = [TuyaSmartUser sharedInstance];
  if (resolver) {
    NSDictionary *dic = [user yy_modelToJSONObject];
    NSMutableDictionary *userDic = [NSMutableDictionary dictionaryWithDictionary:dic];
    [userDic setObject:[self getValidStr:user.userName] forKey:@"username"];
    [userDic setObject:[self getValidStr:user.headIconUrl] forKey:@"headPic"];
    [userDic setObject:[self getValidStr:user.countryCode] forKey:@"phoneCode"];
    [userDic setObject:[self getValidStr:user.phoneNumber] forKey:@"mobile"];
    [userDic setObject:[self getValidStr:user.email] forKey:@"email"];
    [userDic setObject:[self getValidStr:user.nickname] forKey:@"nickname"];
    [userDic setObject:[self getValidStr:user.timezoneId] forKey:@"timezoneId"];
    resolver(userDic);
  }
}

//版本检测
RCT_EXPORT_METHOD(checkVersionUpgrade:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {

  if(resolver) {
    resolver([NSNumber numberWithBool:[[TuyaSmartSDK sharedInstance] checkVersionUpgrade]]);
  }
}

//版本升级
RCT_EXPORT_METHOD(upgradeVersion:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  [[TuyaSmartSDK sharedInstance] upgradeVersion:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/*获取手机验证码
* @param countryCode   国家区号
* @param phoneNumber   手机号码
* @param validateType  验证码类型
*/
RCT_EXPORT_METHOD(getValidateCode:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *phoneNumber = params[kTuyaRNUserModulePhoneNumber];
  NSInteger aType = 1;
  NSString *validateType = params[kTuyaRNUserModuleValidateType];
  if (validateType) {
    if ([validateType isKindOfClass:[NSString class]] ||
        [validateType isKindOfClass:[NSNumber class]]) {
      aType = validateType.integerValue;
    }
  }
  [[TuyaSmartUser sharedInstance] sendVerifyCode:countryCode phoneNumber:phoneNumber type:aType success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(checkPhoneCode:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[@"countryCode"];
  NSString *phoneNumber = params[@"phoneNumber"];
  NSString *code = params[@"code"];
//  NSString *type = params[@"type"];
  
  [[TuyaSmartUser sharedInstance] checkCodeWithUserName:phoneNumber region:nil countryCode:countryCode code:code type:[params[@"type"] integerValue] success:^(BOOL result) {
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

// 没有在SDK中找到相关方法:
RCT_EXPORT_METHOD(checkEmailPassword:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {

  NSString *password = params[@"password"];

//  [[TuyaSmartUser sharedInstance] email];
  
}


RCT_EXPORT_METHOD(loginOrRegisterWithUidAndCreateHome:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *uid = params[@"uid"];
  BOOL create = [params[@"isCreateHome"] boolValue];
  NSString *password = params[@"password"];
  
  [[TuyaSmartUser sharedInstance] loginOrRegisterWithCountryCode:countryCode uid:uid password:password createHome:create success:^(id result) {
    resolver([result yy_modelToJSONObject]);
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

RCT_EXPORT_METHOD(bindMobile:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *phoneNumber = params[@"phoneNumber"];
  NSString *code = params[@"code"];
  
  [[TuyaSmartUser sharedInstance] mobileBinding:countryCode phoneNumber:phoneNumber code:code success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

RCT_EXPORT_METHOD(sendBindVerifyCode:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *phoneNumber = params[@"phoneNumber"];
  
  [[TuyaSmartUser sharedInstance] sendBindVerifyCode:countryCode phoneNumber:phoneNumber success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(updateTimeZone:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *timeZoneId = params[@"timezoneId"];
  
  [[TuyaSmartUser sharedInstance] updateTimeZoneWithTimeZoneId:timeZoneId success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


/* 手机验证码登陆
* @param countryCode 国家区号
* @param phone       电话
* @param code        验证码
*/
RCT_EXPORT_METHOD(loginWithValidateCode:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *phoneNumber = params[kTuyaRNUserModulePhoneNumber];
  NSString *phone = params[kTuyaRNUserModulePhone];
  
  if(phone.length > 0) {
    phoneNumber = phone;
  }
  NSString *validateCode = params[kTuyaRNUserModuleValidateCode];
  [[TuyaSmartUser sharedInstance] login:countryCode phoneNumber:phoneNumber code:validateCode success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/*
* 注册手机密码账户
* @param countryCode 国家区号
* @param phone       手机密码
* @param passwd      登陆密码
*/
RCT_EXPORT_METHOD(registerAccountWithPhone:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *phoneNumber = params[kTuyaRNUserModulePhoneNumber];
  NSString *phone = params[kTuyaRNUserModulePhone];
  if(phone.length > 0) {
    phoneNumber = phone;
  }
  NSString *password = params[kTuyaRNUserModulePassword];
  
  //验证码  可以为空
  NSString *validateCode = params[kTuyaRNUserModuleValidateCode];
  if (validateCode.length == 0) {
    validateCode = @"";
  }

  [[TuyaSmartUser sharedInstance] registerByPhone:countryCode phoneNumber:phoneNumber password:password code:validateCode success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/*手机密码登陆
* @param countryCode 国家区号
* @param phone       手机密码
* @param passwd      登陆密码
 */
RCT_EXPORT_METHOD(loginWithPhonePassword:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *phoneNumber = params[kTuyaRNUserModulePhoneNumber];
  NSString *phone = params[kTuyaRNUserModulePhone];
  if(phone.length > 0) {
    phoneNumber = phone;
  }
  NSString *password = params[kTuyaRNUserModulePassword];
  
  [[TuyaSmartUser sharedInstance] loginByPhone:countryCode phoneNumber:phoneNumber password:password success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/* 重置密码
* @param countryCode 国家区号
* @param phone       手机号码
* @param code        手机验证码
* @param newPasswd   新密码
*/
RCT_EXPORT_METHOD(resetPhonePassword:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *phoneNumber = params[kTuyaRNUserModulePhoneNumber];
  NSString *phone = params[kTuyaRNUserModulePhone];
  if(phone.length > 0) {
    phoneNumber = phone;
  }
  NSString *password = params[kTuyaRNUserModuleNewPassword];
  NSString *validateCode = params[kTuyaRNUserModuleValidateCode];
  
  [[TuyaSmartUser sharedInstance] resetPasswordByPhone:countryCode phoneNumber:phoneNumber newPassword:password code:validateCode success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/* 邮箱注册获取验证码
* @param email  邮箱账户
* @param countryCode 国家区号
*/
RCT_EXPORT_METHOD(getRegisterEmailValidateCode:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {

  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *email = params[kTuyaRNUserModuleEmail];
  
  [[TuyaSmartUser sharedInstance] sendVerifyCodeByRegisterEmail:countryCode email:email success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/* 邮箱密码注册
* @param countryCode 国家区号
* @param email       邮箱账户
* @param passwd      登陆密码
*/
RCT_EXPORT_METHOD(registerAccountWithEmail:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *email = params[kTuyaRNUserModuleEmail];
  NSString *password = params[kTuyaRNUserModulePassword];
  
  [[TuyaSmartUser sharedInstance] registerByEmail:countryCode email:email password:password success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/*
* 邮箱密码登陆
* @param email  邮箱账户
* @param passwd 登陆密码
*/
RCT_EXPORT_METHOD(loginWithEmail:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *email = params[kTuyaRNUserModuleEmail];
  NSString *password = params[kTuyaRNUserModulePassword];
  
  [[TuyaSmartUser sharedInstance] loginByEmail:countryCode email:email password:password success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}


RCT_EXPORT_METHOD(switchUserRegion:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *region = params[@"region"];
  
  [[TuyaSmartUser sharedInstance] switchUserRegion:region success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(sendVerifyCodeWithUserName:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *region = params[@"region"];
  NSString *userName = params[@"userName"];
  NSString *countryCode = params[@"countryCode"];
  NSInteger type = [params[@"type"] integerValue];
  
  [[TuyaSmartUser sharedInstance] sendVerifyCodeWithUserName:userName region:region countryCode:countryCode type:type success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(checkCodeWithUserName:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *region = params[@"region"];
  NSString *userName = params[@"userName"];
  NSString *countryCode = params[@"countryCode"];
  NSString *code = params[@"code"];
  NSInteger type = [params[@"type"] integerValue];
  
  [[TuyaSmartUser sharedInstance] checkCodeWithUserName:userName region:region countryCode:countryCode code:code type:type success:^(BOOL result) {
    resolver(@(result));
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}



RCT_EXPORT_METHOD(registerWithUserName:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *region = params[@"region"];
  NSString *userName = params[@"userName"];
  NSString *countryCode = params[@"countryCode"];
  NSString *code = params[@"code"];
  NSInteger type = [params[@"type"] integerValue];
  NSString *password = params[@"password"];
  
  [[TuyaSmartUser sharedInstance] registerWithUserName:userName region:region countryCode:countryCode code:code password:password success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}



/*
* 邮箱找回密码，获取验证码
* @param countryCode 国家区号
* @param email       邮箱账户
*/
RCT_EXPORT_METHOD(getEmailValidateCode:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *email = params[kTuyaRNUserModuleEmail];
  
  [[TuyaSmartUser sharedInstance] sendVerifyCodeByEmail:countryCode email:email success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/* 邮箱重置密码
* @param email     用户账户
* @param emailCode 邮箱验证码
* @param passwd    新密码
*/
RCT_EXPORT_METHOD(resetEmailPassword:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *email = params[kTuyaRNUserModuleEmail];
  NSString *emailCode = params[kTuyaRNUserModuleEmailCode];
  NSString *password = params[kTuyaRNUserModulePassword];
  
  [[TuyaSmartUser sharedInstance] resetPasswordByEmail:countryCode email:email newPassword:password code:emailCode success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

RCT_EXPORT_METHOD(logout:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  [[TuyaSmartUser sharedInstance] loginOut:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

RCT_EXPORT_METHOD(cancelAccount:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  [[TuyaSmartUser sharedInstance] cancelAccount:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/* 用户uid注册
* @param countryCode 国家号码
* @param uid         用户uid
* @param password    用户密码
*/
RCT_EXPORT_METHOD(registerAccountWithUid:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *uid = params[kTuyaRNUserModuleUid];
  NSString *password = params[kTuyaRNUserModulePassword];
  
  [[TuyaSmartUser sharedInstance] registerByUid:uid password:password countryCode:countryCode success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}


/* uid 登陆
* @param countryCode 国家号码
* @param uid         用户uid
* @param passwd      用户密码
 */

RCT_EXPORT_METHOD(loginWithUid:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *uid = params[kTuyaRNUserModuleUid];
  NSString *password = params[kTuyaRNUserModulePassword];
  
  [[TuyaSmartUser sharedInstance] loginByUid:uid password:password countryCode:countryCode success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}


/* uid 登陆+注册
* @param countryCode 国家号码
* @param uid         用户uid
* @param passwd      用户密码
*/
RCT_EXPORT_METHOD(loginOrRegisterWithUid:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *uid = params[kTuyaRNUserModuleUid];
  NSString *password = params[kTuyaRNUserModulePassword];
  
  [[TuyaSmartUser sharedInstance] loginOrRegisterByPhone:countryCode uid:uid password:password success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

/* Twitter 登陆
* @param countryCode 国家区号
* @param key         twitter授权登录获取的key
* @param secret      twitter授权登录获取的secret
 */
RCT_EXPORT_METHOD(loginByTwitter:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *key = params[kTuyaRNUserModuleTwitterKey];
  NSString *secret = params[kTuyaRNUserModuleTwitterSecret];
  
  [[TuyaSmartUser sharedInstance] loginByTwitter:countryCode key:key secret:secret success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

/* QQ登录
* @param countryCode 国家区号
* @param userId          QQ授权登录获取的userId
* @param accessToken      QQ授权登录获取的accessToken
*/
RCT_EXPORT_METHOD(loginByQQ:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *userId = params[kTuyaRNUserModuleQQUserId];
  NSString *accountToken = params[kTuyaRNUserModuleQQAccessToken];
  
  [[TuyaSmartUser sharedInstance] loginByQQ:countryCode userId:userId accessToken:accountToken success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

/* 微信登录
* @param countryCode 国家区号
* @param code        微信授权登录获取的code
*/
RCT_EXPORT_METHOD(loginByWechat:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *code = params[kTuyaRNUserModuleWechatkCode];
  
  [[TuyaSmartUser sharedInstance] loginByWechat:countryCode code:code success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}

/* Facebook登录
* @param countryCode 国家区号
* @param code     token facebook授权登录获取的token
 */
RCT_EXPORT_METHOD(loginByFacebook:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *countryCode = params[kTuyaRNUserModuleCountryCode];
  NSString *code = params[kTuyaRNUserModuleFacebookCode];
  
  [[TuyaSmartUser sharedInstance] loginByFacebook:countryCode token:code success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


RCT_EXPORT_METHOD(getCurrentUser:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartUser *user = [TuyaSmartUser sharedInstance];
  if (resolver) {
    NSDictionary *dic = [user yy_modelToJSONObject];
    NSMutableDictionary *userDic = [NSMutableDictionary dictionaryWithDictionary:dic];
    [userDic setObject:[self getValidStr:user.userName] forKey:@"username"];
    [userDic setObject:[self getValidStr:user.headIconUrl] forKey:@"headPic"];
    [userDic setObject:[self getValidStr:user.countryCode] forKey:@"phoneCode"];
    [userDic setObject:[self getValidStr:user.phoneNumber] forKey:@"mobile"];
    [userDic setObject:[self getValidStr:user.email] forKey:@"email"];
    [userDic setObject:[self getValidStr:user.nickname] forKey:@"nickname"];
    [userDic setObject:[self getValidStr:user.timezoneId] forKey:@"timezoneId"];
    resolver(userDic);
  }
}


RCT_EXPORT_METHOD(uploadUserAvatar:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  UIImage *image = params[kTuyaRNUserModuleImageFile];
  
  if (image == nil || [image isKindOfClass:[UIImage class]]) {
    [TuyaRNUtils rejecterWithError:[NSError tysdk_errorWithErrorCode:TUYA_COMMON_ERROR errorMsg:@"error image info"] handler:rejecter];
    return;
  }
  
  [[TuyaSmartUser sharedInstance] updateHeadIcon:image success:^{
    [TuyaRNUtils resolverWithHandler:resolver];
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}

RCT_EXPORT_METHOD(setTempUnit:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
  NSString *unit = params[kTuyaRNUserModuleUnit];
  if (unit) {
    [[TuyaSmartUser sharedInstance] setTempUnit:unit.integerValue];
    if (resolver) {
      resolver(@"success");
    }
  } else {
    [TuyaRNUtils rejecterWithError:[NSError tysdk_errorWithErrorCode:TUYA_COMMON_ERROR errorMsg:@"error params"] handler:rejecter];
  }
}

RCT_EXPORT_METHOD(onDestroy:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  
}


RCT_EXPORT_METHOD(getRegionListWithCountryCode:(NSDictionary *)params resolver: (RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  [[TuyaSmartUser sharedInstance] regionListWithCountryCode:params[@"countryCode"] success:^(NSArray<TYRegionModel *> * _Nonnull regionList) {
    if (resolver) {
      resolver([regionList yy_modelToJSONObject]);
    }
  } failure:^(NSError *error) {
    
  }];

}



#pragma mark -
#pragma mark - api
- (NSString *)getValidStr:(NSString *)str {
  if (str.length == 0) {
    return @"";
  }
  return str;
}

@end
