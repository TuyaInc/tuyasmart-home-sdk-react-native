package com.tuya.smart.rnsdk.feedback;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.Constant;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;

import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.HDID;
import static com.tuya.smart.rnsdk.utils.Constant.HDTYPE;
import static com.tuya.smart.rnsdk.utils.Constant.getITuyaDataCallback;

public class TuyaFeedBackModule extends ReactContextBaseJavaModule {
    public TuyaFeedBackModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaFeedBackModule";
    }

    @ReactMethod
    public void getFeedbackList(final Promise promise) {
        TuyaHomeSdk.getTuyaFeekback().getFeedbackManager().getFeedbackList(getITuyaDataCallback(promise));
    }


    @ReactMethod
    public void getFeedbackType(final Promise promise) {
        TuyaHomeSdk.getTuyaFeekback().getFeedbackManager().getFeedbackType(getITuyaDataCallback(promise));
    }


    @ReactMethod
    public void addFeedback(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.MESEAGE, Constant.CONTACT, Constant.HDID, HDTYPE), params)) {
            TuyaHomeSdk.getTuyaFeekback().getFeedbackManager().addFeedback(params.getString(Constant.MESEAGE), params.getString(Constant.CONTACT),
                    params.getString(HDID), params.getInt(HDTYPE), getITuyaDataCallback(promise));
        }
    }


    @ReactMethod
    public void getMsgList(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.HDID, Constant.HDTYPE), params)) {
            TuyaHomeSdk.getTuyaFeekback().getFeedbackMsg(params.getString(HDID), params.getInt(HDTYPE)).getMsgList(getITuyaDataCallback(promise));
        }
    }


    @ReactMethod
    public void addMsg(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.HDID, Constant.HDTYPE, Constant.MESEAGE, Constant.CONTACT), params)) {
            TuyaHomeSdk.getTuyaFeekback().getFeedbackMsg(params.getString(HDID), params.getInt(HDTYPE))
                    .addMsg(params.getString(Constant.MESEAGE), params.getString(Constant.CONTACT), getITuyaDataCallback(promise));
        }
    }

}
