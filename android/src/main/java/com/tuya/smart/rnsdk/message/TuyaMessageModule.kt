package com.tuya.smart.rnsdk.message

import com.facebook.react.bridge.*
import com.tuya.smart.android.user.api.IBooleanCallback
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.Constant.IDS
import com.tuya.smart.rnsdk.utils.JsonUtils
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils
import com.tuya.smart.sdk.api.ITuyaDataCallback
import com.tuya.smart.sdk.bean.message.MessageBean
import java.util.ArrayList



class TuyaMessageModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaMessageModule"
    }
    @ReactMethod
    fun getMessageList(promise: Promise) {
       TuyaHomeSdk.getMessageInstance().getMessageList(object : ITuyaDataCallback<List<MessageBean>> {
            override fun onSuccess(p0: List<MessageBean>?) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(p0!!)))
            }

            override fun onError(p0: String?, p1: String?) {
                promise.reject(p0,p1)
            }
        })
    }

    @ReactMethod
    fun deleteMessage(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(IDS), params)) {
            var list = ArrayList<String>()
            var length = params.getArray(Constant.IDS).size()
            for (index in 0..length) {
                list.add(params.getArray(Constant.IDS).getString(index))
            }
            TuyaHomeSdk.getMessageInstance().deleteMessages(list,object :IBooleanCallback{
                override fun onSuccess(){
                    promise.resolve(Constant.SUCCESS)
                }

                override fun onError(var1: String, var2: String) {
                  promise.reject(var1,var2)
                }
            })
        }
    }
}