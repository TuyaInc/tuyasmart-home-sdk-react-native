package com.tuya.smart.rnsdk.home;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.bean.MemberBean;
import com.tuya.smart.home.sdk.bean.MemberWrapperBean;
import com.tuya.smart.home.sdk.callback.ITuyaGetMemberListCallback;
import com.tuya.smart.home.sdk.callback.ITuyaMemberResultCallback;
import com.tuya.smart.rnsdk.utils.Constant;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.ACTION;
import static com.tuya.smart.rnsdk.utils.Constant.FILENAME;
import static com.tuya.smart.rnsdk.utils.Constant.FILEPATH;
import static com.tuya.smart.rnsdk.utils.Constant.HOMEID;
import static com.tuya.smart.rnsdk.utils.Constant.ID;
import static com.tuya.smart.rnsdk.utils.Constant.MEMBERID;
import static com.tuya.smart.rnsdk.utils.Constant.MEMBERWRAPPERBEAN;
import static com.tuya.smart.rnsdk.utils.Constant.RELATIONID;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getIBooleanCallback;
import static com.tuya.smart.rnsdk.utils.Constant.getIResultCallback;
import static com.tuya.smart.rnsdk.utils.Constant.getITuyaDataCallback;

public class TuyaHomeMemberModule extends ReactContextBaseJavaModule {
    public TuyaHomeMemberModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaHomeMemberModule";
    }

    @ReactMethod
    public void updateMember(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.MEMBERID, Constant.NAME, Constant.ADMIN), params)) {
            TuyaHomeSdk.getMemberInstance().updateMember(
                    coverDTL(params.getDouble(MEMBERID)),
                    params.getString(Constant.NAME),
                    params.getBoolean(Constant.ADMIN),
                    getIResultCallback(promise)
            );
        }
    }


    @ReactMethod
    public void updateMemberWithBean(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.MEMBERWRAPPERBEAN), params)) {
            MemberWrapperBean.Builder builder = new MemberWrapperBean.Builder();
            HashMap obj = TuyaReactUtils.parseToMap(params.getMap(MEMBERWRAPPERBEAN));
            builder.setAccount(String.valueOf(obj.get("account")));
            builder.setAdmin((Boolean) obj.get("admin"));
            builder.setHomeId(Double.valueOf(String.valueOf(obj.get("homeId"))).longValue() );
            builder.setUid((String) obj.get("uid"));
            builder.setNickName((String) obj.get("nickName"));
            builder.setMemberId(Double.valueOf(String.valueOf(obj.get("memberId"))).longValue() );
            if (null!=obj.get("headPic")) {
                builder.setHeadPic((String) obj.get("headPic"));
            }
            if (null!=obj.get("countryCode")) {
                builder.setCountryCode((String) obj.get("countryCode"));
            }
            builder.build();
            TuyaHomeSdk.getMemberInstance().updateMember(
                    builder.build(),
                    getIResultCallback(promise)
            );
        }
    }


    @ReactMethod
    public void updateMemberRole(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.MEMBERID, Constant.ADMIN), params)) {
            TuyaHomeSdk.getMemberInstance().updateMemberRole(
                    coverDTL(params.getDouble(MEMBERID)),
                    params.getBoolean(Constant.ADMIN),
                    getIResultCallback(promise)
            );
        }
    }


    @ReactMethod
    public void addMember(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.HOMEID, Constant.COUNTRYCODE, Constant.USERACCOUNT, Constant.NAME, Constant.ADMIN), params)) {
            TuyaHomeSdk.getMemberInstance().addMember(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getString(Constant.COUNTRYCODE),
                    params.getString(Constant.USERACCOUNT),
                    params.getString(Constant.NAME),
                    params.getBoolean(Constant.ADMIN),
                    new ITuyaMemberResultCallback() {
                        @Override
                        public void onSuccess(MemberBean bean) {
                            promise.resolve(TuyaReactUtils.parseToWritableMap(bean));
                        }

                        @Override
                        public void onError(String errorCode, String errorMsg) {
                            promise.reject(errorCode, errorMsg);
                        }
                    }
            );
        }
    }


    @ReactMethod
    public void addMemberWithBean(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.MEMBERWRAPPERBEAN), params)) {
            MemberWrapperBean.Builder builder = new MemberWrapperBean.Builder();
            HashMap obj = TuyaReactUtils.parseToMap(params.getMap(MEMBERWRAPPERBEAN));
            builder.setAccount(String.valueOf(obj.get("account")));
            builder.setAdmin((Boolean) obj.get("admin"));
            builder.setHomeId(Double.valueOf(String.valueOf(obj.get("homeId"))).longValue() );
            builder.setUid((String) obj.get("uid"));
            builder.setNickName((String) obj.get("nickName"));
            builder.setMemberId(Double.valueOf(String.valueOf(obj.get("memberId"))).longValue() );
            if (null!=obj.get("headPic")) {
                builder.setHeadPic((String) obj.get("headPic"));
            }
            if (null!=obj.get("countryCode")) {
                builder.setCountryCode((String) obj.get("countryCode"));
            }
            builder.build();
            TuyaHomeSdk.getMemberInstance().addMember(
                    builder.build(),
                    getITuyaDataCallback(promise)
            );
        }
    }

    @ReactMethod
    public void removeMember(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(Constant.MEMBERID), params)) {
            TuyaHomeSdk.getMemberInstance().removeMember(
                    coverDTL(params.getDouble(MEMBERID)),
                    getIResultCallback(promise)
            );
        }
    }

    @ReactMethod
    public void queryMemberList(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            TuyaHomeSdk.getMemberInstance().queryMemberList(
                    coverDTL(params.getDouble(HOMEID)),
                    new ITuyaGetMemberListCallback() {
                        @Override
                        public void onSuccess(List<MemberBean> result) {
                            promise.resolve(TuyaReactUtils.parseToWritableArray(JsonUtils.toJsonArray(result)));
                        }

                        @Override
                        public void onError(String errorCode, String error) {
                            promise.reject(errorCode, error);
                        }
                    }
            );
        }
    }


    @ReactMethod
    public void getMemberDeviceList(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(RELATIONID), params)) {
            TuyaHomeSdk.getMemberInstance().getMemberDeviceList(
                    coverDTL(params.getDouble(RELATIONID)),
                    getITuyaDataCallback(promise)
            );
        }
    }


    @ReactMethod
    public void addMemberAccount(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(ID, Constant.COUNTRYCODE, Constant.USERACCOUNT, Constant.ADMIN), params)) {
            TuyaHomeSdk.getMemberInstance().addMemberAccount(
                    coverDTL(params.getDouble(ID)),
                    params.getString(Constant.COUNTRYCODE),
                    params.getString(Constant.USERACCOUNT),
                    params.getBoolean(Constant.ADMIN),
                    getIResultCallback(promise)
            );
        }
    }


    @ReactMethod
    public void uploadMemberAvatar(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(FILENAME, FILEPATH), params)) {
            TuyaHomeSdk.getMemberInstance().uploadMemberAvatar(
                    params.getString(Constant.FILENAME),
                    new File(params.getString(FILEPATH)),
                    getIBooleanCallback(promise)
            );
        }
    }


    @ReactMethod
    public void processInvitation(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, ACTION), params)) {
            TuyaHomeSdk.getMemberInstance().processInvitation(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getBoolean(ACTION),
                    getIResultCallback(promise)
            );
        }
    }

}
