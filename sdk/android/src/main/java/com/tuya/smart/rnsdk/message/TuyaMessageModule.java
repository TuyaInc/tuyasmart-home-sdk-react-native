package com.tuya.smart.rnsdk.message;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.sdk.bean.message.MessageType;

import java.util.ArrayList;
import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.ENDTIME;
import static com.tuya.smart.rnsdk.utils.Constant.IDS;
import static com.tuya.smart.rnsdk.utils.Constant.LIMIT;
import static com.tuya.smart.rnsdk.utils.Constant.MSGSRCID;
import static com.tuya.smart.rnsdk.utils.Constant.MSGTYPE;
import static com.tuya.smart.rnsdk.utils.Constant.OFFSET;
import static com.tuya.smart.rnsdk.utils.Constant.STARTTIME;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getIBooleanCallback;
import static com.tuya.smart.rnsdk.utils.Constant.getITuyaDataCallback;

public class TuyaMessageModule extends ReactContextBaseJavaModule {
    public TuyaMessageModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaMessageModule";
    }

    @ReactMethod
    public void getMessageList(final Promise promise) {
        TuyaHomeSdk.getMessageInstance().getMessageList(getITuyaDataCallback(promise));
    }


    @ReactMethod
    public void getMessageListParams(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(OFFSET, LIMIT), params)) {
            TuyaHomeSdk.getMessageInstance().getMessageList(params.getInt(OFFSET), params.getInt(LIMIT), getITuyaDataCallback(promise));
        }
    }

    @ReactMethod
    public void getMessageListParamsWithTime(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(OFFSET, LIMIT, STARTTIME, ENDTIME), params)) {
            TuyaHomeSdk.getMessageInstance().getMessageList(
                    params.getInt(OFFSET),
                    params.getInt(LIMIT),
                    coverDTL(params.getDouble(STARTTIME)),
                    coverDTL(params.getDouble(ENDTIME)),
                    getITuyaDataCallback(promise));
        }
    }


    @ReactMethod
    public void getMessageListByMsgType(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(OFFSET, LIMIT, MSGTYPE), params)) {
            TuyaHomeSdk.getMessageInstance().getMessageListByMsgType(
                    params.getInt(OFFSET),
                    params.getInt(LIMIT),
                    MessageType.valueOf(params.getString(MSGTYPE)),
                    getITuyaDataCallback(promise));
        }
    }

    @ReactMethod
    public void getMessageListByMsgSrcId(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(OFFSET, LIMIT, MSGTYPE, MSGSRCID), params)) {
            TuyaHomeSdk.getMessageInstance().getMessageListByMsgSrcId(
                    params.getInt(OFFSET),
                    params.getInt(LIMIT),
                    MessageType.valueOf(params.getString(MSGTYPE)),
                    params.getString(MSGSRCID),
                    getITuyaDataCallback(promise));
        }
    }


    @ReactMethod
    public void getMessageMaxTime(final Promise promise) {
        TuyaHomeSdk.getMessageInstance().getMessageMaxTime(getITuyaDataCallback(promise));
    }


    @ReactMethod
    public void deleteMessage(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(IDS), params)) {
            ArrayList<String> ids = new ArrayList<>();
            for (int i = 0; i < params.getArray(IDS).size(); i++) {
                ids.add(params.getArray(IDS).getString(i));
            }
            TuyaHomeSdk.getMessageInstance().deleteMessages(ids, getIBooleanCallback(promise));
        }
    }
}
