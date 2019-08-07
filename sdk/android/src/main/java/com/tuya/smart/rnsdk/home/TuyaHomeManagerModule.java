package com.tuya.smart.rnsdk.home;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.api.ITuyaHomeChangeListener;
import com.tuya.smart.home.sdk.bean.HomeBean;
import com.tuya.smart.home.sdk.callback.ITuyaGetHomeListCallback;
import com.tuya.smart.home.sdk.callback.ITuyaHomeResultCallback;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.Constant;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.bean.DeviceBean;
import com.tuya.smart.sdk.bean.GroupBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.GEONAME;
import static com.tuya.smart.rnsdk.utils.Constant.LAT;
import static com.tuya.smart.rnsdk.utils.Constant.LON;
import static com.tuya.smart.rnsdk.utils.Constant.NAME;
import static com.tuya.smart.rnsdk.utils.Constant.ROMMS;

public class TuyaHomeManagerModule extends ReactContextBaseJavaModule {
    public TuyaHomeManagerModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ITuyaHomeChangeListener mITuyaHomeChangeListener;

    @Nonnull
    @Override
    public String getName() {
        return "TuyaHomeManagerModule";
    }

    @ReactMethod
    public void queryHomeList(final Promise promise) {
        TuyaHomeSdk.getHomeManagerInstance().queryHomeList(new ITuyaGetHomeListCallback() {
            @Override
            public void onSuccess(List<HomeBean> homeBeans) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(homeBeans)));
            }

            @Override
            public void onError(String errorCode, String error) {
                promise.reject(errorCode, error);
            }
        });
    }

    @ReactMethod
    public void createHome(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(NAME, LON, LAT, GEONAME, ROMMS), params)) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(ROMMS).size(); i++) {
                list.add(params.getArray(ROMMS).getString(i));
            }
            TuyaHomeSdk.getHomeManagerInstance().createHome(
                    params.getString(Constant.NAME),
                    params.getDouble(Constant.LON),
                    params.getDouble(Constant.LAT),
                    params.getString(Constant.GEONAME),
                    list,
                    new ITuyaHomeResultCallback() {
                        @Override
                        public void onSuccess(HomeBean bean) {
                            promise.resolve(TuyaReactUtils.parseToWritableMap(bean));
                        }

                        @Override
                        public void onError(String errorCode, String errorMsg) {
                            promise.reject(errorCode, errorMsg);
                        }
                    }
            );
        }
    }


    @ReactMethod
    public void registerTuyaHomeChangeListener() {
        if (mITuyaHomeChangeListener != null) {
            TuyaHomeSdk.getHomeManagerInstance().unRegisterTuyaHomeChangeListener(mITuyaHomeChangeListener);
            mITuyaHomeChangeListener = null;
        }
        mITuyaHomeChangeListener = new ITuyaHomeChangeListener() {

            @Override
            public void onHomeAdded(long homeId) {
                WritableMap map = Arguments.createMap();
                map.putDouble("homeId", homeId);
                map.putString("type", "onHomeAdded");
                BridgeUtils.homeChange(getReactApplicationContext(), map, "");
            }

            @Override
            public void onHomeInvite(long homeId, String homeName) {
                WritableMap map = Arguments.createMap();
                map.putDouble("homeId", homeId);
                map.putString("homeName", homeName);
                map.putString("type", "onHomeInvite");
                BridgeUtils.homeChange(getReactApplicationContext(), map, "");
            }

            @Override
            public void onHomeRemoved(long homeId) {
                WritableMap map = Arguments.createMap();
                map.putDouble("homeId", homeId);
                map.putString("type", "onHomeRemoved");
                BridgeUtils.homeChange(getReactApplicationContext(), map, "");
            }

            @Override
            public void onHomeInfoChanged(long homeId) {
                WritableMap map = Arguments.createMap();
                map.putDouble("homeId", homeId);
                map.putString("type", "onHomeInfoChanged");
                BridgeUtils.homeChange(getReactApplicationContext(), map, "");
            }

            @Override
            public void onSharedDeviceList(List<DeviceBean> sharedDeviceList) {
                WritableMap map = Arguments.createMap();
                map.putArray("sharedDeviceList", TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(sharedDeviceList)));
                map.putString("type", "onSharedDeviceList");
                BridgeUtils.homeChange(getReactApplicationContext(), map, "");
            }

            @Override
            public void onSharedGroupList(List<GroupBean> sharedGroupList) {
                WritableMap map = Arguments.createMap();
                map.putArray("sharedGroupList", TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(sharedGroupList)));
                map.putString("type", "onSharedGroupList");
                BridgeUtils.homeChange(getReactApplicationContext(), map, "");
            }

            @Override
            public void onServerConnectSuccess() {
                WritableMap map = Arguments.createMap();
                map.putString("type", "onServerConnectSuccess");
                BridgeUtils.homeChange(getReactApplicationContext(), map, "");
            }
        };
        TuyaHomeSdk.getHomeManagerInstance().registerTuyaHomeChangeListener(mITuyaHomeChangeListener);
    }

    @ReactMethod
    public void unregisterTuyaHomeChangeListener() {
        TuyaHomeSdk.getHomeManagerInstance().unRegisterTuyaHomeChangeListener(mITuyaHomeChangeListener);
        mITuyaHomeChangeListener = null;
    }


    @ReactMethod
    public void onDestroy() {
        TuyaHomeSdk.getHomeManagerInstance().onDestroy();
    }
}
