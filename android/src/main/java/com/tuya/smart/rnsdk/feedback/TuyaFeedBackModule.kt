package com.tuya.smart.rnsdk.feedback

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.home.sdk.callback.ITuyaResultCallback
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.Constant.HDID
import com.tuya.smart.rnsdk.utils.Constant.HDTYPE
import com.tuya.smart.rnsdk.utils.JsonUtils
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils
import com.tuya.smart.sdk.api.ITuyaDataCallback
import com.tuya.smart.sdk.bean.feedback.FeedbackBean
import com.tuya.smart.sdk.bean.feedback.FeedbackMsgBean
import com.tuya.smart.sdk.bean.feedback.FeedbackTypeRespBean
import io.netty.handler.codec.stomp.StompHeaders.MESSAGE

class TuyaFeedBackModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaFeedBackModule"
    }

    /*获取反馈列表*/
    @ReactMethod
    fun getFeedbackList(promise: Promise) {
        TuyaHomeSdk.getTuyaFeekback().getFeedbackManager().getFeedbackList(object : ITuyaDataCallback<List<FeedbackBean>> {
            override fun onSuccess(var1: List<FeedbackBean>) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1!!)))
            }

            override fun onError(var1: String, var2: String) {
                promise.reject(var1, var2)
            }
        })
    }


    /*获取反馈列表*/
    @ReactMethod
    fun getFeedbackType(promise: Promise) {
        TuyaHomeSdk.getTuyaFeekback().getFeedbackManager().getFeedbackType(object : ITuyaDataCallback<List<FeedbackTypeRespBean>> {
            override fun onSuccess(var1: List<FeedbackTypeRespBean>) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1!!)))
            }

            override fun onError(var1: String, var2: String) {
                promise.reject(var1, var2)
            }
        })
    }


    /*添加反馈*/
    @ReactMethod
    fun addFeedback(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.MESEAGE, Constant.CONTACT, Constant.HDID, Constant.HDTYPE), params)) {
            TuyaHomeSdk.getTuyaFeekback().getFeedbackManager().addFeedback(params.getString(Constant.MESEAGE), params.getString(Constant.CONTACT),
                    params.getString(HDID), params.getInt(HDTYPE),
                    object : ITuyaDataCallback<FeedbackMsgBean> {
                        override fun onSuccess(var1: FeedbackMsgBean) {
                            promise.resolve(TuyaReactUtils.parseToWritableMap(var1!!))
                        }

                        override fun onError(var1: String, var2: String) {
                            promise.reject(var1, var2)
                        }
                    })
        }
    }


    /*获取反馈消息列表*/
    @ReactMethod
    fun getMsgList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.HDID, Constant.HDTYPE), params)) {
            TuyaHomeSdk.getTuyaFeekback().getFeedbackMsg(params.getString(HDID), params.getInt(HDTYPE))
                    .getMsgList(
                            object : ITuyaDataCallback<List<FeedbackMsgBean>> {
                                override fun onSuccess(var1: List<FeedbackMsgBean>) {
                                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1!!)))
                                }

                                override fun onError(var1: String, var2: String) {
                                    promise.reject(var1, var2)
                                }
                            })
        }
    }


    /*添加新反馈*/
    @ReactMethod
    fun addMsg(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.HDID, Constant.HDTYPE, Constant.MESEAGE, Constant.CONTACT), params)) {
            TuyaHomeSdk.getTuyaFeekback().getFeedbackMsg(params.getString(HDID), params.getInt(HDTYPE))
                    .addMsg(params.getString(Constant.MESEAGE), params.getString(Constant.CONTACT),
                            object : ITuyaDataCallback<FeedbackMsgBean> {
                                override fun onSuccess(var1: FeedbackMsgBean) {
                                    promise.resolve(TuyaReactUtils.parseToWritableMap(var1!!))
                                }

                                override fun onError(var1: String, var2: String) {
                                    promise.reject(var1, var2)
                                }
                            })
        }
    }

}