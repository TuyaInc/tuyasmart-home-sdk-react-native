package com.tuya.smart.rnsdk.utils;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;

public class BridgeUtils {
    private static String GROUPLISTENER = "groupListener";
    private static String OTALISTENER = "otaListener";
    private static String GATWAYLISTENER = "gatwayListener";
    private static String HOMEDEVICESTATUS = "homeDeviceStatus";
    private static String HOMESTATUS = "homeStatus";
    private static String HOMECHANGE = "homeChange";
    private static String SMARTUPDATE = "SmartUpdate";
    private static String WARNMESSAGEARRIVED = "WarnMessageArrived";
    private static String SEARCHDEVICE = "searchDevice";
    private static String TRANSFERDATA = "transferData";
    private static String TRANSFER = "transfer";
    private static String DEVLISTENER = "devListener";

    public static void transferDataListener(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(TRANSFERDATA, id), map);
    }

    public static void devListener(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(DEVLISTENER, id), map);
    }


    public static void transferListener(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(TRANSFER, id), map);
    }

    public static void groupListener(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(GROUPLISTENER, id), map);
    }

    public static void otaListener(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(OTALISTENER, id), map);
    }

    public static void smartUpdate(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(SMARTUPDATE, id), map);
    }

    public static void gateWayListener(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(GATWAYLISTENER, id), map);
    }

    public static void warnMessageArrived(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(WARNMESSAGEARRIVED, id), map);
    }

    public static void homeDeviceStatus(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(HOMEDEVICESTATUS, id), map);
    }

    public static void homeStatus(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(HOMESTATUS, id), map);
    }

    public static void searchDevice(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(SEARCHDEVICE, id), map);
    }

    public static void homeChange(ReactContext context, WritableMap map, String id) {
        TuyaReactUtils.sendEvent(context, bindEventname(HOMECHANGE, id), map);
    }

    private static String bindEventname(String key, String id) {
        return key + "//" + id;
    }
}
