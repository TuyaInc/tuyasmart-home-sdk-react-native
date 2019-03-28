package com.tuya.smart.rnsdk.group

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.home.sdk.api.ITuyaHome
import com.tuya.smart.home.sdk.callback.ITuyaResultCallback
import com.tuya.smart.rnsdk.utils.*
import com.tuya.smart.rnsdk.utils.Constant.COMMAND
import com.tuya.smart.rnsdk.utils.Constant.DEVIDS
import com.tuya.smart.rnsdk.utils.Constant.GROUPID
import com.tuya.smart.rnsdk.utils.Constant.HOMEID
import com.tuya.smart.rnsdk.utils.Constant.NAME
import com.tuya.smart.rnsdk.utils.Constant.PRODUCTID
import com.tuya.smart.rnsdk.utils.Constant.getIResultCallback
import com.tuya.smart.sdk.api.*
import com.tuya.smart.sdk.bean.GroupDeviceBean




class TuyaGroupModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaGroupModule"
    }

    /*创建群组*/
    @ReactMethod
    fun createGroup(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID, PRODUCTID, NAME, DEVIDS), params)) {
            getITuyaHome(params.getDouble(HOMEID).toLong()).createGroup(
                    params.getString((PRODUCTID)),
                            params.getString(NAME),
                            JsonUtils.parserArraybyMap(params.getArray(DEVIDS),
                                    String::class.java) as MutableList<String>?,
                            object : ITuyaResultCallback<Long> {
                                override fun onSuccess(p0: Long) {
                                    promise.resolve(p0)
                                }

                                override fun onError(p0: String?, p1: String?) {
                                    promise.reject(p0,p1)
                                }
                            }
                    )
        }
    }

    /**
     * 此接口主要是从云端拉取最新群组列表 根据产品ID
     */
    @ReactMethod
    fun queryDeviceListToAddGroup(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID,PRODUCTID), params)) {
            getITuyaHome(params.getDouble(HOMEID).toLong()).queryDeviceListToAddGroup(params.getString(PRODUCTID),
                    object : ITuyaResultCallback<List<GroupDeviceBean>>{
                override fun onSuccess(bizResult: List<GroupDeviceBean>) {
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(bizResult)))
                }

                override fun onError(errorCode: String, errorMsg: String) {
                    promise.reject(errorCode,errorMsg)
                }
            })
        }
    }

    @ReactMethod
    fun dismissGroup(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(GROUPID), params)) {
            getITuyaGroup(params.getDouble(GROUPID).toLong())
                    ?.dismissGroup(getIResultCallback(promise)
                    )
        }
    }

    @ReactMethod
    fun registerGroupListener(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(GROUPID), params)) {
            getITuyaGroup(params.getDouble(GROUPID).toLong())
                    ?.registerGroupListener(object : IGroupListener {
                        override fun onDpUpdate(var1: Long, var3: String){
                            var map=Arguments.createMap();
                            map.putDouble("id",var1.toDouble())
                            map.putString("dps",var3)
                            map.putString("type","onDpUpdate")
                            BridgeUtils.groupListener(reactApplicationContext,map,params.getDouble(GROUPID).toLong())
                        }

                        override fun onGroupInfoUpdate(var1: Long){
                            var map=Arguments.createMap();
                            map.putDouble("id",var1.toDouble())
                            map.putString("type","onGroupInfoUpdate")
                            BridgeUtils.groupListener(reactApplicationContext,map,params.getDouble(GROUPID).toLong())
                        }

                        override fun onGroupRemoved(var1: Long){
                            var map=Arguments.createMap();
                            map.putDouble("id",var1.toDouble())
                            map.putString("type","onGroupRemoved")
                            BridgeUtils.groupListener(reactApplicationContext,map,params.getDouble(GROUPID).toLong())
                        }
                    })
        }
    }

    @ReactMethod
    fun unregisterGroupListener(params: ReadableMap) {
        if (ReactParamsCheck.checkParams(arrayOf(GROUPID), params)) {
            getITuyaGroup(params.getDouble(GROUPID).toLong())
                    ?.unRegisterGroupListener()
        }
    }
    @ReactMethod
    fun publishDps(params: ReadableMap,promise: Promise){
        if (ReactParamsCheck.checkParams(arrayOf(GROUPID,COMMAND), params)) {
            getITuyaGroup(params.getDouble(GROUPID).toLong())
                    ?.publishDps(JsonUtils.toString(TuyaReactUtils.parseToMap(params.getMap(COMMAND))), getIResultCallback(promise))
        }
    }

    @ReactMethod
    fun onDestroy(params: ReadableMap){
        if (ReactParamsCheck.checkParams(arrayOf(GROUPID,COMMAND), params)) {
            getITuyaGroup(params.getDouble(GROUPID).toLong())
                    ?.onDestroy()
        }
    }

    fun getITuyaHome(homeId: Long): ITuyaHome{
        return TuyaHomeSdk.newHomeInstance(homeId)
    }

    fun getITuyaGroup(groupId: Long): ITuyaGroup{
        return TuyaHomeSdk.newGroupInstance(groupId)
    }

}