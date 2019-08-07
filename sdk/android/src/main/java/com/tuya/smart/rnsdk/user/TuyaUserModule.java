package com.tuya.smart.rnsdk.user;



import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.android.user.api.ICheckAccountCallback;
import com.tuya.smart.android.user.api.IGetRegionCallback;
import com.tuya.smart.android.user.api.ILoginCallback;
import com.tuya.smart.android.user.api.ILogoutCallback;
import com.tuya.smart.android.user.api.IReNickNameCallback;
import com.tuya.smart.android.user.api.IRegisterCallback;
import com.tuya.smart.android.user.api.IResetPasswordCallback;
import com.tuya.smart.android.user.api.IUidLoginCallback;
import com.tuya.smart.android.user.api.IValidateCallback;
import com.tuya.smart.android.user.bean.Region;
import com.tuya.smart.android.user.bean.User;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.rnsdk.utils.Constant;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.enums.TempUnitEnum;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.ACCESSTOKEN;
import static com.tuya.smart.rnsdk.utils.Constant.CODE;
import static com.tuya.smart.rnsdk.utils.Constant.COUNTRYCODE;
import static com.tuya.smart.rnsdk.utils.Constant.EMAIL;
import static com.tuya.smart.rnsdk.utils.Constant.FILEPATH;
import static com.tuya.smart.rnsdk.utils.Constant.ISCREATEHOME;
import static com.tuya.smart.rnsdk.utils.Constant.KEY;
import static com.tuya.smart.rnsdk.utils.Constant.NAME;
import static com.tuya.smart.rnsdk.utils.Constant.NEWPASSWORD;
import static com.tuya.smart.rnsdk.utils.Constant.PASSWORD;
import static com.tuya.smart.rnsdk.utils.Constant.PHONENUMBER;
import static com.tuya.smart.rnsdk.utils.Constant.REGION;
import static com.tuya.smart.rnsdk.utils.Constant.SECRET;
import static com.tuya.smart.rnsdk.utils.Constant.TEMPUNITENUM;
import static com.tuya.smart.rnsdk.utils.Constant.TIMEZONEID;
import static com.tuya.smart.rnsdk.utils.Constant.TOKEN;
import static com.tuya.smart.rnsdk.utils.Constant.TYPE;
import static com.tuya.smart.rnsdk.utils.Constant.UID;
import static com.tuya.smart.rnsdk.utils.Constant.USER;
import static com.tuya.smart.rnsdk.utils.Constant.USERID;
import static com.tuya.smart.rnsdk.utils.Constant.USERNAME;
import static com.tuya.smart.rnsdk.utils.Constant.VALIDATECODE;
import static com.tuya.smart.rnsdk.utils.Constant.getIBooleanCallback;
import static com.tuya.smart.rnsdk.utils.Constant.getIResultCallback;

