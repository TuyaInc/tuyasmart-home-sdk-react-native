package com.tuya.smart.rnsdk.core;

import android.app.Application;
import android.content.Context;
import android.text.TextUtils;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.INeedLoginListener;
import com.tuya.smart.sdk.api.IRequestCallback;

import java.util.Arrays;
import java.util.HashMap;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.API_REQUEST_ERROR;
import static com.tuya.smart.rnsdk.utils.Constant.APPKEY;
import static com.tuya.smart.rnsdk.utils.Constant.APPSECRET;
import static com.tuya.smart.rnsdk.utils.Constant.DEBUG;
import static com.tuya.smart.rnsdk.utils.Constant.NEEDLOGIN;

public class TuyaCoreModule extends ReactContextBaseJavaModule {
    public TuyaCoreModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaCoreModule";
    }


    @ReactMethod
    public void initWithoutOptions() {
        TuyaHomeSdk.init((Application) getReactApplicationContext().getApplicationContext());
    }


    @ReactMethod
    public void initWithOptions(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(APPKEY, APPSECRET), params)) {
            TuyaHomeSdk.init((Application) getReactApplicationContext().getApplicationContext(), params.getString(APPKEY), params.getString(APPSECRET));
        }
    }

    @ReactMethod
    public void apiRequest(ReadableMap params, final Promise promise) {
        IRequestCallback iRequestCallback = new IRequestCallback() {
            @Override
            public void onSuccess(Object result) {
                if (result instanceof Boolean) {
                    promise.resolve("success");
                    return;
                }
                WritableMap writableMap = TuyaReactUtils.parseToWritableMap(result);
                promise.resolve(writableMap);
            }

            @Override
            public void onFailure(String errorCode, String errorMsg) {
                promise.reject(errorCode, errorMsg);
            }
        };
        Boolean withoutSession = params.getBoolean("withoutSession");
        String apiName = params.getString("apiName");
        String apiVersion = params.getString("version");
        HashMap postData = TuyaReactUtils.parseToMap(params.getMap("postData"));
        if (TextUtils.isEmpty(apiName)) {
            promise.reject(API_REQUEST_ERROR, "ApiName is empty");
            return;
        }

        if (withoutSession) {
            TuyaHomeSdk.getRequestInstance().requestWithApiNameWithoutSession(apiName, apiVersion, postData, iRequestCallback);
        } else {
            TuyaHomeSdk.getRequestInstance().requestWithApiName(apiName, apiVersion, postData, iRequestCallback);
        }

    }


    @ReactMethod
    public void setOnNeedLoginListener() {
        TuyaHomeSdk.setOnNeedLoginListener(new INeedLoginListener() {
            @Override
            public void onNeedLogin(Context context) {
                TuyaReactUtils.sendEvent(getReactApplicationContext(), NEEDLOGIN, null);
            }
        });
    }


    @ReactMethod
    public void setDebugMode(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEBUG), params)) {
            TuyaHomeSdk.setDebugMode(params.getBoolean(DEBUG));
        }
    }

    @ReactMethod
    public void onDestroy() {
        TuyaHomeSdk.onDestroy();
    }
}
