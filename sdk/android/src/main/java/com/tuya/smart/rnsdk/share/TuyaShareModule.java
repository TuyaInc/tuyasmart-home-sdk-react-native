package com.tuya.smart.rnsdk.share;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.bean.ShareIdBean;

import java.util.ArrayList;
import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.AUTOSHARING;
import static com.tuya.smart.rnsdk.utils.Constant.COUNTRYCODE;
import static com.tuya.smart.rnsdk.utils.Constant.DEVID;
import static com.tuya.smart.rnsdk.utils.Constant.DEVIDS;
import static com.tuya.smart.rnsdk.utils.Constant.HOMEID;
import static com.tuya.smart.rnsdk.utils.Constant.MEMBERID;
import static com.tuya.smart.rnsdk.utils.Constant.NAME;
import static com.tuya.smart.rnsdk.utils.Constant.SHAREBEAN;
import static com.tuya.smart.rnsdk.utils.Constant.SHAREID;
import static com.tuya.smart.rnsdk.utils.Constant.USERACCOUNT;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getIResultCallback;
import static com.tuya.smart.rnsdk.utils.Constant.getITuyaResultCallback;

public class TuyaShareModule extends ReactContextBaseJavaModule {
    public TuyaShareModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaShareModule";
    }

    @ReactMethod
    public void enableDevShare(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, MEMBERID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().enableDevShare(params.getString(DEVID),
                    coverDTL(params.getDouble(MEMBERID)), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void disableDevShare(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, MEMBERID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().disableDevShare(params.getString(DEVID),
                    coverDTL(params.getDouble(MEMBERID)), getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void removeReceivedDevShare(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().removeReceivedDevShare(params.getString(DEVID), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void addShareWithHomeId(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, COUNTRYCODE, USERACCOUNT, DEVIDS), params)) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(DEVIDS).size(); i++) {
                list.add(params.getArray(DEVIDS).getString(i));
            }
            TuyaHomeSdk.getDeviceShareInstance().addShareWithHomeId(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getString(COUNTRYCODE),
                    params.getString(USERACCOUNT),
                    list,
                    getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void queryDevShareUserList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().queryDevShareUserList(params.getString(DEVID),
                    getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void addShare(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, COUNTRYCODE, USERACCOUNT, SHAREBEAN, AUTOSHARING), params)) {
            TuyaHomeSdk.getDeviceShareInstance().addShare(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getString(COUNTRYCODE),
                    params.getString(USERACCOUNT),
                    (ShareIdBean) JsonUtils.parse(JSON.toJSONString(TuyaReactUtils.parseToMap(params.getMap(SHAREBEAN))), ShareIdBean.class),
                    params.getBoolean(AUTOSHARING),
                    getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void addShareWithMemberId(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MEMBERID, DEVIDS), params)) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(DEVIDS).size(); i++) {
                list.add(params.getArray(DEVIDS).getString(i));
            }
            TuyaHomeSdk.getDeviceShareInstance().addShareWithMemberId(coverDTL(params.getDouble(MEMBERID)),
                    list,
                    getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void getUserShareInfo(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MEMBERID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().getUserShareInfo(
                    coverDTL(params.getDouble(MEMBERID)), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void getReceivedShareInfo(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MEMBERID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().getReceivedShareInfo(
                    coverDTL(params.getDouble(MEMBERID)), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void queryUserShareList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().queryUserShareList(
                    coverDTL(params.getDouble(HOMEID)), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void queryShareReceivedUserList(Promise promise) {
        TuyaHomeSdk.getDeviceShareInstance().queryShareReceivedUserList(getITuyaResultCallback(promise));
    }

    @ReactMethod
    public void queryShareDevFromInfo(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().queryShareDevFromInfo(params.getString(DEVID), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void renameShareNickname(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MEMBERID, NAME), params)) {
            TuyaHomeSdk.getDeviceShareInstance().renameShareNickname(
                    coverDTL(params.getDouble(MEMBERID)), params.getString(NAME), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void renameReceivedShareNickname(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MEMBERID, NAME), params)) {
            TuyaHomeSdk.getDeviceShareInstance().renameReceivedShareNickname(
                    coverDTL(params.getDouble(MEMBERID)), params.getString(NAME), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void removeUserShare(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MEMBERID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().removeUserShare(
                    coverDTL(params.getDouble(MEMBERID)), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void removeReceivedUserShare(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MEMBERID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().removeReceivedUserShare(
                    coverDTL(params.getDouble(MEMBERID)), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void onDestroy() {
        TuyaHomeSdk.getDeviceShareInstance().onDestroy();
    }


    @ReactMethod
    public void inviteShare(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, USERACCOUNT, COUNTRYCODE), params)) {
            TuyaHomeSdk.getDeviceShareInstance().inviteShare(
                    params.getString(DEVID),
                    params.getString(USERACCOUNT),
                    params.getString(COUNTRYCODE), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void confirmShareInviteShare(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SHAREID), params)) {
            TuyaHomeSdk.getDeviceShareInstance().confirmShareInviteShare(
                    params.getInt(SHAREID), getIResultCallback(promise));
        }
    }
}
