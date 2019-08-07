package com.tuya.smart.rnsdk.home;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.bean.DeviceAndGroupInRoomBean;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;

import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.DEVID;
import static com.tuya.smart.rnsdk.utils.Constant.GROUPID;
import static com.tuya.smart.rnsdk.utils.Constant.LIST;
import static com.tuya.smart.rnsdk.utils.Constant.NAME;
import static com.tuya.smart.rnsdk.utils.Constant.ROOMID;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getIResultCallback;

public class TuyaRoomModule extends ReactContextBaseJavaModule {
    public TuyaRoomModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaRoomModule";
    }

    @ReactMethod
    public void updateRoom(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID, NAME), params)) {
            TuyaHomeSdk.newRoomInstance(coverDTL(params.getDouble(ROOMID))).updateRoom(params.getString(NAME), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void addDevice(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID, DEVID), params)) {
            TuyaHomeSdk.newRoomInstance(coverDTL(params.getDouble(ROOMID))).addDevice(params.getString(DEVID), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void addGroup(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID, GROUPID), params)) {
            TuyaHomeSdk.newRoomInstance(coverDTL(params.getDouble(ROOMID))).addGroup(
                    coverDTL(params.getDouble(GROUPID)), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void removeDevice(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID, DEVID), params)) {
            TuyaHomeSdk.newRoomInstance(coverDTL(params.getDouble(ROOMID))).removeDevice(params.getString(DEVID), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void removeGroup(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID, GROUPID), params)) {
            TuyaHomeSdk.newRoomInstance(coverDTL(params.getDouble(ROOMID))).removeGroup(
                    coverDTL(params.getDouble(GROUPID)), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void moveDevGroupListFromRoom(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID, LIST), params)) {
            TuyaHomeSdk.newRoomInstance(coverDTL(params.getDouble(ROOMID))).moveDevGroupListFromRoom(
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(LIST))), DeviceAndGroupInRoomBean.class), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void sortDevInRoom(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID, LIST), params)) {
            TuyaHomeSdk.newRoomInstance(coverDTL(params.getDouble(ROOMID))).sortDevInRoom(
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(LIST))), DeviceAndGroupInRoomBean.class), getIResultCallback(promise));
        }
    }
}
