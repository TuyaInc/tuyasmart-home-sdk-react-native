package com.tuya.smart.rnsdk.timer;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.Constant;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.IGetAllTimerWithDevIdCallback;
import com.tuya.smart.sdk.api.IGetDeviceTimerStatusCallback;
import com.tuya.smart.sdk.api.IGetTimerWithTaskCallback;
import com.tuya.smart.sdk.api.IResultStatusCallback;
import com.tuya.smart.sdk.bean.TimerTask;
import com.tuya.smart.sdk.bean.TimerTaskStatus;

import java.util.ArrayList;
import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.DEVID;
import static com.tuya.smart.rnsdk.utils.Constant.DPID;
import static com.tuya.smart.rnsdk.utils.Constant.DPS;
import static com.tuya.smart.rnsdk.utils.Constant.INSTRUCT;
import static com.tuya.smart.rnsdk.utils.Constant.ISOPEN;
import static com.tuya.smart.rnsdk.utils.Constant.LOOPS;
import static com.tuya.smart.rnsdk.utils.Constant.STATUS;
import static com.tuya.smart.rnsdk.utils.Constant.TASKNAME;
import static com.tuya.smart.rnsdk.utils.Constant.TIME;
import static com.tuya.smart.rnsdk.utils.Constant.TIMEID;

public class TuyaTimerModule extends ReactContextBaseJavaModule {
    public TuyaTimerModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaTimerModule";
    }

    @ReactMethod
    public void addTimerWithTask(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TASKNAME, LOOPS, DEVID, DPS, TIME), params)) {
            TuyaHomeSdk.getTimerManagerInstance().addTimerWithTask(
                    params.getString(TASKNAME),
                    params.getString(DEVID),
                    params.getString(LOOPS),
                    TuyaReactUtils.parseToMap(params.getMap(DPS)),
                    params.getString(TIME),
                    getIResultStatusCallback(promise));
        }
    }


    @ReactMethod
    public void getTimerTaskStatusWithDeviceId(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getTimerManagerInstance().getTimerTaskStatusWithDeviceId(
                    params.getString(DEVID),
                    getIGetDeviceTimerStatusCallback(promise));
        }
    }

    @ReactMethod
    public void updateTimerTaskStatusWithTask(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TASKNAME, DEVID, STATUS), params)) {
            TuyaHomeSdk.getTimerManagerInstance().updateTimerTaskStatusWithTask(
                    params.getString(TASKNAME),
                    params.getString(DEVID),
                    params.getInt(STATUS),
                    getIResultStatusCallback(promise));
        }
    }


    @ReactMethod
    public void updateTimerStatusWithTask(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TASKNAME, DEVID, TIMEID, ISOPEN), params)) {
            TuyaHomeSdk.getTimerManagerInstance().updateTimerStatusWithTask(
                    params.getString(TASKNAME),
                    params.getString(DEVID),
                    params.getString(TIMEID),
                    params.getBoolean(ISOPEN),
                    getIResultStatusCallback(promise));
        }
    }


    @ReactMethod
    public void removeTimerWithTask(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TASKNAME, DEVID, TIMEID), params)) {
            TuyaHomeSdk.getTimerManagerInstance().removeTimerWithTask(
                    params.getString(TASKNAME),
                    params.getString(DEVID),
                    params.getString(TIMEID),
                    getIResultStatusCallback(promise));
        }
    }


    @ReactMethod
    public void updateTimerWithTask(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TASKNAME, LOOPS, DEVID, TIMEID, DPID, TIME, ISOPEN), params)) {
            TuyaHomeSdk.getTimerManagerInstance().updateTimerWithTask(
                    params.getString(TASKNAME),
                    params.getString(LOOPS),
                    params.getString(DEVID),
                    params.getString(TIMEID),
                    params.getString(DPID),
                    params.getString(TIME),
                    params.getBoolean(ISOPEN),
                    getIResultStatusCallback(promise));
        }
    }

    @ReactMethod
    public void updateTimerWithTaskAndInstruct(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TASKNAME, LOOPS, DEVID, TIMEID, INSTRUCT), params)) {
            TuyaHomeSdk.getTimerManagerInstance().updateTimerWithTask(
                    params.getString(TASKNAME),
                    params.getString(LOOPS),
                    params.getString(DEVID),
                    params.getString(TIMEID),
                    params.getString(INSTRUCT),
                    getIResultStatusCallback(promise));
        }
    }


    @ReactMethod
    public void getTimerWithTask(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TASKNAME, DEVID), params)) {
            TuyaHomeSdk.getTimerManagerInstance().getTimerWithTask(
                    params.getString(TASKNAME),
                    params.getString(DEVID),
                    new IGetTimerWithTaskCallback() {
                        @Override
                        public void onSuccess(TimerTask timerTask) {
                            promise.resolve(TuyaReactUtils.parseToWritableMap(timerTask));
                        }

                        @Override
                        public void onError(String errorCode, String errorMsg) {
                            promise.reject(errorCode, errorMsg);
                        }
                    });
        }
    }

    @ReactMethod
    public void getAllTimerWithDeviceId(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getTimerManagerInstance().getAllTimerWithDeviceId(
                    params.getString(DEVID),
                    new IGetAllTimerWithDevIdCallback() {
                        @Override
                        public void onSuccess(ArrayList<TimerTask> taskArrayList) {
                            promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(taskArrayList)));
                        }

                        @Override
                        public void onError(String errorCode, String errorMsg) {
                            promise.reject(errorCode, errorMsg);
                        }
                    });
        }
    }


    private IGetDeviceTimerStatusCallback getIGetDeviceTimerStatusCallback(final Promise promise) {
        return new IGetDeviceTimerStatusCallback() {
            @Override
            public void onSuccess(ArrayList<TimerTaskStatus> list) {
                promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(list)));
            }

            @Override
            public void onError(String errorCode, String errorMsg) {
                promise.reject(errorCode, errorMsg);

            }
        };
    }

    private IResultStatusCallback getIResultStatusCallback(final Promise promise) {
        return new IResultStatusCallback() {
            public void onSuccess() {
                promise.resolve(Constant.SUCCESS);
            }

            @Override
            public void onError(String errorCode, String errorMsg) {
                promise.reject(errorCode, errorMsg);

            }
        };
    }
}
