package com.tuya.smart.rnsdk.home;


import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.api.ITuyaHome;
import com.tuya.smart.home.sdk.api.ITuyaHomeDeviceStatusListener;
import com.tuya.smart.home.sdk.api.ITuyaHomeStatusListener;
import com.tuya.smart.home.sdk.api.IWarningMsgListener;
import com.tuya.smart.home.sdk.bean.DeviceAndGroupInHomeBean;
import com.tuya.smart.home.sdk.bean.HomeBean;
import com.tuya.smart.home.sdk.bean.RoomBean;
import com.tuya.smart.home.sdk.bean.WarnMessageBean;
import com.tuya.smart.home.sdk.callback.ITuyaGetRoomListCallback;
import com.tuya.smart.home.sdk.callback.ITuyaHomeResultCallback;
import com.tuya.smart.home.sdk.callback.ITuyaRoomResultCallback;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.bean.DeviceBean;
import com.tuya.smart.sdk.bean.GroupBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.DEVICES;
import static com.tuya.smart.rnsdk.utils.Constant.DEVIDLIST;
import static com.tuya.smart.rnsdk.utils.Constant.GEONAME;
import static com.tuya.smart.rnsdk.utils.Constant.GROUPID;
import static com.tuya.smart.rnsdk.utils.Constant.HOMEID;
import static com.tuya.smart.rnsdk.utils.Constant.IDLIST;
import static com.tuya.smart.rnsdk.utils.Constant.LAT;
import static com.tuya.smart.rnsdk.utils.Constant.LIST;
import static com.tuya.smart.rnsdk.utils.Constant.LON;
import static com.tuya.smart.rnsdk.utils.Constant.MESHID;
import static com.tuya.smart.rnsdk.utils.Constant.NAME;
import static com.tuya.smart.rnsdk.utils.Constant.PARENTID;
import static com.tuya.smart.rnsdk.utils.Constant.PARENTTYPE;
import static com.tuya.smart.rnsdk.utils.Constant.PRODUCTID;
import static com.tuya.smart.rnsdk.utils.Constant.ROOMID;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getIResultCallback;
import static com.tuya.smart.rnsdk.utils.Constant.getITuyaResultCallback;

public class TuyaHomeModule extends ReactContextBaseJavaModule {
    public TuyaHomeModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ITuyaHomeDeviceStatusListener mITuyaHomeDeviceStatusListener;
    private ITuyaHomeStatusListener mITuyaHomeStatusListener;
    private IWarningMsgListener mIWarningMsgListener;

    @Nonnull
    @Override
    public String getName() {
        return "TuyaHomeModule";
    }

