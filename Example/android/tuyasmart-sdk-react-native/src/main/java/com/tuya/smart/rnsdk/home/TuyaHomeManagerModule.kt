package com.tuya.smart.rnsdk.home

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.home.sdk.api.ITuyaHomeChangeListener
import com.tuya.smart.home.sdk.bean.HomeBean
import com.tuya.smart.home.sdk.callback.ITuyaGetHomeListCallback
import com.tuya.smart.home.sdk.callback.ITuyaHomeResultCallback
import com.tuya.smart.rnsdk.utils.*
import com.tuya.smart.sdk.bean.DeviceBean
import com.tuya.smart.sdk.bean.GroupBean

class TuyaHomeManagerModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaHomeManagerModule"
    }


    /* 获取家庭列表 */
    @ReactMethod
    fun queryHomeList(promise: Promise) {
        TuyaHomeSdk.getHomeManagerInstance().queryHomeList(object : ITuyaGetHomeListCallback {
            override fun onSuccess(var1: List<HomeBean>) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1!!)))
            }

            override fun onError(var1: String, var2: String) {
                promise.reject(var1, var2)
            }
        })
    }

    /* 创建家庭 */
    @ReactMethod
    fun createHome(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(Constant.NAME, Constant.LON, Constant.LAT, Constant.GEONAME, Constant.ROMMS), params)) {
            var list = ArrayList<String>()
            var length = params.getArray(Constant.ROMMS).size()
            for (index in 0 until length) {
                list.add(params.getArray(Constant.ROMMS).getString(index))
            }
            TuyaHomeSdk.getHomeManagerInstance().createHome(
                    params.getString(Constant.NAME),
                    params.getDouble(Constant.LON),
                    params.getDouble(Constant.LAT),
                    params.getString(Constant.GEONAME),
                    list,
                    getITuyaHomeResultCallback(promise)
            )

        }
    }


    /* 注册家庭信息的变更
     * 有：家庭的增加、删除、信息变更、分享列表的变更和服务器连接成功的监听 */
    @ReactMethod
    fun registerTuyaHomeChangeListener(params: ReadableMap) {
        TuyaHomeSdk.getHomeManagerInstance().registerTuyaHomeChangeListener(object : ITuyaHomeChangeListener {
            override fun onHomeAdded(var1: Long) {
                val map = Arguments.createMap()
                map.putDouble("homeId", var1.toDouble())
                map.putString("type", "onHomeAdded");
                BridgeUtils.homeChange(reactApplicationContext, map, params.getString("homeId"))
            }

            override fun onHomeRemoved(var1: Long) {
                val map = Arguments.createMap()
                map.putDouble("homeId", var1.toDouble())
                map.putString("type", "onHomeRemoved");
                BridgeUtils.homeChange(reactApplicationContext, map, params.getString("homeId"))
            }

            override fun onHomeInfoChanged(var1: Long) {
                val map = Arguments.createMap()
                map.putDouble("homeId", var1.toDouble())
                map.putString("type", "onHomeInfoChanged");
                BridgeUtils.homeChange(reactApplicationContext, map, params.getString("homeId"))
            }

            override fun onSharedDeviceList(var1: List<DeviceBean>) {
                val map = Arguments.createMap()
                map.putArray("deviceBeans", TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1)))
                map.putString("type", "onSharedDeviceList");
                BridgeUtils.homeChange(reactApplicationContext, map, params.getString("homeId"))
            }

            override fun onSharedGroupList(var1: List<GroupBean>) {
                val map = Arguments.createMap()
                map.putArray("groupBeans", TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(var1)))
                map.putString("type", "onSharedGroupList");
                BridgeUtils.homeChange(reactApplicationContext, map, params.getString("homeId"))
            }

            override fun onServerConnectSuccess() {
                val map = Arguments.createMap()
                map.putString("type", "onServerConnectSuccess");
                BridgeUtils.homeChange(reactApplicationContext, map, params.getDouble("homeId").toString())
            }
        })
    }


    fun getITuyaHomeResultCallback(promise: Promise): ITuyaHomeResultCallback? {
        return object : ITuyaHomeResultCallback {
            override fun onSuccess(p0: HomeBean?) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(p0))
            }

            override fun onError(code: String?, error: String?) {
                promise.reject(code, error)
            }
        }
    }
}