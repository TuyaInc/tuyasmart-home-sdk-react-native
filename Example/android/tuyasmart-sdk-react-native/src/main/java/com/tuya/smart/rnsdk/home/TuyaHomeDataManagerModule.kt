package com.tuya.smart.rnsdk.home

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.rnsdk.utils.Constant.DEVID
import com.tuya.smart.rnsdk.utils.Constant.GROUPID
import com.tuya.smart.rnsdk.utils.Constant.HOMEID
import com.tuya.smart.rnsdk.utils.Constant.MESHID
import com.tuya.smart.rnsdk.utils.Constant.ROOMID
import com.tuya.smart.rnsdk.utils.JsonUtils
import com.tuya.smart.rnsdk.utils.ReactParamsCheck
import com.tuya.smart.rnsdk.utils.TuyaReactUtils


class TuyaHomeDataManagerModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaHomeDataManagerModule"
    }


    /*  家庭下面的房间列表 */
    @ReactMethod
    fun getHomeRoomList(params: ReadableMap, promise: Promise) {
        promise.resolve(TuyaReactUtils.parseToWritableArray(
                JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getHomeRoomList(params.getDouble(HOMEID).toLong()))))
    }


    /* 获取家庭下面的设备列表 */
    @ReactMethod
    fun getHomeDeviceList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getHomeDeviceList(params.getDouble(HOMEID).toLong()))))
        }
    }
    /* 获取家庭下面的群组列表 */
    @ReactMethod
    fun getHomeGroupList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getHomeGroupList(params.getDouble(HOMEID).toLong()))))
        }
    }

    /* 获取群组 */
    @ReactMethod
    fun getGroupBean(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(GROUPID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getGroupBean(params.getDouble(GROUPID).toLong())))
        }
    }

    /* 获取设备 */
    @ReactMethod
    fun getDeviceBean(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getDeviceBean(params.getString(DEVID))))
        }
    }

    /* 获取设备 */
    @ReactMethod
    fun getGroupRoomBean(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(GROUPID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getGroupRoomBean(params.getDouble(GROUPID).toLong())))
        }
    }

    /* 获取房间 */
    @ReactMethod
    fun getRoomBean(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ROOMID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getRoomBean(params.getDouble(ROOMID).toLong())))
        }
    }

    /* 根据设备获取房间信息 */
    @ReactMethod
    fun getDeviceRoomBean(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getDeviceRoomBean(params.getString(DEVID))))
        }
    }

    /* 获取群组下面的设备列表 */
    @ReactMethod
    fun getGroupDeviceList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(GROUPID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getGroupDeviceList(params.getDouble(GROUPID).toLong()))))
        }
    }

    /* 获取mesh下面的群组列表 */
    @ReactMethod
    fun getMeshGroupList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(MESHID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getMeshGroupList(params.getString(MESHID)))))
        }
    }

    @ReactMethod
    fun getMeshDeviceList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(MESHID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getMeshDeviceList(params.getString(MESHID)))))
        }
    }


    /* 根据房间ID获取房间下面的设备列表 */
    @ReactMethod
    fun getRoomDeviceList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ROOMID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getRoomDeviceList(params.getDouble(ROOMID).toLong()))))
        }
    }


    /* 根据房间ID获取房间下面的群组列表 */
    @ReactMethod
    fun getRoomGroupList(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ROOMID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getRoomGroupList(params.getDouble(ROOMID).toLong()))))
        }
    }

    /* 根据房间ID获取房间下面的群组列表 */
    @ReactMethod
    fun getHomeBean(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(HOMEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getHomeBean(params.getDouble(HOMEID).toLong())))
        }
    }

}