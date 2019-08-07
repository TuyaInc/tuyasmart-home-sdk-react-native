package com.tuya.smart.rnsdk.utils;

import android.text.TextUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class TuyaReactUtils {
    public static void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    public static HashMap parseToMap(ReadableMap readableMap) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        HashMap deconstructedMap = new HashMap<String, Object>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);

            switch (type) {
                case Null:
                    deconstructedMap.put(key, null);
                    break;
                case Boolean:
                    deconstructedMap.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    double value = readableMap.getDouble(key);
                    try {
                        // Long型支持，如果数字大于int, 且是整数,转化成long
                        if (value > Integer.MAX_VALUE && value % 1 == 0.0) {
                            deconstructedMap.put(key, Double.valueOf(value).longValue());
                        } else {
                            deconstructedMap.put(key, value);
                        }
                    } catch (Exception e) {
                        deconstructedMap.put(key, value);
                    }
                    break;
                case Map:
                    deconstructedMap.put(key, parseToMap(readableMap.getMap(key)));
                    break;
                case Array:
                    deconstructedMap.put(key, parseToList(readableMap.getArray(key)));
                    break;
                case String:
                    deconstructedMap.put(key, readableMap.getString(key));
                    break;

            }
        }
        return deconstructedMap;
    }


    public static List parseToList(ReadableArray readableArray) {
        List deconstructedList = new ArrayList();
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType indexType = readableArray.getType(i);
            switch (indexType) {
                case Null:
                    deconstructedList.add(null);
                    break;
                case Boolean:
                    deconstructedList.add(readableArray.getBoolean(i));
                    break;
                case Number:
                    double value = readableArray.getDouble(i);
                    try {
                        // Long型支持，如果数字大于int, 且是整数,转化成long
                        if (value > Integer.MAX_VALUE && value % 1 == 0.0) {
                            deconstructedList.add(Double.valueOf(value).longValue());
                        } else {
                            deconstructedList.add(value);
                        }
                    } catch (Exception e) {
                        deconstructedList.add(value);
                    }
                    break;
                case Map:
                    deconstructedList.add(parseToMap(readableArray.getMap(i)));
                    break;
                case Array:
                    deconstructedList.add(parseToList(readableArray.getArray(i)));
                    break;
                case String:
                    deconstructedList.add(readableArray.getString(i));
                    break;

            }
        }
        return deconstructedList;
    }


    public static WritableMap parseToWritableMap(String s) {
        if (TextUtils.isEmpty(s))
            return Arguments.createMap();
        return parseToWritableMap(JSON.parseObject(s));
    }

    public static WritableMap parseToWritableMap(Object obj) {
        if (null == obj)
            return Arguments.createMap();
        return parseToWritableMap(JSON.toJSONString(obj));
    }


    public static WritableMap parseToWritableMap(JSONObject json) {
        WritableMap map = Arguments.createMap();
        Set<Map.Entry<String, Object>> entries = json.entrySet();
        for (Map.Entry<String, Object> next : entries) {
            String key = next.getKey();
            Object obv = next.getValue();
            if (obv instanceof JSONObject) {
                map.putMap(key, parseToWritableMap((JSONObject) obv));
            } else if (obv instanceof Integer) {
                map.putInt(key, (Integer) obv);
            } else if (obv instanceof String) {
                map.putString(key, String.valueOf(obv));
            } else if (obv instanceof Boolean) {
                map.putBoolean(key, (Boolean) obv);
            } else if (obv instanceof Double || obv instanceof Float) {
                map.putDouble(key, (Double) obv);
            } else if (obv instanceof JSONArray) {
                map.putArray(key, parseToWritableArray((JSONArray) obv));
            } else if (obv instanceof BigDecimal) {
                BigDecimal bigDecimal = (BigDecimal) obv;
                map.putDouble(key, bigDecimal.doubleValue());
            } else {
                map.putNull(key);
            }
        }
        return map;
    }

    public static WritableArray parseToWritableArray(JSONArray jsonArray) {
        WritableArray list = Arguments.createArray();
        for (Object obv : jsonArray.toArray()) {
            if (obv instanceof JSONObject) {
                list.pushMap(parseToWritableMap((JSONObject) obv));
            } else if (obv instanceof Integer) {
                list.pushInt((Integer) obv);
            } else if (obv instanceof String) {
                list.pushString(String.valueOf(obv));
            } else if (obv instanceof Boolean) {
                list.pushBoolean((Boolean) obv);
            } else if (obv instanceof Double || obv instanceof Float) {
                list.pushDouble((Double) obv);
            } else if (obv instanceof JSONArray) {
                list.pushArray(parseToWritableArray((JSONArray) obv));
            } else if (obv instanceof BigDecimal) {
                BigDecimal bigDecimal = (BigDecimal) obv;
                list.pushDouble(bigDecimal.doubleValue());
            } else {
                list.pushNull();
            }
        }
        return list;

    }
}
