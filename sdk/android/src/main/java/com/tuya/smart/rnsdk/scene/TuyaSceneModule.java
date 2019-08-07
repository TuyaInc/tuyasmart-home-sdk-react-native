package com.tuya.smart.rnsdk.scene;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.bean.scene.PlaceFacadeBean;
import com.tuya.smart.home.sdk.bean.scene.PreCondition;
import com.tuya.smart.home.sdk.bean.scene.SceneBean;
import com.tuya.smart.home.sdk.bean.scene.SceneCondition;
import com.tuya.smart.home.sdk.bean.scene.SceneTask;
import com.tuya.smart.home.sdk.bean.scene.condition.rule.BoolRule;
import com.tuya.smart.home.sdk.bean.scene.condition.rule.EnumRule;
import com.tuya.smart.home.sdk.bean.scene.condition.rule.Rule;
import com.tuya.smart.home.sdk.bean.scene.condition.rule.TimerRule;
import com.tuya.smart.home.sdk.bean.scene.condition.rule.ValueRule;
import com.tuya.smart.rnsdk.utils.BridgeUtils;
import com.tuya.smart.rnsdk.utils.JsonUtils;
import com.tuya.smart.rnsdk.utils.ReactParamsCheck;
import com.tuya.smart.rnsdk.utils.TuyaReactUtils;
import com.tuya.smart.sdk.api.ISmartUpdateListener;
import com.tuya.smart.sdk.bean.DeviceBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nonnull;

import static com.tuya.smart.rnsdk.utils.Constant.BACKGROUND;
import static com.tuya.smart.rnsdk.utils.Constant.CITYID;
import static com.tuya.smart.rnsdk.utils.Constant.CONDITIONLIST;
import static com.tuya.smart.rnsdk.utils.Constant.COUNTRYCODE;
import static com.tuya.smart.rnsdk.utils.Constant.DATA;
import static com.tuya.smart.rnsdk.utils.Constant.DEVICEBEAN;
import static com.tuya.smart.rnsdk.utils.Constant.DEVID;
import static com.tuya.smart.rnsdk.utils.Constant.DISPLAY;
import static com.tuya.smart.rnsdk.utils.Constant.DPID;
import static com.tuya.smart.rnsdk.utils.Constant.GROUPID;
import static com.tuya.smart.rnsdk.utils.Constant.GWID;
import static com.tuya.smart.rnsdk.utils.Constant.HOMEID;
import static com.tuya.smart.rnsdk.utils.Constant.LAT;
import static com.tuya.smart.rnsdk.utils.Constant.LOCALSID;
import static com.tuya.smart.rnsdk.utils.Constant.LON;
import static com.tuya.smart.rnsdk.utils.Constant.LOOPS;
import static com.tuya.smart.rnsdk.utils.Constant.MATCHTYPE;
import static com.tuya.smart.rnsdk.utils.Constant.NAME;
import static com.tuya.smart.rnsdk.utils.Constant.PLACE;
import static com.tuya.smart.rnsdk.utils.Constant.PRECONDITION;
import static com.tuya.smart.rnsdk.utils.Constant.RANGE;
import static com.tuya.smart.rnsdk.utils.Constant.RANGETYPE;
import static com.tuya.smart.rnsdk.utils.Constant.RULE;
import static com.tuya.smart.rnsdk.utils.Constant.RULETYPE;
import static com.tuya.smart.rnsdk.utils.Constant.SCENEBEAN;
import static com.tuya.smart.rnsdk.utils.Constant.SCENEID;
import static com.tuya.smart.rnsdk.utils.Constant.SCENEIDS;
import static com.tuya.smart.rnsdk.utils.Constant.SHOWFAHRENHEIT;
import static com.tuya.smart.rnsdk.utils.Constant.STICKYONTOP;
import static com.tuya.smart.rnsdk.utils.Constant.TASKS;
import static com.tuya.smart.rnsdk.utils.Constant.TIME;
import static com.tuya.smart.rnsdk.utils.Constant.TIMEZONEID;
import static com.tuya.smart.rnsdk.utils.Constant.TYPE;
import static com.tuya.smart.rnsdk.utils.Constant.VALUE;
import static com.tuya.smart.rnsdk.utils.Constant.coverDTL;
import static com.tuya.smart.rnsdk.utils.Constant.getIResultCallback;
import static com.tuya.smart.rnsdk.utils.Constant.getITuyaResultCallback;

public class TuyaSceneModule extends ReactContextBaseJavaModule {
    public TuyaSceneModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private ISmartUpdateListener mISmartUpdateListener;

    @Nonnull
    @Override
    public String getName() {
        return "TuyaSceneModule";
    }

