package com.tuya.smart.rnsdk.activator;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.android.common.utils.WiFiUtil;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.builder.ActivatorBuilder;
import com.tuya.smart.home.sdk.builder.TuyaGwSubDevActivatorBuilder;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.ITuyaActivator;
import com.tuya.smart.sdk.api.ITuyaActivatorGetToken;
import com.tuya.smart.sdk.api.ITuyaSmartActivatorListener;
import com.tuya.smart.sdk.bean.DeviceBean;
import com.tuya.smart.sdk.enums.ActivatorModelEnum;

import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.DEVID;
import static com.tuya.smart.rnsdk.utils.Constant.HOMEID;
import static com.tuya.smart.rnsdk.utils.Constant.PASSWORD;
import static com.tuya.smart.rnsdk.utils.Constant.SSID;
import static com.tuya.smart.rnsdk.utils.Constant.TIME;
import static com.tuya.smart.rnsdk.utils.Constant.TYPE;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;

public class TuyaActivatorModule extends ReactContextBaseJavaModule {
    public TuyaActivatorModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ITuyaActivator mITuyaActivator;
    private ITuyaActivator iTuyaActivator;

    @Nonnull
    @Override
    public String getName() {
        return "TuyaActivatorModule";
    }


    @ReactMethod
    public void getCurrentSSID(Promise promise) {
        promise.resolve(WiFiUtil.getCurrentSSID(getReactApplicationContext()));
    }

    @ReactMethod
    public void initActivator(final ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, SSID, PASSWORD, TIME, TYPE), params)) {
            TuyaHomeSdk.getActivatorInstance().getActivatorToken(coverDTL(params.getDouble(HOMEID)), new ITuyaActivatorGetToken() {
                @Override
                public void onSuccess(String token) {
                    stop();
                    ActivatorBuilder activatorBuilder = new ActivatorBuilder()
                            .setSsid(params.getString(SSID))
                            .setContext(getReactApplicationContext().getApplicationContext())
                            .setPassword(params.getString(PASSWORD))
                            .setActivatorModel(ActivatorModelEnum.valueOf(params.getString(TYPE)))
                            .setTimeOut(params.getInt(TIME))
                            .setToken(token).setListener(new ITuyaSmartActivatorListener() {
                                @Override
                                public void onError(String errorCode, String errorMsg) {
                                    promise.reject(errorCode, errorMsg);
                                }

                                @Override
                                public void onActiveSuccess(DeviceBean devResp) {
                                    promise.resolve(TuyaReactUtils.parseToWritableMap(devResp));
                                }

                                @Override
                                public void onStep(String step, Object data) {
                                    promise.resolve(JsonUtils.toString(data));
                                }
                            });
                    if(ActivatorModelEnum.valueOf(params.getString(TYPE))==ActivatorModelEnum.TY_AP){
                        mITuyaActivator = TuyaHomeSdk.getActivatorInstance().newActivator(activatorBuilder);
                    }else{
                        mITuyaActivator = TuyaHomeSdk.getActivatorInstance().newMultiActivator(activatorBuilder);
                    }
                    mITuyaActivator.start();
                }

                @Override
                public void onFailure(String errorCode, String errorMsg) {
                    promise.reject(errorCode, errorMsg);
                }
            });
        }
    }


    @ReactMethod
    public void stop() {
        if (mITuyaActivator != null) {
            mITuyaActivator.stop();
            mITuyaActivator.onDestroy();
            mITuyaActivator = null;
        }
        if (iTuyaActivator != null) {
            iTuyaActivator.stop();
            iTuyaActivator.onDestroy();
            iTuyaActivator = null;
        }
    }

    @ReactMethod
    public void newGwSubDevActivator(final ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, TIME), params)) {
            stop();
            TuyaGwSubDevActivatorBuilder tuyaGwSubDevActivatorBuilder = new TuyaGwSubDevActivatorBuilder().setDevId(params.getString(DEVID)).setTimeOut(params.getInt(TIME)).setListener(new ITuyaSmartActivatorListener() {
                @Override
                public void onError(String errorCode, String errorMsg) {
                    promise.reject(errorCode, errorMsg);
                }

                @Override
                public void onActiveSuccess(DeviceBean devResp) {
                    promise.resolve(TuyaReactUtils.parseToWritableMap(devResp));
                }

                @Override
                public void onStep(String step, Object data) {
                    promise.resolve(JsonUtils.toString(data));
                }
            });
            iTuyaActivator = TuyaHomeSdk.getActivatorInstance().newGwSubDevActivator(tuyaGwSubDevActivatorBuilder);
            iTuyaActivator.start();
        }
    }
}
