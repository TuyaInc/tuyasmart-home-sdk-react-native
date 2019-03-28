package com.tuya.smart.rnsdk.device

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.rnsdk.utils.*
import com.tuya.smart.sdk.api.ISubDevListener

class TuyaGatewayModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaGatewayModule"
    }

    @ReactMethod
    fun publishDps(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.DEVID,Constant.LOCALID,Constant.DPS), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).publishDps(params.getString(Constant.LOCALID),params.getString(Constant.DPS),Constant.getIResultCallback(promise))
        }
    }



    @ReactMethod
    fun broadcastDps(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.DEVID,Constant.DPS), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).broadcastDps(params.getString(Constant.DPS),Constant.getIResultCallback(promise))
        }
    }

    @ReactMethod
    fun multicastDps(params: ReadableMap,promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.DEVID,Constant.LOCALID,Constant.DPS), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).multicastDps(params.getString(Constant.LOCALID),params.getString(Constant.DPS),Constant.getIResultCallback(promise))
        }
    }



    @ReactMethod
    fun registerSubDevListener(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.DEVID), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).registerSubDevListener(object :ISubDevListener{
                override fun onSubDevDpUpdate(var1: String, var2: String){
                    val map = Arguments.createMap()
                    map.putString("devId", var1)
                    map.putString("dpStr", var2)
                    map.putString("type", "onSubDevDpUpdate");
                    BridgeUtils.subDevListener(reactApplicationContext, map, params.getString(Constant.DEVID))
                }

                override fun onSubDevRemoved(var1: String){
                    val map = Arguments.createMap()
                    map.putString("devId", var1)
                    map.putString("type", "onSubDevRemoved");
                    BridgeUtils.subDevListener(reactApplicationContext, map, params.getString(Constant.DEVID))
                }

                override fun onSubDevAdded(var1: String){
                    val map = Arguments.createMap()
                    map.putString("devId", var1)
                    map.putString("type", "onSubDevAdded");
                    BridgeUtils.subDevListener(reactApplicationContext, map, params.getString(Constant.DEVID))
                }

                override fun onSubDevInfoUpdate(var1: String){
                    val map = Arguments.createMap()
                    map.putString("devId", var1)
                    map.putString("type", "onSubDevInfoUpdate");
                    BridgeUtils.subDevListener(reactApplicationContext, map, params.getString(Constant.DEVID))
                }

                override fun onSubDevStatusChanged(var1: List<String>, var2: List<String>){
                    val map = Arguments.createMap()
                    map.putArray("data1", TuyaReactUtils.parseToWritableArray(
                            JsonUtils.toJsonArray(var1)))
                    map.putArray("data2", TuyaReactUtils.parseToWritableArray(
                            JsonUtils.toJsonArray(var2)));
                    map.putString("type", "onSubDevStatusChanged");
                    BridgeUtils.subDevListener(reactApplicationContext, map, params.getString(Constant.DEVID))
                }
            })
        }
    }

    @ReactMethod
    fun unRegisterSubDevListener(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.DEVID), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).unRegisterSubDevListener()
        }
    }
}