    @ReactMethod
    public void getDeviceTaskOperationList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getDeviceTaskOperationList(params.getString(DEVID), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void getDeviceTaskOperationListByGroup(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getDeviceTaskOperationListByGroup(params.getString(GROUPID), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void getDeviceTaskFunctionList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getDeviceTaskFunctionList(params.getString(DEVID), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void getDeviceTaskFunctionListByGoup(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GROUPID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getDeviceTaskFunctionListByGoup(params.getString(GROUPID), getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void getSceneList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneList(coverDTL(params.getDouble(HOMEID)), getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getSceneDetail(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SCENEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneDetail(params.getString(SCENEID), getITuyaResultCallback(promise));
        }
    }




    @ReactMethod
    public void createWeatherCondition(ReadableMap params, Promise promise){
        if (ReactParamsCheck.checkParams(Arrays.asList(PLACE, RULETYPE), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(SceneCondition.createWeatherCondition(
                    (PlaceFacadeBean)JsonUtils.parseBymap(params.getMap(PLACE),PlaceFacadeBean.class),
                    params.getString(TYPE),
                    getRule(params))));
        }

    }

    public Rule  getRule(ReadableMap params){
        Rule rule = null;
        if (params.getString(RULETYPE).equals("value") ) {
            rule = ValueRule.newInstance(
                    params.getString(TYPE), //类别
                    params.getString(RANGE), //运算规则(">", "==", "<")
                    Integer.parseInt(params.getString(VALUE)));
        } else if (params.getString(RULETYPE).equals("enum") ){
            rule = EnumRule.newInstance(
                    params.getString(TYPE),
                    params.getString(VALUE));
        }else if (params.getString(RULETYPE).equals("bool") ){
            rule = BoolRule.newInstance(
                    params.getString(TYPE),
                    params.getBoolean(VALUE));
        }else if (params.getString(RULETYPE).equals("timer") ){
            rule = TimerRule.newInstance(
                    params.getString(TIMEZONEID),
                    params.getString(LOOPS),
                    params.getString(TIME),
                    params.getString(DATA));
        }
        return rule;
    }
    @ReactMethod
    public void createDevCondition(ReadableMap params, Promise promise){
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVICEBEAN, DPID), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(SceneCondition.createDevCondition(
                    (DeviceBean)JsonUtils.parseBymap(params.getMap(DEVICEBEAN), DeviceBean.class),
                    params.getString(DPID),
                    getRule(params))));
        }
    }
    @ReactMethod
    public void createTimerCondition(ReadableMap params, Promise promise){
        if (ReactParamsCheck.checkParams(Arrays.asList(DISPLAY, NAME,TYPE), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(SceneCondition.createTimerCondition(
                    params.getString(DISPLAY),
                    params.getString(NAME),
                    params.getString(TYPE),
                    getRule(params))));
        }
    }
    @ReactMethod
    public void createScene(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, NAME, BACKGROUND, TASKS, MATCHTYPE), params)) {
            List<SceneCondition> conditionList=null;
            if(params.hasKey(CONDITIONLIST)){
                conditionList=JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(CONDITIONLIST))), SceneCondition.class);
            }
            TuyaHomeSdk.getSceneManagerInstance().createScene(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getString(NAME),
                    params.getString(BACKGROUND),
                    conditionList,
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(TASKS))), SceneTask.class),
                    params.getInt(MATCHTYPE),
                    getITuyaResultCallback(promise));
        }
    }
    @ReactMethod
    public void createSceneWithStickyOnTop(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList( HOMEID, NAME, STICKYONTOP, BACKGROUND,  TASKS, MATCHTYPE), params)) {
            List<SceneCondition> conditionList=null;
            if(params.hasKey(CONDITIONLIST)){
                conditionList=JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(CONDITIONLIST))), SceneCondition.class);
            }
            TuyaHomeSdk.getSceneManagerInstance().createScene(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getString(NAME),
                    params.getBoolean(STICKYONTOP),
                    params.getString(BACKGROUND),
                    conditionList,
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(TASKS))), SceneTask.class),
                    params.getInt(MATCHTYPE),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void createSceneWithStickyOnTopAndPreCondition(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, NAME, STICKYONTOP, BACKGROUND, TASKS, PRECONDITION, MATCHTYPE), params)) {
            List<SceneCondition> conditionList=null;
            if(params.hasKey(CONDITIONLIST)){
                conditionList=JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(CONDITIONLIST))), SceneCondition.class);
            }
            TuyaHomeSdk.getSceneManagerInstance().createScene(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getString(NAME),
                    params.getBoolean(STICKYONTOP),
                    params.getString(BACKGROUND),
                    conditionList,
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(TASKS))), SceneTask.class),
                    JsonUtils.parseArray(JsonUtils.toString(TuyaReactUtils.parseToList(params.getArray(PRECONDITION))), PreCondition.class),
                    params.getInt(MATCHTYPE),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getConditionDevList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getConditionDevList(
                    coverDTL(params.getDouble(HOMEID)),
                    getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void getTaskDevList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getTaskDevList(
                    coverDTL(params.getDouble(HOMEID)),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getTaskDevAndGoupList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getTaskDevAndGoupList(
                    coverDTL(params.getDouble(HOMEID)),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getSceneConditionDevList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, TYPE), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getSceneConditionDevList(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getInt(TYPE),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getDeviceConditionOperationList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getDeviceConditionOperationList(
                    params.getString(DEVID),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getConditionList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SHOWFAHRENHEIT), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getConditionList(
                    params.getBoolean(SHOWFAHRENHEIT),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getConditionListAll(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, SHOWFAHRENHEIT), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getConditionListAll(
                    coverDTL(params.getDouble(HOMEID)),
                    params.getBoolean(SHOWFAHRENHEIT),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getCityByLatLng(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(LAT, LON), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getCityByLatLng(
                    params.getString(LON),
                    params.getString(LAT),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getCityByCityIndex(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(CITYID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getCityByCityIndex(
                    coverDTL(params.getDouble(CITYID)),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void getCityListByCountryCode(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(COUNTRYCODE), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getCityListByCountryCode(
                    params.getString(COUNTRYCODE),
                    getITuyaResultCallback(promise));
        }
    }


    @ReactMethod
    public void sortSceneList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(HOMEID, SCENEIDS), params)) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < params.getArray(SCENEIDS).size(); i++) {
                list.add(params.getArray(SCENEIDS).getString(i));
            }
            TuyaHomeSdk.getSceneManagerInstance().sortSceneList(
                    coverDTL(params.getDouble(HOMEID)),
                    list,
                    getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void getScenePanelBoundList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getScenePanelBoundList(
                    params.getString(DEVID),
                    getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void getAvailableBindSceneList(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(GWID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().getAvailableBindSceneList(
                    params.getString(GWID),
                    getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void bindLocalScene(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, DPID, GWID, LOCALSID, SCENEID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().bindLocalScene(
                    params.getString(DEVID),
                    coverDTL(params.getDouble(DPID)),
                    params.getString(GWID),
                    params.getString(LOCALSID),
                    params.getString(SCENEID),
                    getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void unbindLocalScene(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, DPID), params)) {
            TuyaHomeSdk.getSceneManagerInstance().unbindLocalScene(
                    params.getString(DEVID),
                    coverDTL(params.getDouble(DPID)),
                    getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void getSceneBgs( Promise promise) {
        TuyaHomeSdk.getSceneManagerInstance().getSceneBgs(getITuyaResultCallback(promise));
    }

    @ReactMethod
    public void registerSmartUpdateListener() {
        if (mISmartUpdateListener != null) {
            TuyaHomeSdk.getSceneManagerInstance().unRegisterSmartUpdateListener(mISmartUpdateListener);
            mISmartUpdateListener = null;
        }
        mISmartUpdateListener = new ISmartUpdateListener() {
            @Override
            public void onSmartUpdateListener() {
                BridgeUtils.smartUpdate(getReactApplicationContext(), Arguments.createMap(), "");
            }
        };
        TuyaHomeSdk.getSceneManagerInstance().registerSmartUpdateListener(mISmartUpdateListener);
    }


    @ReactMethod
    public void unRegisterSmartUpdateListener() {
        if (mISmartUpdateListener != null) {
            TuyaHomeSdk.getSceneManagerInstance().unRegisterSmartUpdateListener(mISmartUpdateListener);
            mISmartUpdateListener = null;
        }
    }


    @ReactMethod
    public void createDpTask(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(DEVID, TASKS), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getSceneManagerInstance().createDpTask(
                    params.getString(DEVID),
                    TuyaReactUtils.parseToMap(params.getMap(TASKS))
            )));
        }
    }

    @ReactMethod
    public void createSceneTask(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SCENEBEAN), params)) {
            promise.resolve(TuyaReactUtils.parseToWritableMap(TuyaHomeSdk.getSceneManagerInstance().createSceneTask(
                    (SceneBean) JsonUtils.parse(JsonUtils.toString(params.getMap(SCENEBEAN)), SceneBean.class))));
        }
    }


    @ReactMethod
    public void onDestroy() {
        TuyaHomeSdk.getSceneManagerInstance().onDestroy();
    }

    @ReactMethod
    public void executeScene(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SCENEID), params)) {
            TuyaHomeSdk.newSceneInstance(params.getString(SCENEID)).executeScene(getIResultCallback(promise));
        }
    }


    @ReactMethod
    public void deleteScene(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SCENEID), params)) {
            TuyaHomeSdk.newSceneInstance(params.getString(SCENEID)).deleteScene(getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void modifyScene(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SCENEID), params)) {
            TuyaHomeSdk.newSceneInstance(params.getString(SCENEID)).modifyScene(
                    (SceneBean) JsonUtils.parse(JsonUtils.toString(params.getMap(SCENEBEAN)), SceneBean.class),
                    getITuyaResultCallback(promise));
        }
    }

    @ReactMethod
    public void disableScene(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SCENEID), params)) {
            TuyaHomeSdk.newSceneInstance(params.getString(SCENEID)).disableScene(params.getString(SCENEID), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void enableScene(ReadableMap params, Promise promise) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SCENEID), params)) {
            TuyaHomeSdk.newSceneInstance(params.getString(SCENEID)).enableScene(params.getString(SCENEID), getIResultCallback(promise));
        }
    }

    @ReactMethod
    public void onDestroyScene(ReadableMap params) {
        if (ReactParamsCheck.checkParams(Arrays.asList(SCENEID), params)) {
            TuyaHomeSdk.newSceneInstance(params.getString(SCENEID)).onDestroy();
        }
    }
}
