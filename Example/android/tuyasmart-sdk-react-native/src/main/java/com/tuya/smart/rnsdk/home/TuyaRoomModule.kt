package com.tuya.smart.rnsdk.home

import com.facebook.react.bridge.*
import com.tuya.smart.home.sdk.TuyaHomeSdk
import com.tuya.smart.home.sdk.api.ITuyaRoom
import com.tuya.smart.rnsdk.utils.Constant.NAME
import com.tuya.smart.rnsdk.utils.Constant.DEVID
import com.tuya.smart.rnsdk.utils.Constant.GROUPID
import com.tuya.smart.rnsdk.utils.Constant.ROOMID
import com.tuya.smart.rnsdk.utils.Constant.getIResultCallback
import com.tuya.smart.rnsdk.utils.ReactParamsCheck


class TuyaRoomModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "TuyaRoomModule"
    }

    /* 更新房间名称 */
    @ReactMethod
    fun updateRoom(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ROOMID, NAME), params)) {
            getRoomInstance(params.getDouble(ROOMID)).updateRoom(params.getString(NAME), getIResultCallback(promise))
        }
    }

    /* 添加设备 */
    @ReactMethod
    fun addDevice(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ROOMID, DEVID), params)) {
            getRoomInstance(params.getDouble(ROOMID)).addDevice(params.getString(DEVID), getIResultCallback(promise))
        }
    }

    /* 删除设备  */
    @ReactMethod
    fun removeDevice(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ROOMID, DEVID), params)) {
            getRoomInstance(params.getDouble(ROOMID)).removeDevice(params.getString(DEVID), getIResultCallback(promise))
        }
    }

    /* 删除群组  */
    @ReactMethod
    fun removeGroup(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ROOMID, GROUPID), params)) {
            getRoomInstance(params.getDouble(ROOMID)).removeGroup(params.getDouble(GROUPID).toLong(), getIResultCallback(promise))
        }
    }

    /* 添加群组  */
    @ReactMethod
    fun addGroup(params: ReadableMap, promise: Promise) {
        if (ReactParamsCheck.checkParams(arrayOf(ROOMID, GROUPID), params)) {
            getRoomInstance(params.getDouble(ROOMID)).addGroup(params.getDouble(GROUPID).toLong(), getIResultCallback(promise))
        }
    }

    fun getRoomInstance(roomId: Double): ITuyaRoom {
        return TuyaHomeSdk.newRoomInstance(roomId.toLong())
    }

}