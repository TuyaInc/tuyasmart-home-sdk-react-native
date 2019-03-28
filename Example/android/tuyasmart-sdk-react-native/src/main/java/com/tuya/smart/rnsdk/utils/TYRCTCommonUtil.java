package com.tuya.smart.rnsdk.utils;

import android.support.annotation.Nullable;
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
import com.tuya.smart.android.device.bean.SchemaBean;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by leaf on 16/1/3.
 */
public class TYRCTCommonUtil {

    public static final String RESULT_SUCCESS = "TY_SUCCESS";
    public static final String RESULT_FAILURE = "TY_FAILURE";
    private static final String RESULT_KEY = "ret";
    private static final String RESULT_ERROR_UPGRADING = "UPGRADEING";

    public static final int RNTYPE_GROUP = 1;
    public static final int RNTYPE_DEVICE = 0;

    public static HashMap<String, Object> parseToMap(ReadableMap readableMap) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        HashMap<String, Object> deconstructedMap = new HashMap<>();
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
                        // int和Long型支持，如果数字大于int, 且是整数
                        if (value % 1 == 0) {
                            if (value >= Integer.MIN_VALUE && value <= Integer.MAX_VALUE) {
                                // int型支持
                                deconstructedMap.put(key, (int) value);
                            } else if (value > Integer.MAX_VALUE || value < Integer.MIN_VALUE) {
                                // Long型支持，
                                deconstructedMap.put(key, (long) value);
                            }
                        } else {
                            deconstructedMap.put(key, value);
                        }
                    } catch (Exception e) {
                        deconstructedMap.put(key, value);
                    }
                    break;
                case String:
                    deconstructedMap.put(key, readableMap.getString(key));
                    break;
                case Map:
                    deconstructedMap.put(key, parseToMap(readableMap.getMap(key)));
                    break;
                case Array:
                    deconstructedMap.put(key, parseToList(readableMap.getArray(key)));
                    break;
                default:
//                    throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
            }

        }
        return deconstructedMap;
    }

    public static ArrayList<Object> parseToList(ReadableArray readableArray) {
        ArrayList<Object> deconstructedList = new ArrayList<>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType indexType = readableArray.getType(i);
            switch (indexType) {
                case Null:
                    deconstructedList.add(i, null);
                    break;
                case Boolean:
                    deconstructedList.add(i, readableArray.getBoolean(i));
                    break;
                case Number:
                    double value = readableArray.getDouble(i);
                    try {
                        // Long型支持，如果数字大于int, 且是整数,转化成long
                        if (value % 1 == 0) {
                            if (value >= Integer.MIN_VALUE && value <= Integer.MAX_VALUE) {
                                // int型支持
                                deconstructedList.add(i, (int) value);
                            } else if (value > Integer.MAX_VALUE || value < Integer.MIN_VALUE) {
                                // Long型支持，
                                deconstructedList.add(i, (long) value);
                            }
                        } else {
                            deconstructedList.add(i, value);
                        }
                    } catch (Exception e) {
                        deconstructedList.add(i, value);
                    }
                    break;
                case String:
                    deconstructedList.add(i, readableArray.getString(i));
                    break;
                case Map:
                    deconstructedList.add(i, parseToMap(readableArray.getMap(i)));
                    break;
                case Array:
                    deconstructedList.add(i, parseToList(readableArray.getArray(i)));
                    break;
                default:
//                    throw new IllegalArgumentException("Could not convert object at index " + i + ".");
            }
        }
        return deconstructedList;
    }

    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

//    public static WritableMap toErrorResult(String code) {
//        WritableMap result = Arguments.createMap();
//        result.putString(RESULT_KEY, PanelUtils.checkCommandErrorCode(code));
//        return result;
//    }

    public static WritableMap toResult(String code) {
        WritableMap result = Arguments.createMap();
        if (TextUtils.isEmpty(code))
            code = "";

        result.putString(RESULT_KEY, code);
        return result;
    }

    public static WritableMap parseToWritableMap(String s) {
        if (TextUtils.isEmpty(s))
            return Arguments.createMap();
        return parseToWritableMap(JSON.parseObject(s));
    }

    public static WritableMap parseToWritableMap(Object object) {
        if (null == object)
            return Arguments.createMap();
        return parseToWritableMap(JSON.toJSONString(object));
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
            } else if (obv instanceof Double) {
                map.putDouble(key, (Double) obv);
            } else if (obv instanceof JSONArray) {
                map.putArray(key, parseToWritableArray((JSONArray) obv));
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
            } else if (obv instanceof Double) {
                list.pushDouble((Double) obv);
            } else if (obv instanceof JSONArray) {
                list.pushArray(list);
            } else {
                list.pushNull();
            }
        }
        return list;

    }

    public static WritableArray schemaParseToWritableArray(Map<String, SchemaBean> schemaMap) {
        WritableArray list = Arguments.createArray();

        for (Map.Entry<String, SchemaBean> set : schemaMap.entrySet()) {
            SchemaBean bean = set.getValue();
            WritableMap map = Arguments.createMap();
            map.putString("id", bean.getId());
            map.putString("code", bean.getCode());
            map.putString("name", bean.getName());
            map.putString("mode", bean.getMode());
            map.putString("type", bean.getType());
            map.putString("schemaType", bean.getSchemaType());
            if (null != bean.getPassive())
                map.putBoolean("passive", bean.getPassive());
//            map.putMap("property", parseToWritableMap(bean.getProperty()));
            map.putString("property", bean.getProperty());
            map.putString("iconname", bean.getIconname());
            list.pushMap(map);
        }

        return list;
    }

    public static WritableMap panelConfigToWritableMap(Map<String, Object> panelConfig) {
        WritableMap list = Arguments.createMap();

        if (panelConfig != null) {
            for (Map.Entry<String, Object> set : panelConfig.entrySet()) {
                String key = set.getKey();
                Object value = set.getValue();

                list.putString(key, value == null ? "" : JSONObject.toJSONString(value));
            }
        }
        return list;
    }

}
