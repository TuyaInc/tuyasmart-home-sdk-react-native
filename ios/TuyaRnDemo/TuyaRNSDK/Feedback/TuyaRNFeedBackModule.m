//
//  TuyaRNFeedBackModule.m
//  TuyaRnDemo
//
//  Created by 浩天 on 2019/2/28.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "TuyaRNFeedBackModule.h"
#import <TuyaSmartFeedbackKit/TuyaSmartFeedbackKit.h>
#import "TuyaRNUtils.h"
#import "YYModel.h"

@interface TuyaRNFeedBackModule()
@property (nonatomic, strong) TuyaSmartFeedback *smartFeedback;
@end


@implementation TuyaRNFeedBackModule

RCT_EXPORT_MODULE(TuyaFeedBackModule)

RCT_EXPORT_METHOD(initWithOptions:(NSDictionary *)params) {
  
}

// 获取反馈列表：
RCT_EXPORT_METHOD(getFeedbackMsg:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    TuyaSmartFeedback *feedBack = [[TuyaSmartFeedback alloc] init];
  self.smartFeedback = feedBack;
  [feedBack getFeedbackList:params[@"hdId"] hdType:[params[@"hdType"] unsignedIntegerValue] success:^(NSArray<TuyaSmartFeedbackModel *> *list) {
    NSMutableArray *res = [NSMutableArray array];
    for (TuyaSmartFeedbackModel *item in list) {
      NSDictionary *dic = [item yy_modelToJSONObject];
      [res addObject:dic];
    }
    if (resolver) {
      resolver(res);
    }
  } failure:^(NSError *error) {
    [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
  
}



// 获取反馈类型列表：
RCT_EXPORT_METHOD(getFeedbackType:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    TuyaSmartFeedback *feedBack = [[TuyaSmartFeedback alloc] init];
  self.smartFeedback = feedBack;
    [feedBack getFeedbackTypeList:^(NSArray<TuyaSmartFeedbackTypeListModel *> *list) {
      
      NSMutableArray *res = [NSMutableArray array];
        for (TuyaSmartFeedbackTypeListModel *item in list) {
          NSDictionary *dic = [item yy_modelToJSONObject];
          [res addObject:dic];
        }
        if (resolver) {
          resolver(res);
        }
    } failure:^(NSError *error) {
        [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}


// 新增反馈：
RCT_EXPORT_METHOD(addMsg:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
  TuyaSmartFeedback *feedBack = [[TuyaSmartFeedback alloc] init];
  self.smartFeedback = feedBack;
  [feedBack addFeedback:params[@"message"] hdId:params[@"hdId"] hdType:[params[@"hdType"] integerValue] contact:params[@"contact"] success:^{
      if (resolver) {
        resolver(@"success");
      }
  } failure:^(NSError *error) {
      [TuyaRNUtils rejecterWithError:error handler:rejecter];
  }];
}


// 反馈消息管理：
RCT_EXPORT_METHOD(getFeedbackList:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter) {
    TuyaSmartFeedback *feedBack = [[TuyaSmartFeedback alloc] init];
  self.smartFeedback = feedBack;
    [feedBack getFeedbackTalkList:^(NSArray<TuyaSmartFeedbackTalkListModel *> *list) {
      NSMutableArray *res = [NSMutableArray array];
        for (TuyaSmartFeedbackTalkListModel *item in list) {
          NSDictionary *dic = [item yy_modelToJSONObject];
          [res addObject:dic];
        }
        if (resolver) {
          resolver(res);
        }
    } failure:^(NSError *error) {
        [TuyaRNUtils rejecterWithError:error handler:rejecter];
    }];
}



@end
