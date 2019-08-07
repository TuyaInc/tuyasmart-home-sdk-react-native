package com.tuya.smart.rnsdk.device;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.bean.TransferDataBean;
import com.tuya.smart.home.sdk.callback.ITuyaTransferCallback;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.ITuyaDataCallback;

import java.util.Arrays;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.DEVID;

public class TuyaSingleTransferModule extends ReactContextBaseJavaModule {
    public TuyaSingleTransferModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ITuyaDataCallback<TransferDataBean> mITuyaDataCallback;
    private ITuyaTransferCallback mITuyaTransferCallback;

    @Nonnull
    @Override
    public String getName() {
        return "TuyaSingleTransferModule";
    }

    @ReactMethod
    public void startConnect() {
        TuyaHomeSdk.getTransferInstance().startConnect();
    }

    @ReactMethod
    public void isOnline(Promise promise) {
        promise.resolve(TuyaHomeSdk.getTransferInstance().isOnline());
    }

    @ReactMethod
    public void subscribeDevice(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getTransferInstance().subscribeDevice(params.getString(DEVID));
        }
    }

    @ReactMethod
    public void unSubscribeDevice(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getTransferInstance().unSubscribeDevice(params.getString(DEVID));
        }
    }

    @ReactMethod
    public void registerTransferDataListener() {
        if (mITuyaDataCallback == null) {
            mITuyaDataCallback = new ITuyaDataCallback<TransferDataBean>() {
                @Override
                public void onSuccess(TransferDataBean result) {
                    WritableMap map = Arguments.createMap();
                    map.putMap("result", TuyaReactUtils.parseToWritableMap(result));
                    map.putString("type", "onSuccess");
                    BridgeUtils.transferDataListener(getReactApplicationContext(), map, "");
                }

                @Override
                public void onError(String errorCode, String errorMessage) {
                    WritableMap map = Arguments.createMap();
                    map.putString("errorCode", errorCode);
                    map.putString("errorMessage", errorMessage);
                    map.putString("type", "onError");
                    BridgeUtils.transferDataListener(getReactApplicationContext(), map, "");
                }
            };
        }
        TuyaHomeSdk.getTransferInstance().registerTransferDataListener(mITuyaDataCallback);
    }

    @ReactMethod
    public void unRegisterTransferDataListener() {
        if (mITuyaDataCallback != null) {
            TuyaHomeSdk.getTransferInstance().unRegisterTransferDataListener(mITuyaDataCallback);
            mITuyaDataCallback = null;
        }
    }

    @ReactMethod
    public void registerTransferCallback() {
        if (mITuyaTransferCallback == null) {
            mITuyaTransferCallback = new ITuyaTransferCallback() {
                @Override
                public void onConnectSuccess() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onConnectSuccess");
                    BridgeUtils.transferListener(getReactApplicationContext(), map, "");
                }

                @Override
                public void onConnectError(String code, String error) {
                    WritableMap map = Arguments.createMap();
                    map.putString("errorCode", code);
                    map.putString("errorMessage", error);
                    map.putString("type", "onError");
                    BridgeUtils.transferListener(getReactApplicationContext(), map, "");
                }
            };
        }
        TuyaHomeSdk.getTransferInstance().registerTransferCallback(mITuyaTransferCallback);
    }

    @ReactMethod
    public void unRegisterTransferCallback() {
        if (mITuyaTransferCallback != null) {
            TuyaHomeSdk.getTransferInstance().unRegisterTransferCallback(mITuyaTransferCallback);
            mITuyaTransferCallback = null;
        }
    }

    @ReactMethod
    public void stopConnect() {
        TuyaHomeSdk.getTransferInstance().stopConnect();
    }
}