    @ReactMethod
    public void getHomeDetail(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).getHomeDetail(getITuyaHomeResultCallback(promise));
        }
    }


    @ReactMethod
    public void getHomeLocalCache(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).getHomeLocalCache(getITuyaHomeResultCallback(promise));
        }
    }


    @ReactMethod
    public void updateHome(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, NAME, LON, LAT, GEONAME), params)) {
            getHomeInstance(params.getDouble(HOMEID)).updateHome(
                    params.getString(NAME),
                    params.getDouble(LON),
                    params.getDouble(LAT),
                    params.getString(GEONAME),
                    getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void dismissHome(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).dismissHome(getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void sortHome(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, IDLIST), params)) {
            ArrayList<Long> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(IDLIST).size(); i++) {
                list.add(coverDTL(params.getArray(IDLIST).getDouble(i)));
            }
            getHomeInstance(params.getDouble(HOMEID)).sortHome(list, getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void addRoom(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, NAME), params)) {
            getHomeInstance(params.getDouble(HOMEID)).addRoom(params.getString(NAME), getITuyaRoomResultCallback(promise));
        }
    }


    @ReactMethod
    public void removeRoom(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, ROOMID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).removeRoom(coverDTL(params.getDouble(ROOMID)), getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void sortRoom(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, IDLIST), params)) {
            ArrayList<Long> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(IDLIST).size(); i++) {
                list.add(coverDTL(params.getArray(IDLIST).getDouble(i)));
            }
            getHomeInstance(params.getDouble(HOMEID)).sortRoom(list, getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void queryRoomList(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).queryRoomList(getITuyaGetRoomListCallback(promise));
        }
    }


    @ReactMethod
    public void getHomeBean(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(getHomeInstance(params.getDouble(HOMEID)).getHomeBean()));
        }
    }

    @ReactMethod
    public void createGroup(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, DEVIDLIST, PRODUCTID, NAME), params)) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(DEVIDLIST).size(); i++) {
                list.add(params.getArray(DEVIDLIST).getString(i));
            }
            getHomeInstance(params.getDouble(HOMEID)).createGroup(
                    params.getString(PRODUCTID),
                    params.getString(NAME),
                    list,
                    getITuyaResultCallback(promise)
            );
        }
    }

    @ReactMethod
    public void queryRoomInfoByDevice(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, DEVICES), params)) {
            List deviceBeans = JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(DEVICES))), DeviceBean.class);
            List<RoomBean> roomBeans = getHomeInstance(params.getDouble(HOMEID)).queryRoomInfoByDevice(deviceBeans);
            promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(roomBeans)));
        }
    }


    @ReactMethod
    public void registerHomeDeviceStatusListener(final ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            if (mITuyaHomeDeviceStatusListener != null) {
                getHomeInstance(params.getDouble(HOMEID)).unRegisterHomeDeviceStatusListener(mITuyaHomeDeviceStatusListener);
                mITuyaHomeDeviceStatusListener = null;

            }
            mITuyaHomeDeviceStatusListener = new ITuyaHomeDeviceStatusListener() {
                @Override
                public void onDeviceDpUpdate(String devId, String dpStr) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("dpStr", dpStr);
                    map.putString("type", "onDeviceDpUpdate");
                    BridgeUtils.homeDeviceStatus(getReactApplicationContext(), map, Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }

                @Override
                public void onDeviceStatusChanged(String devId, boolean online) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putBoolean("online", online);
                    map.putString("type", "onDeviceStatusChanged");
                    BridgeUtils.homeDeviceStatus(getReactApplicationContext(), map, Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }

                @Override
                public void onDeviceInfoUpdate(String devId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("type", "onDeviceInfoUpdate");
                    BridgeUtils.homeDeviceStatus(getReactApplicationContext(), map, Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }
            };
            getHomeInstance(params.getDouble(HOMEID)).registerHomeDeviceStatusListener(mITuyaHomeDeviceStatusListener);
        }
    }

    @ReactMethod
    public void unRegisterHomeDeviceStatusListener(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            if (mITuyaHomeDeviceStatusListener != null) {
                getHomeInstance(params.getDouble(HOMEID)).unRegisterHomeDeviceStatusListener(mITuyaHomeDeviceStatusListener);
                mITuyaHomeDeviceStatusListener = null;
            }
        }
    }


    @ReactMethod
    public void registerHomeStatusListener(final ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            if (mITuyaHomeStatusListener != null) {
                getHomeInstance(params.getDouble(HOMEID)).unRegisterHomeStatusListener(mITuyaHomeStatusListener);
                mITuyaHomeStatusListener = null;

            }
            mITuyaHomeStatusListener = new ITuyaHomeStatusListener() {

                @Override
                public void onDeviceAdded(String devId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("type", "onDeviceAdded");
                    BridgeUtils.homeStatus(getReactApplicationContext(), map, Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }

                @Override
                public void onDeviceRemoved(String devId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("devId", devId);
                    map.putString("type", "onDeviceRemoved");
                    BridgeUtils.homeStatus(getReactApplicationContext(), map, Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }

                @Override
                public void onGroupAdded(long groupId) {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("groupId", groupId);
                    map.putString("type", "onGroupAdded");
                    BridgeUtils.homeStatus(getReactApplicationContext(), map, Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }

                @Override
                public void onGroupRemoved(long groupId) {
                    WritableMap map = Arguments.createMap();
                    map.putDouble("groupId", groupId);
                    map.putString("type", "onGroupRemoved");
                    BridgeUtils.homeStatus(getReactApplicationContext(), map, Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }

                @Override
                public void onMeshAdded(String meshId) {
                    WritableMap map = Arguments.createMap();
                    map.putString("meshId", meshId);
                    map.putString("type", "onMeshAdded");
                    BridgeUtils.homeStatus(getReactApplicationContext(), map, Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }
            };
            getHomeInstance(params.getDouble(HOMEID)).registerHomeStatusListener(mITuyaHomeStatusListener);
        }
    }

    @ReactMethod
    public void unRegisterHomeStatusListener(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            if (mITuyaHomeStatusListener != null) {
                getHomeInstance(params.getDouble(HOMEID)).unRegisterHomeStatusListener(mITuyaHomeStatusListener);
                mITuyaHomeStatusListener = null;
            }
        }
    }


    @ReactMethod
    public void createBlueMesh(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, MESHID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).createBlueMesh(params.getString(MESHID), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void createSigMesh(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).createSigMesh(getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void queryDeviceListToAddGroup(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, GROUPID, PRODUCTID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).queryDeviceListToAddGroup(coverDTL(params.getDouble(GROUPID)), params.getString(PRODUCTID), getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void queryZigbeeDeviceListToAddGroup(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, PRODUCTID, GROUPID, PARENTID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).queryZigbeeDeviceListToAddGroup(coverDTL(params.getDouble(GROUPID)),
                    params.getString(PRODUCTID),
                    params.getString(PARENTID), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void onDestroy(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            getHomeInstance(params.getDouble(HOMEID)).onDestroy();
        }
    }

    @ReactMethod
    public void createZigbeeGroup(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, PRODUCTID, PARENTID, PARENTTYPE, NAME), params)) {
            getHomeInstance(params.getDouble(HOMEID)).createZigbeeGroup(
                    params.getString(PRODUCTID),
                    params.getString(PARENTID),
                    params.getInt(PARENTTYPE),
                    params.getString(NAME),
                    getITuyaResultCallback(promise)
            );
        }
    }

    @ReactMethod
    public void queryRoomInfoByGroup(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, LIST), params)) {
            List deviceBeans = JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(LIST))), GroupBean.class);
            List<RoomBean> roomBeans = getHomeInstance(params.getDouble(HOMEID)).queryRoomInfoByGroup(deviceBeans);
            promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(roomBeans)));
        }
    }

    @ReactMethod
    public void bindNewConfigDevs(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, DEVIDLIST), params)) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(DEVIDLIST).size(); i++) {
                list.add(params.getArray(DEVIDLIST).getString(i));
            }
            getHomeInstance(params.getDouble(HOMEID)).bindNewConfigDevs(
                    list,
                    getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void registerProductWarnListener(final ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            if (mIWarningMsgListener != null) {
                getHomeInstance(params.getDouble(HOMEID)).unRegisterProductWarnListener(mIWarningMsgListener);
                mIWarningMsgListener = null;
            }
            mIWarningMsgListener = new IWarningMsgListener() {
                @Override
                public void onWarnMessageArrived(WarnMessageBean warnMessageBean) {
                    BridgeUtils.warnMessageArrived(getReactApplicationContext(), Arguments.createMap(), Double.valueOf(params.getDouble(HOMEID)).longValue()+"");
                }
            };
            getHomeInstance(params.getDouble(HOMEID)).registerProductWarnListener(mIWarningMsgListener);
        }
    }

    @ReactMethod
    public void unRegisterProductWarnListener(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            if (mIWarningMsgListener != null) {
                getHomeInstance(params.getDouble(HOMEID)).unRegisterProductWarnListener(mIWarningMsgListener);
                mIWarningMsgListener = null;
            }
        }
    }

    @ReactMethod
    public void sortDevInHome(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, LIST), params)) {
            getHomeInstance(params.getDouble(HOMEID)).sortDevInHome(
                    Double.valueOf(params.getDouble(HOMEID)).toString(),
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(LIST))), DeviceAndGroupInHomeBean.class),
                    getIResultCallback(promise));
        }
    }


    private ITuyaHome getHomeInstance(double homeId) {
        return TuyaHomeSdk.newHomeInstance(coverDTL(homeId));
    }


    public static ITuyaRoomResultCallback getITuyaRoomResultCallback(final Promise promise) {
        return new ITuyaRoomResultCallback() {
            @Override
            public void onSuccess(RoomBean bean) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(bean));
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }

        };
    }

    public static ITuyaGetRoomListCallback getITuyaGetRoomListCallback(final Promise promise) {
        return new ITuyaGetRoomListCallback() {
            @Override
            public void onSuccess(List<RoomBean> romeBeans) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(romeBeans)));
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }

        };
    }

    public static ITuyaHomeResultCallback getITuyaHomeResultCallback(final Promise promise) {
        return new ITuyaHomeResultCallback() {
            @Override
            public void onSuccess(HomeBean bean) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(bean));
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }

        };
    }

}
