package com.tuya.smart.rnsdk.utils

import android.text.TextUtils
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONArray
import com.alibaba.fastjson.JSONObject
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.ArrayList
import java.util.HashMap


object TuyaReactUtils {
    /**
     *  发送事件给React Native
     */
    fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }

    fun parseToMap(readableMap: ReadableMap): HashMap<String, Any?> {
        val iterator = readableMap.keySetIterator()
        val deconstructedMap = HashMap<String, Any?>()
        while (iterator.hasNextKey()) {
            val key = iterator.nextKey()
            val type = readableMap.getType(key)
            when (type) {
                ReadableType.Null -> deconstructedMap[key] = null
                ReadableType.Boolean -> deconstructedMap[key] = readableMap.getBoolean(key)
                ReadableType.Number -> {
                    val value = readableMap.getDouble(key)
                    try {
                        // Long型支持，如果数字大于int, 且是整数,转化成long
                        if (value > Integer.MAX_VALUE && value % 1 == 0.0) {
                            deconstructedMap[key] = value.toLong()
                        } else {
                            deconstructedMap[key] = value
                        }
                    } catch (e: Exception) {
                        deconstructedMap[key] = value
                    }

                }
                ReadableType.String -> deconstructedMap[key] = readableMap.getString(key)
                ReadableType.Map -> deconstructedMap[key] = parseToMap(readableMap.getMap(key))
                ReadableType.Array -> deconstructedMap[key] = parseToList(readableMap.getArray(key))
            }

        }
        return deconstructedMap
    }

    fun parseToList(readableArray: ReadableArray): ArrayList<Any?> {
        val deconstructedList = ArrayList<Any?>(readableArray.size())
        for (i in 0 until readableArray.size()) {
            val indexType = readableArray.getType(i)
            when (indexType) {
                ReadableType.Null -> deconstructedList.add(i, null)
                ReadableType.Boolean -> deconstructedList.add(i, readableArray.getBoolean(i))
                ReadableType.Number -> {
                    val value = readableArray.getDouble(i)
                    try {
                        // Long型支持，如果数字大于int, 且是整数,转化成long
                        if (value > Integer.MAX_VALUE && value % 1 == 0.0) {
                            deconstructedList.add(i, value.toLong())
                        } else {
                            deconstructedList.add(i, value)
                        }
                    } catch (e: Exception) {
                        deconstructedList.add(i, value)
                    }

                }
                ReadableType.String -> deconstructedList.add(i, readableArray.getString(i))
                ReadableType.Map -> deconstructedList.add(i, parseToMap(readableArray.getMap(i)))
                ReadableType.Array -> deconstructedList.add(i, parseToList(readableArray.getArray(i)))
            }
        }
        return deconstructedList
    }

    fun parseToWritableMap(s: String): WritableMap {
        return if (TextUtils.isEmpty(s)) Arguments.createMap() else parseToWritableMap(JSON.parseObject(s))
    }

    fun parseToWritableMap(data: Any?): WritableMap {
        return if (null == data) Arguments.createMap() else parseToWritableMap(JSON.toJSONString(data))
    }

    fun parseToWritableMap(json: JSONObject): WritableMap {
        val map = Arguments.createMap()
        val entries = json.entries
        for ((key, obv) in entries) {
            when (obv) {
                is JSONObject -> map.putMap(key, parseToWritableMap(obv))
                is JSONArray -> map.putArray(key, parseToWritableArray(obv))
                is Int -> map.putInt(key, obv)
                is String -> map.putString(key, obv)
                is Boolean -> map.putBoolean(key, obv)
                is Double -> map.putDouble(key, obv)
                else -> map.putNull(key)
            }
        }
        return map
    }

    fun parseToWritableArray(jsonArray: JSONArray): WritableArray {
        val list = Arguments.createArray()
        for (obv in jsonArray.toTypedArray()) {
            when (obv) {
                is JSONObject -> list.pushMap(parseToWritableMap(obv))
                is JSONArray -> list.pushArray(parseToWritableArray(obv))
                is Int -> list.pushInt(obv)
                is String -> list.pushString(obv)
                is Boolean -> list.pushBoolean(obv)
                is Double -> list.pushDouble(obv)
                else -> list.pushNull()
            }
        }
        return list

    }
}