package com.tuya.smart.rnsdk.core

import android.app.Application
import android.content.Context
import android.text.TextUtils
import android.util.Log
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONArray
import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.rnsdk.utils.Constant.API_REQUEST_ERROR
import com.tuya.smart.rnsdk.utils.Constant.NEEDLOGIN
import com.tuya.smart.rnsdk.utils.TYRCTCommonUtil
import com.tuya.smart.rnsdk.utils.TuyaReactUtils
import com.tuya.smart.sdk.api.INeedLoginListener
import com.tuya.smart.sdk.api.IRequestCallback
import com.tuya.smart.sdk.api.ITuyaDataCallback
import java.util.HashMap


class TuyaCoreModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        fun initTuyaSDk(appKey:String,appSecret:String,application: Application){
            TuyaHomeSdk.init(application, appKey, appSecret)
        }

        fun initTuyaSDKWithoutOptions(application: Application){
            TuyaHomeSdk.init(application)
        }

        fun setSDKDebug(open:Boolean){
            TuyaHomeSdk.setDebugMode(open)
        }
    }

    override fun getName(): String {
        return "TuyaCoreModule"
    }

    /**
     *  不带参数的初始化，appKey和appSecret要写在AndroidManifest中
     */
    @ReactMethod
    @Deprecated("Android can't initSDK in react-native,it should be used in application")
    fun initWithoutOptions() {
        TuyaHomeSdk.init(reactApplicationContext.applicationContext as Application?);
        TuyaHomeSdk.setOnNeedLoginListener {
            TuyaReactUtils.sendEvent(reactApplicationContext, NEEDLOGIN, null)
        }
    }

    @ReactMethod
    @Deprecated("Android can't initSDK in react-native,it should be used in application")
    fun initWithOptions(params: ReadableMap) {
        val appKey = params.getString("appKey")
        val appSecret = params.getString("appSecret")
        TuyaHomeSdk.init(reactApplicationContext.applicationContext as Application?, appKey, appSecret)
        TuyaHomeSdk.setOnNeedLoginListener(INeedLoginListener() {
            fun onNeedLogin(context: Context?) {
                TuyaReactUtils.sendEvent(reactApplicationContext, NEEDLOGIN, null)
            }
        })
    }

    @ReactMethod
    fun setOnNeedLoginListener(){
        TuyaHomeSdk.setOnNeedLoginListener(INeedLoginListener() {
            fun onNeedLogin(context: Context?) {
                TuyaReactUtils.sendEvent(reactApplicationContext, NEEDLOGIN, null)
            }
        })
    }



    @ReactMethod
    fun exitApp() {
        TuyaHomeSdk.onDestroy();
    }

    @ReactMethod
    fun apiRequest(params: ReadableMap, promise: Promise) {
        val callback = object : ITuyaDataCallback<Any> {
            override fun onSuccess(data: Any?) {
                Log.e("apiRequest",data.toString())
                if (data is Boolean) {
                    Log.e("apiRequest", data.toString())
                    promise.resolve("success")
                    return
                }
//                val writableArray = TuyaReactUtils.parseToWritableArray(data as com.alibaba.fastjson.JSONArray)
//                promise.resolve(JSON.toJSONString(data))
                if(data is JSONArray){
                    Log.e("Array apiRequest",data.toString())
                    val writableArray = TYRCTCommonUtil.parseToWritableArray(data as com.alibaba.fastjson.JSONArray)
                    promise.resolve(writableArray)
                    return
                }
                Log.e("apiRequest", data.toString());
                val writableMap = TYRCTCommonUtil.parseToWritableMap(data)
                promise.resolve(writableMap)

            }

            override fun onError(errorCode: String?, errorMsg: String?) {
                promise.reject(errorCode, errorMsg)
            }

        }

//        val withoutSession = params.getBoolean("withoutSession")
        val withoutSession = false
        val apiName = params.getString("a")
        val apiVersion = params.getString("v")
        val postData = TYRCTCommonUtil.parseToMap(params.getMap("postData"))
        if (TextUtils.isEmpty(apiName)) {
            promise.reject(API_REQUEST_ERROR, "ApiName is empty")
            return
        }

        if (withoutSession) {
            TuyaHomeSdk.getRequestInstance().requestWithApiNameWithoutSession(apiName, apiVersion, postData, Any::class.java, callback)
        } else {
            TuyaHomeSdk.getRequestInstance().requestWithApiName(apiName, apiVersion, postData, Any::class.java,callback)
        }

    }

}

