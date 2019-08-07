package com.tuya.smart.rnsdk.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.List;

public class JsonUtils {
    public static Object parse(String json, Class c) {
        return JSONObject.parseObject(json, c);
    }

    public static List parseArray(String json, Class c) {
        return JSONObject.parseArray(json, c);
    }

    public static List parserArraybyMap(ReadableArray map, Class c) {
        return parseArray(toString(TuyaReactUtils.parseToList(map)), c);
    }

    public static Object parseBymap(ReadableMap map, Class c) {
        return parse(new JSONObject(TuyaReactUtils.parseToMap(map)).toJSONString(), c);
    }

    public static String toString(Object obj) {
        return JSONObject.toJSONString(obj);
    }

    public static JSONArray toJsonArray(Object obj) {
        return JSONArray.parseArray(JSON.toJSONString(obj));
    }


}
