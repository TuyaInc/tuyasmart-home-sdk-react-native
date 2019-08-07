package com.tuya.smart.rnsdk.device;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.tuya.smart.android.device.bean.UpgradeInfoBean;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.IGetOtaInfoCallback;
import com.tuya.smart.sdk.api.IOtaListener;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.DEVID;

public class TuyaOTAModule extends ReactContextBaseJavaModule {
    public TuyaOTAModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaOTAModule";
    }

    @ReactMethod
    public void startOta(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.newOTAInstance(params.getString(DEVID)).startOta();
        }
    }

    @ReactMethod
    public void getOtaInfo(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.newOTAInstance(params.getString(DEVID)).getOtaInfo(new IGetOtaInfoCallback() {
                @Override
                public void onSuccess(List<UpgradeInfoBean> result) {
                    promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(result)));
                }

                @Override
                public void onFailure(String code, String error) {
                    promise.reject(code, error);
                }
            });
        }
    }

    /* 设置升级状态回调 */
    @ReactMethod
    public void setOtaListener(final ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.newOTAInstance(params.getString(DEVID)).setOtaListener(new IOtaListener() {

                @Override
                public void onSuccess(int otaType) {
                    WritableMap map = Arguments.createMap();
                    map.putInt("otaType", otaType);
                    map.putString("type", "onSuccess");
                    BridgeUtils.otaListener(getReactApplicationContext(), map, params.getString(DEVID));
                }

                @Override
                public void onFailure(int otaType, String code, String error) {
                    WritableMap map = Arguments.createMap();
                    map.putInt("otaType", otaType);
                    map.putString("error", error);
                    map.putString("code", code);
                    map.putString("type", "onFailure");
                    BridgeUtils.otaListener(getReactApplicationContext(), map, params.getString(DEVID));
                }

                @Override
                public void onProgress(int otaType, int progress) {
                    WritableMap map = Arguments.createMap();
                    map.putInt("otaType", otaType);
                    map.putInt("progress", progress);
                    map.putString("type", "onProgress");
                    BridgeUtils.otaListener(getReactApplicationContext(), map, params.getString(DEVID));
                }
            });
        }
    }

    @ReactMethod
    public void onDestroy(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.newOTAInstance(params.getString(DEVID)).onDestroy();
        }
    }
}
