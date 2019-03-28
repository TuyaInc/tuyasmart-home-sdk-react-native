package com.tuya.smart.rnsdk.device

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.home.sdk.bean.TransferDataBean
import com.tuya.smart.rnsdk.utils.BridgeUtils
import com.tuya.smart.rnsdk.utils.Constant
import com.tuya.smart.rnsdk.utils.Constant.DEVID
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils
import com.tuya.smart.sdk.api.ITuyaDataCallback

class TuyaSingleTransferModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaSingleTransferModule"
    }

    /**
     * 开始连接
     */
    @ReactMethod
    fun startConnect() {
       TuyaHomeSdk.getTransferInstance().startConnect()
    }

    /**
     * 是否在线
     */
    @ReactMethod
    fun isOnline(promise: Promise) {
       promise.resolve(TuyaHomeSdk.getTransferInstance().isOnline)
    }

    /**
     * 订阅设备数据，订阅设备之后，设备如果有数据上报上来，便可以通过 registerTransferDataListener 回调上来。需要注意的是，每次通道连接成功都需要重新订阅设备数据
     */
    @ReactMethod
    fun subscribeDevice(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.DEVID), params)) {
            TuyaHomeSdk.getTransferInstance().subscribeDevice(params.getString(DEVID))
        }
    }

    /**
     * 取消订阅设备信息，则设备数据不在收到
     *
     */
    @ReactMethod
    fun unSubscribeDevice(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.DEVID), params)) {
            TuyaHomeSdk.getTransferInstance().unSubscribeDevice(params.getString(DEVID))
        }
    }

    @ReactMethod
    fun registerTransferDataListener(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.DEVID), params)) {
            TuyaHomeSdk.getTransferInstance().registerTransferDataListener(object : ITuyaDataCallback<TransferDataBean>{
                override fun onSuccess(var1: TransferDataBean){
                    val map = Arguments.createMap()
                    map.putString("devId", params.getString(DEVID))
                    map.putMap("data", TuyaReactUtils.parseToWritableMap(var1))
                    map.putString("type", "onSuccess");
                    BridgeUtils.singleTransferListener(reactApplicationContext, map, params.getString(DEVID))
                }

                override fun onError(var1: String, var2: String){
                    val map = Arguments.createMap()
                    map.putString("devId", params.getString(DEVID))
                    map.putString("var1", var1)
                    map.putString("var2", var2)
                    map.putString("type", "onError");
                    BridgeUtils.singleTransferListener(reactApplicationContext, map, params.getString(DEVID))
                }
            })
        }
    }

    @ReactMethod
    fun unRegisterTransferDataListener(params: ReadableMap) {
    }
    @ReactMethod
    fun stopConnect() {
        TuyaHomeSdk.getTransferInstance().stopConnect()
    }
}