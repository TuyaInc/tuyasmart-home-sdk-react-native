package com.tuya.smart.rnsdk.home;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.interior.device.bean.DeviceRespBean;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.ITuyaSearchDeviceListener;
import com.tuya.smart.sdk.bean.ProductBean;
import com.tuya.smart.sdk.enums.DeviceActiveEnum;

import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.DEVID;
import static com.tuya.smart.rnsdk.utils.Constant.DPID;
import static com.tuya.smart.rnsdk.utils.Constant.GROUPID;
import static com.tuya.smart.rnsdk.utils.Constant.HOMEID;
import static com.tuya.smart.rnsdk.utils.Constant.LIST;
import static com.tuya.smart.rnsdk.utils.Constant.MESHID;
import static com.tuya.smart.rnsdk.utils.Constant.NODEID;
import static com.tuya.smart.rnsdk.utils.Constant.PRODUCTID;
import static com.tuya.smart.rnsdk.utils.Constant.ROOMID;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getITuyaDataCallback;
import static com.tuya.smart.rnsdk.utils.Constant.handlePromise;

public class TuyaHomeDataManagerModule extends ReactContextBaseJavaModule {
    public TuyaHomeDataManagerModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ITuyaSearchDeviceListener mITuyaSearchDeviceListener;

    @Nonnull
    @Override
    public String getName() {
        return "TuyaHomeDataManagerModule";
    }

    @ReactMethod
    public void getHomeRoomList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getHomeRoomList(coverDTL(params.getDouble(HOMEID))))));
        }
    }

    @ReactMethod
    public void getHomeDeviceList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getHomeDeviceList(coverDTL(params.getDouble(HOMEID))))));
        }
    }

    @ReactMethod
    public void getHomeGroupList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getHomeGroupList(coverDTL(params.getDouble(HOMEID))))));
        }
    }

    @ReactMethod
    public void getGroupBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getGroupBean(coverDTL(params.getDouble(GROUPID)))));
        }
    }

    @ReactMethod
    public void getDeviceBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getDeviceBean(params.getString(DEVID))));
        }
    }

    @ReactMethod
    public void getGroupRoomBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getGroupRoomBean(coverDTL(params.getDouble(GROUPID)))));
        }
    }

    @ReactMethod
    public void getRoomBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getRoomBean(coverDTL(params.getDouble(ROOMID)))));
        }
    }

    @ReactMethod
    public void getDeviceRoomBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getDeviceRoomBean(params.getString(DEVID))));
        }
    }

    @ReactMethod
    public void getGroupDeviceList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getGroupDeviceList(coverDTL(params.getDouble(GROUPID))))));
        }
    }

    @ReactMethod
    public void getMeshGroupList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getMeshGroupList(coverDTL(params.getDouble(GROUPID))+""))));
        }
    }

    @ReactMethod
    public void getMeshDeviceList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MESHID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getMeshDeviceList(params.getString(MESHID)))));
        }
    }

    @ReactMethod
    public void getRoomDeviceList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getRoomDeviceList(coverDTL(params.getDouble(ROOMID))))));
        }
    }

    @ReactMethod
    public void getRoomGroupList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ROOMID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getRoomGroupList(coverDTL(params.getDouble(ROOMID))))));
        }
    }

    @ReactMethod
    public void getHomeBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().getHomeBean(coverDTL(params.getDouble(HOMEID)))));
        }
    }

    @ReactMethod
    public void getSubDeviceBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableArray(
                    JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getSubDeviceBean(params.getString(DEVID)))));
        }
    }

    @ReactMethod
    public void getSubDeviceBeanByNodeId(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, NODEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().
                    getSubDeviceBeanByNodeId(params.getString(DEVID), params.getString(NODEID))));
        }
    }

    @ReactMethod
    public void getProductBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(PRODUCTID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().
                    getProductBean(params.getString(PRODUCTID))));
        }
    }

    @ReactMethod
    public void getDp(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, DPID), params)) {
            handlePromise(promise,TuyaHomeSdk.getDataInstance().
                    getDp(params.getString(DEVID), params.getString(DPID)));

        }
    }

    @ReactMethod
    public void getDps(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            handlePromise(promise,TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().
                    getDps(params.getString(DEVID))));
        }
    }

    @ReactMethod
    public void getSchema(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().
                    getSchema(params.getString(DEVID))));
        }
    }

    @ReactMethod
    public void queryDev(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getDataInstance().queryDev(params.getString(DEVID), getITuyaDataCallback(promise));
        }
    }

    @ReactMethod
    public void discoveredLanDevice() {
        if (mITuyaSearchDeviceListener != null) {
            TuyaHomeSdk.getDataInstance().unRegisterDiscoveredLanDeviceListener(mITuyaSearchDeviceListener);
            mITuyaSearchDeviceListener = null;
        }

        mITuyaSearchDeviceListener = new ITuyaSearchDeviceListener() {
            @Override
            public void onDeviceFind(String devId, DeviceActiveEnum activeEnum) {
                WritableMap map = Arguments.createMap();
                map.putString("devId", devId);
                map.putInt("activeEnum", activeEnum.getType());
                BridgeUtils.searchDevice(getReactApplicationContext(), map, "");
            }
        };
        TuyaHomeSdk.getDataInstance().discoveredLanDevice(mITuyaSearchDeviceListener);
    }

    @ReactMethod
    public void unRegisterDiscoveredLanDeviceListener() {
        if (mITuyaSearchDeviceListener != null) {
            TuyaHomeSdk.getDataInstance().unRegisterDiscoveredLanDeviceListener(mITuyaSearchDeviceListener);
            mITuyaSearchDeviceListener = null;
        }
    }

    @ReactMethod
    public void querySubDev(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MESHID, DEVID), params)) {
            TuyaHomeSdk.getDataInstance().querySubDev(params.getString(MESHID), params.getString(DEVID), getITuyaDataCallback(promise));
        }
    }

    @ReactMethod
    public void getDevRespBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().
                    getDevRespBean(params.getString(DEVID))));
        }
    }

    @ReactMethod
    public void getSubDevRespBean(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(MESHID, NODEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getDataInstance().
                    getSubDevRespBean(params.getString(MESHID), params.getString(NODEID))));
        }
    }

    @ReactMethod
    public void getDevRespBeanList(Promise promise) {
        promise.resolve(TuyaReactUtils.parseToWritableArray(
                JsonUtils.toJsonArray(TuyaHomeSdk.getDataInstance().getDevRespBeanList())));
    }

    @ReactMethod
    public void addDevRespList(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(LIST), params)) {
           TuyaHomeSdk.getDataInstance().addDevRespList(
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(LIST))), DeviceRespBean.class));
        }
    }


    @ReactMethod
    public void addProductList(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(LIST), params)) {
            TuyaHomeSdk.getDataInstance().addProductList(
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(LIST))), ProductBean.class));
        }
    }

    @ReactMethod
    public void getSubDevList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getDataInstance().getSubDevList(params.getString(DEVID), getITuyaDataCallback(promise));
        }
    }

}
