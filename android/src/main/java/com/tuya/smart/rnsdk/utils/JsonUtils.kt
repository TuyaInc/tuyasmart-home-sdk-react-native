package com.tuya.smart.rnsdk.utils

import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONArray
import com.alibaba.fastjson.JSONObject
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.tuya.smart.sdk.bean.DeviceBean

import java.util.ArrayList

object JsonUtils {
    fun parse(json: String, c: Class<*>): Any {
        return JSONObject.parseObject(json, c)
    }


    fun parseArray(json: String, c: Class<*>): List<Any> {
        return JSONObject.parseArray(json, c)
    }

    fun  parserArraybyMap(map: ReadableArray, c: Class<*>): List<Any>? {
        return parseArray(toString(TuyaReactUtils.parseToList(map)), c)
    }

    fun parseBymap(map: ReadableMap, c: Class<*>): Any? {
        return parse(JSONObject(TuyaReactUtils.parseToMap(map)).toJSONString(), c)
    }
    fun toString(obj:Any):String{
        return JSONObject.toJSONString(obj)
    }
    fun toJsonArray(obj:Any):JSONArray{
        return JSONArray.parseArray(JSON.toJSONString(obj))
    }
}