public class TuyaUserModule extends ReactContextBaseJavaModule {
    public TuyaUserModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "TuyaUserModule";
    }

    @ReactMethod
    public void getUser(Promise promise) {
        if (TuyaHomeSdk.getUserInstance().getUser() != null) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getUserInstance().getUser()));
        } else {
            promise.reject("user null", "user null");
        }
    }

    @ReactMethod
    public void isLogin(Promise promise) {
        promise.resolve(TuyaHomeSdk.getUserInstance().isLogin());
    }

    @ReactMethod
    public void loginWithPhone(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, PHONENUMBER, VALIDATECODE), params)) {
            TuyaHomeSdk.getUserInstance().loginWithPhone(
                    params.getString(COUNTRYCODE),
                    params.getString(PHONENUMBER),
                    params.getString(VALIDATECODE),
                    getLoginCallback(promise));
        }
    }


    /* 邮箱密码登陆 */
    @ReactMethod
    public void loginWithEmail(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, EMAIL, PASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().loginWithEmail(
                    params.getString(COUNTRYCODE),
                    params.getString(EMAIL),
                    params.getString(PASSWORD),
                    getLoginCallback(promise));
        }
    }


    /* 手机密码登录 */
    @ReactMethod
    public void loginWithPhonePassword(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, PHONENUMBER, PASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().loginWithPhonePassword(
                    params.getString(COUNTRYCODE),
                    params.getString(PHONENUMBER),
                    params.getString(PASSWORD),
                    getLoginCallback(promise));
        }
    }


    /* 邮箱获取验证码 找密码 */
    @ReactMethod
    public void getEmailValidateCode(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, EMAIL), params)) {
            TuyaHomeSdk.getUserInstance().getEmailValidateCode(
                    params.getString(COUNTRYCODE),
                    params.getString(EMAIL),
                    getValidateCodeCallback(promise));
        }
    }


    /* 注册手机密码账户 */
    @ReactMethod
    public void registerAccountWithPhone(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, PHONENUMBER, PASSWORD, VALIDATECODE), params)) {
            TuyaHomeSdk.getUserInstance().registerAccountWithPhone(
                    params.getString(COUNTRYCODE),
                    params.getString(PHONENUMBER),
                    params.getString(PASSWORD),
                    params.getString(VALIDATECODE),
                    getRegisterCallback(promise));
        }
    }

    /* 邮箱重置密码 */
    @ReactMethod
    public void resetEmailPassword(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, EMAIL, VALIDATECODE, NEWPASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().resetEmailPassword(
                    params.getString(COUNTRYCODE),
                    params.getString(EMAIL),
                    params.getString(VALIDATECODE),
                    params.getString(NEWPASSWORD),
                    getResetPasswdCallback(promise));
        }
    }

    /* 手机密码重置 */
    @ReactMethod
    public void resetPhonePassword(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, PHONENUMBER, CODE, NEWPASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().resetPhonePassword(
                    params.getString(COUNTRYCODE),
                    params.getString(PHONENUMBER),
                    params.getString(CODE),
                    params.getString(NEWPASSWORD),
                    getResetPasswdCallback(promise));
        }
    }

    /* logout */
    @ReactMethod
    public void logout(final Promise promise) {
        TuyaHomeSdk.getUserInstance().logout(new ILogoutCallback() {
            @Override
            public void onSuccess() {
                promise.resolve(Constant.SUCCESS);
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        });
    }


    /* 手机验证码登录 */
    @ReactMethod
    public void getValidateCode(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, PHONENUMBER), params)) {
            TuyaHomeSdk.getUserInstance().getValidateCode(
                    params.getString(COUNTRYCODE),
                    params.getString(PHONENUMBER),
                    getValidateCodeCallback(promise)
            );
        }
    }

    /* 注册获取邮箱验证码 */
    @ReactMethod
    public void getRegisterEmailValidateCode(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, EMAIL), params)) {
            TuyaHomeSdk.getUserInstance().getRegisterEmailValidateCode(
                    params.getString(COUNTRYCODE),
                    params.getString(EMAIL),
                    getIResultCallback(promise));
        }
    }

    /* 邮箱密码注册 */
    @ReactMethod
    public void registerAccountWithEmail(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, EMAIL, PASSWORD, CODE), params)) {
            TuyaHomeSdk.getUserInstance().registerAccountWithEmail(
                    params.getString(COUNTRYCODE),
                    params.getString(EMAIL),
                    params.getString(PASSWORD),
                    params.getString(CODE),
                    getRegisterCallback(promise));
        }
    }


    /* 邮箱密码注册 */
    @ReactMethod
    public void reRickName(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(NAME), params)) {
            TuyaHomeSdk.getUserInstance().reRickName(
                    params.getString(NAME),
                    getIReNickNameCallback(promise));
        }
    }

    /* 登陆和注册合并一个接口 */
    @ReactMethod
    public void loginByTwitter(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, KEY, SECRET), params)) {
            TuyaHomeSdk.getUserInstance().loginByTwitter(
                    params.getString(COUNTRYCODE),
                    params.getString(KEY),
                    params.getString(SECRET),
                    getLoginCallback(promise));
        }
    }


    /* QQ登陆 */
    @ReactMethod
    public void loginByQQ(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, USERID, ACCESSTOKEN), params)) {
            TuyaHomeSdk.getUserInstance().loginByQQ(
                    params.getString(COUNTRYCODE),
                    params.getString(USERID),
                    params.getString(ACCESSTOKEN),
                    getLoginCallback(promise));
        }
    }


    /* QQ登陆 */
    @ReactMethod
    public void loginByWechat(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, CODE), params)) {
            TuyaHomeSdk.getUserInstance().loginByWechat(
                    params.getString(COUNTRYCODE),
                    params.getString(CODE),
                    getLoginCallback(promise));
        }
    }


    /* Facebook登陆 */
    @ReactMethod
    public void loginByFacebook(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, TOKEN), params)) {
            TuyaHomeSdk.getUserInstance().loginByFacebook(
                    params.getString(COUNTRYCODE),
                    params.getString(TOKEN),
                    getLoginCallback(promise));
        }
    }

    @ReactMethod
    public void removeUser(Promise promise) {
        promise.resolve(TuyaHomeSdk.getUserInstance().removeUser());
    }

    @ReactMethod
    public void checkPhoneCode(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, PHONENUMBER, CODE), params)) {
            TuyaHomeSdk.getUserInstance().checkPhoneCode(
                    params.getString(COUNTRYCODE),
                    params.getString(PHONENUMBER),
                    params.getString(CODE),
                    getICheckAccountCallback(promise));
        }
    }

    @ReactMethod
    public void checkEmailPassword(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(PASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().checkEmailPassword(
                    params.getString(PASSWORD),
                    getICheckAccountCallback(promise));
        }
    }


    /* 用户uid注册 */
    @ReactMethod
    public void loginWithUid(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, UID, PASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().loginWithUid(
                    params.getString(COUNTRYCODE),
                    params.getString(UID),
                    params.getString(PASSWORD),
                    getLoginCallback(promise));
        }
    }


    /* 登陆和注册合并一个接口 */
    @ReactMethod
    public void loginOrRegisterWithUid(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, UID, PASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().loginOrRegisterWithUid(
                    params.getString(COUNTRYCODE),
                    params.getString(UID),
                    params.getString(PASSWORD),
                    getLoginCallback(promise));
        }
    }

    @ReactMethod
    public void loginOrRegisterWithUidAndCreateHome(ReadableMap params, final Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, UID, PASSWORD, ISCREATEHOME), params)) {
            TuyaHomeSdk.getUserInstance().loginOrRegisterWithUid(
                    params.getString(COUNTRYCODE),
                    params.getString(UID),
                    params.getString(PASSWORD),
                    params.getBoolean(ISCREATEHOME),
                    new IUidLoginCallback() {
                        @Override
                        public void onSuccess(User user, long homeId) {
                            HashMap<Object, Object> map = new HashMap<>();
                            map.put("user", user);
                            map.put("homeId", homeId);
                            promise.resolve(TuyaReactUtils.parseToWritableMap(map));
                        }

                        @Override
                        public void onError(String code, String error) {
                            promise.reject(code, error);
                        }
                    });
        }
    }


    /* 用户uid注册 */
    @ReactMethod
    public void registerAccountWithUid(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, UID, PASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().registerAccountWithUid(
                    params.getString(COUNTRYCODE),
                    params.getString(UID),
                    params.getString(PASSWORD),
                    getRegisterCallback(promise));
        }
    }


    @ReactMethod
    public void saveUser(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(USER), params)) {
            promise.resolve(TuyaHomeSdk.getUserInstance().saveUser(JSON.parseObject(JSON.toJSONString(TuyaReactUtils.parseToMap(params.getMap(USER))), User.class)));
        }
    }


    @ReactMethod
    public void sendBindVerifyCode(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, PHONENUMBER), params)) {
            TuyaHomeSdk.getUserInstance().sendBindVerifyCode(
                    params.getString(COUNTRYCODE),
                    params.getString(PHONENUMBER),
                    getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void bindMobile(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE, PHONENUMBER, CODE), params)) {
            TuyaHomeSdk.getUserInstance().bindMobile(
                    params.getString(COUNTRYCODE),
                    params.getString(PHONENUMBER),
                    params.getString(CODE),
                    getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void updateTimeZone(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TIMEZONEID), params)) {
            TuyaHomeSdk.getUserInstance().updateTimeZone(
                    params.getString(TIMEZONEID),
                    getIResultCallback(promise));
        }
    }

    /* 设置温度单位 */
    @ReactMethod
    public void setTempUnit(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(TEMPUNITENUM), params)) {
            TuyaHomeSdk.getUserInstance().setTempUnit(TempUnitEnum.valueOf(params.getString(TEMPUNITENUM)), getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void uploadUserAvatar(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(FILEPATH), params)) {
            TuyaHomeSdk.getUserInstance().uploadUserAvatar(
                    new File(params.getString(FILEPATH)), getIBooleanCallback(promise));
        }
    }


    /* 检测是否要升级用户数据 */
    @ReactMethod
    public void checkVersionUpgrade(Promise promise) {
        promise.resolve(TuyaHomeSdk.getUserInstance().checkVersionUpgrade());
    }

    /* 升级账号 */
    @ReactMethod
    public void upgradeVersion(Promise promise) {
        TuyaHomeSdk.getUserInstance().upgradeVersion(getIResultCallback(promise));
    }


    /* 注销账户 */
    @ReactMethod
    public void cancelAccount(Promise promise) {
        TuyaHomeSdk.getUserInstance().cancelAccount(getIResultCallback(promise));
    }


    /* 注销账户 */
    @ReactMethod
    public void onDestroy() {
        TuyaHomeSdk.getUserInstance().onDestroy();
    }

    @ReactMethod
    public void switchUserRegion(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(REGION), params)) {
            TuyaHomeSdk.getUserInstance().switchUserRegion(params.getString(REGION), getLoginCallback(promise));
        }
    }


    @ReactMethod
    public void sendVerifyCodeWithUserName(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(USERNAME, REGION, COUNTRYCODE, TYPE), params)) {
            TuyaHomeSdk.getUserInstance().sendVerifyCodeWithUserName(
                    params.getString(USERNAME),
                    params.getString(REGION),
                    params.getString(COUNTRYCODE),
                    params.getInt(TYPE),
                    getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void checkCodeWithUserName(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(USERNAME, REGION, COUNTRYCODE, CODE, TYPE), params)) {
            TuyaHomeSdk.getUserInstance().checkCodeWithUserName(
                    params.getString(USERNAME),
                    params.getString(REGION),
                    params.getString(COUNTRYCODE),
                    params.getString(CODE),
                    params.getInt(TYPE),
                    getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void registerWithUserName(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(USERNAME, REGION, COUNTRYCODE, CODE, PASSWORD), params)) {
            TuyaHomeSdk.getUserInstance().registerWithUserName(
                    params.getString(USERNAME),
                    params.getString(REGION),
                    params.getString(COUNTRYCODE),
                    params.getString(CODE),
                    params.getString(PASSWORD),
                    getRegisterCallback(promise));
        }
    }


    @ReactMethod
    public void getRegionListWithCountryCode(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE), params)) {
            TuyaHomeSdk.getUserInstance().getRegionListWithCountryCode(
                    params.getString(COUNTRYCODE),
                    getIGetRegionCallback(promise));
        }
    }


    private IGetRegionCallback getIGetRegionCallback(final Promise promise) {
        return new IGetRegionCallback() {
            @Override
            public void onSuccess(Region regionList) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(regionList));
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        };
    }


    private IValidateCallback getValidateCodeCallback(final Promise promise) {
        return new IValidateCallback() {
            @Override
            public void onSuccess() {
                promise.resolve(Constant.SUCCESS);
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        };
    }


    private IResetPasswordCallback getResetPasswdCallback(final Promise promise) {
        return new IResetPasswordCallback() {
            @Override
            public void onSuccess() {
                promise.resolve(Constant.SUCCESS);
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        };
    }

    private ICheckAccountCallback getICheckAccountCallback(final Promise promise) {
        return new ICheckAccountCallback() {
            @Override
            public void onSuccess() {
                promise.resolve(Constant.SUCCESS);
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        };
    }

    private IRegisterCallback getRegisterCallback(final Promise promise) {
        return new IRegisterCallback() {
            public void onSuccess(User user) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(user));
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        };
    }

    private IReNickNameCallback getIReNickNameCallback(final Promise promise) {
        return new IReNickNameCallback() {
            @Override
            public void onSuccess() {
                promise.resolve(Constant.SUCCESS);
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        };
    }


    private ILoginCallback getLoginCallback(final Promise promise) {
        return new ILoginCallback() {
            @Override
            public void onSuccess(User user) {
                promise.resolve(TuyaReactUtils.parseToWritableMap(user));
            }

            @Override
            public void onError(String code, String error) {
                promise.reject(code, error);
            }
        };
    }
}
