package com.tuya.smart.rnsdk.group;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.sdk.api.IGroupListener;
import com.tuya.smart.sdk.api.ITuyaGroup;
import com.tuya.smart.sdk.enums.TYDevicePublishModeEnum;

import java.util.ArrayList;
import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.DEVID;
import static com.tuya.smart.rnsdk.utils.Constant.DEVIDS;
import static com.tuya.smart.rnsdk.utils.Constant.DPS;
import static com.tuya.smart.rnsdk.utils.Constant.GROUPID;
import static com.tuya.smart.rnsdk.utils.Constant.GROUPNAME;
import static com.tuya.smart.rnsdk.utils.Constant.PUBLISHMODEENUM;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getIResultCallback;

public class TuyaGroupModule extends ReactContextBaseJavaModule {
    public TuyaGroupModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private IGroupListener mIGroupListener;


    @ReactMethod
    public void registerGroupListener(final ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID), params)) {
            if (mIGroupListener != null) {
                getITuyaGroup(params.getDouble(GROUPID)).unRegisterGroupListener();
                mIGroupListener = null;
            }
            mIGroupListener = new IGroupListener() {
                @Override
                public void onDpUpdate(long groupId, String dps) {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("groupId", groupId);
                    map.putString("dps", dps);
                    map.putString("type", "onDpUpdate");
                    BridgeUtils.groupListener(getReactApplicationContext(), map, coverDTL(params.getDouble(GROUPID)) +"");
                }

                @Override
                public void onGroupInfoUpdate(long groupId) {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("groupId", groupId);
                    map.putString("type", "onGroupInfoUpdate");
                    BridgeUtils.groupListener(getReactApplicationContext(), map, coverDTL(params.getDouble(GROUPID)) +"");
                }

                @Override
                public void onGroupRemoved(long groupId) {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("groupId", groupId);
                    map.putString("type", "onGroupRemoved");
                    BridgeUtils.groupListener(getReactApplicationContext(), map, coverDTL(params.getDouble(GROUPID)) +"");
                }
            };
            getITuyaGroup(params.getDouble(GROUPID)).registerGroupListener(mIGroupListener);
        }

    }

    @ReactMethod
    public void unRegisterHomeStatusListener(ReadableMap params) {
        if (mIGroupListener != null) {
            getITuyaGroup(params.getDouble(GROUPID)).unRegisterGroupListener();
            mIGroupListener = null;
        }
    }


    @Nonnull
    @Override
    public String getName() {
        return "TuyaGroupModule";
    }


    @ReactMethod
    public void renameGroup(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID, GROUPNAME), params)) {
            getITuyaGroup(params.getDouble(GROUPID)).renameGroup(GROUPNAME, getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void dismissGroup(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID), params)) {
            getITuyaGroup(params.getDouble(GROUPID)).dismissGroup(getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void publishDps(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID, DPS), params)) {
            getITuyaGroup(params.getDouble(GROUPID)).publishDps(params.getString(DPS), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void publishDpsWithEnum(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID, DPS, PUBLISHMODEENUM), params)) {
            getITuyaGroup(params.getDouble(GROUPID)).publishDps(params.getString(DPS), TYDevicePublishModeEnum.valueOf(params.getString(PUBLISHMODEENUM)), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void updateDeviceList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID, DEVIDS), params)) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(DEVIDS).size(); i++) {
                list.add(params.getArray(DEVIDS).getString(i));
            }
            getITuyaGroup(params.getDouble(GROUPID)).updateDeviceList(list, getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void addDevice(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID, DEVID), params)) {
            getITuyaGroup(params.getDouble(GROUPID)).addDevice(params.getString(DEVID), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void removeDevice(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID, DEVID), params)) {
            getITuyaGroup(params.getDouble(GROUPID)).removeDevice(params.getString(DEVID), getIResultCallback(promise));
        }
    }

    private ITuyaGroup getITuyaGroup(double groupId) {
        return TuyaHomeSdk.newGroupInstance(coverDTL(groupId));
    }

}
