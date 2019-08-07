package com.tuya.smart.rnsdk.device;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.Constant;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.ISubDevListener;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nonnull;

public class TuyaGatewayModule extends ReactContextBaseJavaModule {
    public TuyaGatewayModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ISubDevListener iSubDevListener;

    @Nonnull
    @Override
    public String getName() {
        return "TuyaGatewayModule";
    }

    @ReactMethod
    public void publishDps(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.DEVID, Constant.LOCALID, Constant.DPS), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).publishDps(params.getString(Constant.LOCALID), params.getString(Constant.DPS), Constant.getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void broadcastDps(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.DEVID, Constant.DPS), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).broadcastDps(params.getString(Constant.DPS), Constant.getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void multicastDps(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.DEVID, Constant.LOCALID, Constant.DPS), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).multicastDps(params.getString(Constant.LOCALID), params.getString(Constant.DPS), Constant.getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void getSubDevList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.DEVID), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).getSubDevList(Constant.getITuyaDataCallback(promise));
        }
    }

    @ReactMethod
    public void registerSubDevListener(final ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.DEVID), params)) {
            if (iSubDevListener != null) {
                TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).unRegisterSubDevListener();
                iSubDevListener = null;
            }
            iSubDevListener = new ISubDevListener() {
                @Override
                public void onSubDevDpUpdate(String cid, String dpStr) {
                    WritableMap map = Arguments.createMap();
                    map.putString("cid", cid);
                    map.putString("dpStr", dpStr);
                    map.putString("type", "onSubDevDpUpdate");
                    BridgeUtils.gateWayListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }

                @Override
                public void onSubDevRemoved(String devId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("type", "onSubDevRemoved");
                    BridgeUtils.gateWayListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }

                @Override
                public void onSubDevAdded(String devId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("type", "onSubDevAdded");
                    BridgeUtils.gateWayListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }

                @Override
                public void onSubDevInfoUpdate(String devId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("type", "onSubDevInfoUpdate");
                    BridgeUtils.gateWayListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }

                @Override
                public void onSubDevStatusChanged(List<String> onlines, List<String> offlines) {
                    WritableMap map = Arguments.createMap();
                    map.putArray("onlines", TuyaReactUtils.parseToWritableArray(
                            JsonUtils.toJsonArray(onlines)));
                    map.putArray("offlines", TuyaReactUtils.parseToWritableArray(
                            JsonUtils.toJsonArray(offlines)));
                    map.putString("type", "onSubDevStatusChanged");
                    BridgeUtils.gateWayListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }
            };
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).registerSubDevListener(iSubDevListener);
        }
    }

    @ReactMethod
    public void unRegisterSubDevListener(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.DEVID), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).unRegisterSubDevListener();
        }
    }

    @ReactMethod
    public void onDestroy(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.DEVID), params)) {
            TuyaHomeSdk.newGatewayInstance(params.getString(Constant.DEVID)).onDestroy();
        }
    }
}
