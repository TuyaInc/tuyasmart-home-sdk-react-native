package com.tuya.smart.rnsdk.device;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.android.device.api.IGetDataPointStatCallback;
import com.tuya.smart.android.device.api.IPropertyCallback;
import com.tuya.smart.android.device.bean.DataPointStatBean;
import com.tuya.smart.android.device.enums.DataPointTypeEnum;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.api.IWarningMsgListener;
import com.tuya.smart.home.sdk.bean.WarnMessageBean;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.Constant;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.IDevListener;
import com.tuya.smart.sdk.api.ITuyaDevice;
import com.tuya.smart.sdk.api.WifiSignalListener;
import com.tuya.smart.sdk.enums.TYDevicePublishModeEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.CODE;
import static com.tuya.smart.rnsdk.utils.Constant.DATA;
import static com.tuya.smart.rnsdk.utils.Constant.DATAPOINTTYPEENUM;
import static com.tuya.smart.rnsdk.utils.Constant.DEVID;
import static com.tuya.smart.rnsdk.utils.Constant.DPID;
import static com.tuya.smart.rnsdk.utils.Constant.DPS;
import static com.tuya.smart.rnsdk.utils.Constant.LIST;
import static com.tuya.smart.rnsdk.utils.Constant.NAME;
import static com.tuya.smart.rnsdk.utils.Constant.NUMBER;
import static com.tuya.smart.rnsdk.utils.Constant.STARTTIME;
import static com.tuya.smart.rnsdk.utils.Constant.TYDEVICEPUBLISHMODEENUM;
import static com.tuya.smart.rnsdk.utils.Constant.VALUE;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getIResultCallback;

public class TuyaDeviceModule extends ReactContextBaseJavaModule {
    public TuyaDeviceModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private IDevListener mIDevListener;

    @Nonnull
    @Override
    public String getName() {
        return "TuyaDeviceModule";
    }


    @ReactMethod
    public void removeDevice(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            getDevice(params.getString(DEVID)).removeDevice(getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void renameDevice(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, NAME), params)) {
            getDevice(params.getString(DEVID)).renameDevice(params.getString(NAME), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void publishDps(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, DPS), params)) {
            getDevice(params.getString(DEVID)).publishDps(params.getString(DPS), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void publishDpsWithEnum(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, TYDEVICEPUBLISHMODEENUM), params)) {
            getDevice(params.getString(DEVID)).publishDps(params.getString(DPS), TYDevicePublishModeEnum.valueOf(params.getString(TYDEVICEPUBLISHMODEENUM)), getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void registerDevListener(final ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.DEVID), params)) {
            if (mIDevListener != null) {
                getDevice(params.getString(DEVID)).unRegisterDevListener();
                mIDevListener = null;
            }
            mIDevListener = new IDevListener() {

                @Override
                public void onDpUpdate(String devId, String dpStr) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("dpStr", dpStr);
                    map.putString("type", "onDpUpdate");
                    BridgeUtils.devListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }

                @Override
                public void onRemoved(String devId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("type", "onRemoved");
                    BridgeUtils.devListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }

                @Override
                public void onStatusChanged(String devId, boolean online) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putBoolean("online", online);
                    map.putString("type", "onStatusChanged");
                    BridgeUtils.devListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }

                @Override
                public void onNetworkStatusChanged(String devId, boolean status) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putBoolean("status", status);
                    map.putString("type", "onNetworkStatusChanged");
                    BridgeUtils.devListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }

                @Override
                public void onDevInfoUpdate(String devId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("type", "onDevInfoUpdate");
                    BridgeUtils.devListener(getReactApplicationContext(), map, params.getString(Constant.DEVID));
                }
            };
            getDevice(params.getString(DEVID)).registerDevListener(mIDevListener);
        }
    }

    @ReactMethod
    public void unRegisterDevListener(ReadableMap params) {
        if (mIDevListener != null) {
            getDevice(params.getString(DEVID)).unRegisterDevListener();
            mIDevListener = null;
        }
    }

    @ReactMethod
    public void getDp(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, DPID), params)) {
            getDevice(params.getString(DEVID)).getDp(params.getString(DPID), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void getDpList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, LIST), params)) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(LIST).size(); i++) {
                list.add(params.getArray(LIST).getString(i));
            }
            getDevice(params.getString(DEVID)).getDpList(list, getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void resetFactory(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            getDevice(params.getString(DEVID)).resetFactory(getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void getDeviceProperty(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            getDevice(params.getString(DEVID)).getDeviceProperty(new IPropertyCallback<Map>() {
                @Override
                public void onError(String code, String error) {
                    promise.reject(code, error);
                }

                @Override
                public void onSuccess(Map result) {
                    promise.resolve(TuyaReactUtils.parseToWritableMap(result));
                }
            });
        }
    }

    @ReactMethod
    public void saveDeviceProperty(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, CODE, VALUE), params)) {
            getDevice(params.getString(DEVID)).saveDeviceProperty(params.getString(CODE), params.getString(VALUE), getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void getDataPointStat(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, DATAPOINTTYPEENUM, STARTTIME, NUMBER, DPID), params)) {
            getDevice(params.getString(DEVID)).getDataPointStat(DataPointTypeEnum.valueOf(params.getString(DATAPOINTTYPEENUM)),
                    coverDTL(params.getDouble(STARTTIME)),
                    params.getInt(NUMBER),
                    params.getString(DPID), new IGetDataPointStatCallback() {
                        @Override
                        public void onError(String errorCode, String errorMsg) {
                            promise.reject(errorCode, errorMsg);
                        }

                        @Override
                        public void onSuccess(DataPointStatBean bean) {
                            promise.resolve(TuyaReactUtils.parseToWritableMap(bean));
                        }
                    });
        }
    }


    @ReactMethod
    public void queryData(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, DATA), params)) {
            getDevice(params.getString(DEVID)).queryData(params.getString(DATA), getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void onDestroy(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            getDevice(params.getString(DEVID)).onDestroy();
        }
    }

    @ReactMethod
    public void requestWifiSignal(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            getDevice(params.getString(DEVID)).requestWifiSignal(new WifiSignalListener() {
                @Override
                public void onSignalValueFind(String signal) {
                    promise.resolve(signal);
                }

                @Override
                public void onError(String errorCode, String errorMsg) {
                    promise.reject(errorCode, errorMsg);
                }
            });
        }
    }

    @ReactMethod
    public void getInitiativeQueryDpsInfoWithDpsArray(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, LIST), params)) {
            ArrayList<Integer> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(LIST).size(); i++) {
                list.add(params.getArray(LIST).getInt(i));
            }
            getDevice(params.getString(DEVID)).getInitiativeQueryDpsInfoWithDpsArray(list, getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void registerWarnMessageListener(final ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            getDevice(params.getString(DEVID)).registerWarnMessageListener(new IWarningMsgListener() {
                @Override
                public void onWarnMessageArrived(WarnMessageBean warnMessageBean) {
                    BridgeUtils.warnMessageArrived(getReactApplicationContext(), Arguments.createMap(), Double.valueOf(params.getDouble(DEVID)).toString());
                }
            });
        }
    }

    private ITuyaDevice getDevice(String devId) {
        return TuyaHomeSdk.newDeviceInstance(devId);
    }
}
