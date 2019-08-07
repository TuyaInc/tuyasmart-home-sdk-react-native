package com.tuya.smart.rnsdk.push;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.Constant;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.ITuyaGetBeanCallback;
import com.tuya.smart.sdk.bean.push.MQCompensationBean;

import java.util.Arrays;

import javax.annotation.Nonnull;

public class TuyaPushModule extends ReactContextBaseJavaModule {
    public TuyaPushModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaPushModule";
    }

    /* Push涂鸦云注册 */
    @ReactMethod
    public void registerDevice(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.ALIASID, Constant.PUSHPROVIDER), params)) {
            TuyaHomeSdk.getPushInstance().registerDevice(params.getString(Constant.ALIASID),
                    params.getString(Constant.PUSHPROVIDER), Constant.getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void registerMQPushListener(final Promise promise) {
        TuyaHomeSdk.getPushInstance().registerMQPushListener(new ITuyaGetBeanCallback<MQCompensationBean>() {
            @Override
            public void onResult(MQCompensationBean bean) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(bean));
            }
        });
    }

    @ReactMethod
    public void onDestroy() {
        TuyaHomeSdk.getPushInstance().onDestroy();
    }
}
